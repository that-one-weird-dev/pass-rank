import { fail } from "@sveltejs/kit";
import { db } from "$lib/db.server";
import type { RequestHandler } from "./$types";
import { z } from "zod";

const GetData = z.object({
  likesCookies: z.boolean(),
});

export const POST: RequestHandler = async ({ request, locals }) => {
  const form = GetData.safeParse(await request.json());
  if (!form.success) throw fail(400);

  if (!locals.user) throw fail(401);

  await db.user.update({
    data: {
      likesCookies: form.data.likesCookies,
    },
    where: {
      username: locals.user.username,
    },
  });

  return new Response();
};
