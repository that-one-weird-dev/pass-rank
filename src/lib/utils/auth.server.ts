import type { SessionUser } from "$lib/models/session-user";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = "SUPER_SECRET_SECRET";

export function authUser(
  user: SessionUser,
): string | undefined {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    } satisfies SessionUser,
    JWT_ACCESS_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    },
  );
}

export function verifyUser(token: string): SessionUser | undefined {
  let jwtUser: JwtPayload | string;
  try {
    jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (e) {
    return undefined;
  }

  if (typeof jwtUser === "string") {
    return undefined;
  }

  return jwtUser as SessionUser;
}
