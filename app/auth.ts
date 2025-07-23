import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId:
        process.env.NODE_ENV === "development"
          ? process.env.AUTH_GITHUB_DEV_ID
          : process.env.AUTH_GITHUB_ID,
      clientSecret:
        process.env.NODE_ENV === "development"
          ? process.env.AUTH_GITHUB_DEV_SECRET
          : process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
});
