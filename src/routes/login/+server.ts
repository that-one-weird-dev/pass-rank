import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = ({ cookies }) => {
  cookies.delete("AuthorizationToken");
  
  throw redirect(303, "/");
}
