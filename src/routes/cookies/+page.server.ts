import { db } from "$lib/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    // TODO: Optimize pls
    const total = await db.user.count({
        where: {
            NOT: {
                likesCookies: null,
            }
        }
    });
    const cookieEnjoyers = await db.user.count({
        where: {
            likesCookies: true,
        }
    });

    return {
        stats: {
            total,
            cookieEnjoyers,
        },
    };
};
