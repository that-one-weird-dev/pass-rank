import type { SessionUser } from "$lib/models/session-user";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: SessionUser,
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
