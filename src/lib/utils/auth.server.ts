import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_ACCESS_SECRET = "SUPER_SECRET_SECRET";

export const JwtUser = z.object({
  id: z.number(),
});

export function authUser(
  user: z.infer<typeof JwtUser>,
): string | undefined {
  return jwt.sign(
    user,
    JWT_ACCESS_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    },
  );
}

export function verifyUser(token: string): z.infer<typeof JwtUser> | undefined {
  let jwtData: JwtPayload | string;
  try {
    jwtData = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (e) {
    return undefined;
  }

  if (typeof jwtData === "string") {
    return undefined;
  }

  const jwtUser = JwtUser.safeParse(jwtData);
  if (!jwtUser.success) return undefined;

  return jwtUser.data;
}
