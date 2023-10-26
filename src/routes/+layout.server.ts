import { db } from "$lib/db.server";

export async function load() {
    return {
        users: db.user.findMany(),
    }
}
