import { db } from "$lib/db.server";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const username = url.searchParams.get("username") || undefined;
  const displayName = url.searchParams.get("displayName") || undefined;
  const take = parseInt(url.searchParams.get("take") ?? "") || 5;

  const users = await db.user.findMany({
    select: {
      username: true,
      displayName: true,
    },
    where: {
      username: username ? { contains: username } : undefined,
      displayName: displayName ? { contains: displayName } : undefined,
    },
    take,
  });

  return json(users);
};
