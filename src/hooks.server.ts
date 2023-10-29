import { db } from "$lib/db.server";
import type { SessionUser } from "$lib/models/session-user";
import { verifyUser } from "$lib/utils/auth.server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const authToken = event.cookies.get("AuthorizationToken");

  if (authToken) {
    const user = await getUser(authToken);

    if (user) {
      event.locals.user = user;
    }
  }

  return await resolve(event);
};

async function getUser(authToken: string): Promise<SessionUser | undefined> {
  const jwtUser = verifyUser(authToken);
  if (!jwtUser) return undefined;

  const user = await db.user.findUnique({
    select: {
      displayName: true,
      username: true,
      loginCount: true,
      likesCookies: true,
    },
    where: {
      id: jwtUser.id,
    },
  });

  return user ?? undefined;
}
