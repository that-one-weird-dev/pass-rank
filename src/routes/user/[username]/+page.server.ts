import { db } from "$lib/db.server";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const user = await db.user.findUnique({
    select: {
      displayName: true,
      username: true,
      loginCount: true,
    },
    where: {
      username: params.username,
    },
  });

  if (!user) {
    throw redirect(302, "/");
  }

  return {
    pageUser: user,
  };
};
