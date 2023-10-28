import { db } from "$lib/db.server";
import type { User } from "$lib/models/user";

export async function fetchUsers(page: number = 0, pageSize: number = 10): Promise<User[]> {
  return db.user.findMany({
    select: {
      username: true,
      displayName: true,
      loginCount: true,
    },
    orderBy: {
      loginCount: "asc",
    },
    take: pageSize,
    skip: page * pageSize,
  });
}
