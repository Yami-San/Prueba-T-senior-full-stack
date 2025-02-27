import { DefaultSession, DefaultUser } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  // Extiende la interfaz User
  interface User extends DefaultUser {
    // Si quieres que 'id' y 'role' sean obligatorios, quita '?'
    id: string
    role?: Role
  }

  // Extiende la interfaz Session
  interface Session {
    user: {
      // Si no quieres id opcional, quita '?'
      id: string
      // Role opcional o no, depende de tu lógica
      role?: Role
    } & DefaultSession["user"]
  }
}

