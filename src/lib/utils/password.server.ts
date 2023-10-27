import { sha256 } from "crypto-hash";

export function hashPassword(pass: string): Promise<string> {
  return sha256(pass);
}
