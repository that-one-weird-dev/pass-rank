import { db } from "$lib/db.server";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { authUser } from "$lib/utils/auth.server";
import { hashPassword } from "$lib/utils/password.server";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";

const LoginForm = z.object({
  username: z.string().min(3).regex(/^[a-z0-9\-]*$/),
  password: z.string(),
});

const RegisterForm = LoginForm.merge(
  z.object({
    displayName: z.string().min(3),
  }),
);

type ActionResultError = {
  type: "invalid-data" | "invalid-credentials" | "user-exists";
} | {
  type: "password-exists";
  username: string;
};

type ActionResult = {
  error: ActionResultError;
} | void;

export const load: PageServerLoad = ({ locals }) => {
  if (locals.user) {
    throw redirect(303, "/");
  }
};

export const actions: Actions<ActionResult> = {
  login: async ({ cookies, request }) => {
    const result = LoginForm.safeParse(
      Object.fromEntries(await request.formData()),
    );
    if (!result.success) {
      return {
        error: {
          type: "invalid-data",
        },
      };
    }

    const credentials = result.data;

    const hashedPass = await hashPassword(credentials.password);

    const user = await db.user.findUnique({
      where: {
        username: credentials.username,
        password: hashedPass,
      },
    });

    if (!user) {
      return {
        error: {
          type: "invalid-credentials",
        },
      };
    }

    user.loginCount += 1;

    await db.user.update({
      data: user,
      where: {
        id: user.id,
      },
    });

    const token = authUser(user);
    if (!token) {
      return {
        error: {
          type: "invalid-credentials",
        },
      };
    }

    cookies.set("AuthorizationToken", token, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    throw redirect(303, "/");
  },
  register: async ({ cookies, request }) => {
    const result = RegisterForm.safeParse(
      Object.fromEntries(await request.formData()),
    );
    if (!result.success) {
      return {
        error: {
          type: "invalid-data",
        },
      };
    }
    const creds = result.data;

    const hashedPass = await hashPassword(creds.password);

    const foundUser = await db.user.findFirst({
      select: {
        username: true,
        password: true,
      },
      where: {
        OR: [
          { username: creds.username },
          { password: hashedPass },
        ],
      },
    });

    if (foundUser) {
      if (foundUser.password === hashedPass) {
        return {
          error: {
            type: "password-exists",
            username: foundUser?.username,
          } as const,
        } as const;
      } else {
        return {
          error: {
            type: "user-exists",
          } as const,
        };
      }
    }

    const newUser = await db.user.create({
      data: {
        username: creds.username,
        displayName: creds.displayName,
        password: hashedPass,
        ownershipToken: "",
      },
    });

    const token = authUser(newUser);
    if (!token) throw fail(500);

    cookies.set("AuthorizationToken", token, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    throw redirect(303, "/");
  },
  logout: async ({ cookies, locals }) => {
    cookies.delete("AuthorizationToken");
    locals.user = undefined;
  },
};
