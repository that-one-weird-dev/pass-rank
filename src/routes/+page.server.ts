import { fetchUsers } from "$lib/repositoris/user";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const users = fetchUsers();

  return {
    pageUsers: users,
  };
};
