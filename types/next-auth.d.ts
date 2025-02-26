import { DefaultSession, DefaultUser } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: Role
  }

  interface Session {
    user?: {
      role?: Role
    } & DefaultSession["user"]
  }
}
