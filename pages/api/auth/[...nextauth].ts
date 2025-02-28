// pages/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// 1. Define y exporta tu objeto de opciones
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          role: profile.role,
        }
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role, // Asegurar que role se incluye
        },
      };
    },
  },
  pages: {
    signOut: "https://prueba-t-senior-full-stack.vercel.app",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// 2. Export default NextAuth usando ese objeto
export default NextAuth(authOptions)
