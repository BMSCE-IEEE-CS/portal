import { Role } from "@/app/generated/prisma";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      image?: string | null;
      email?: string | null;
      role: Role[];
    };
  }

  interface User {
    role: Role[];
  }
}
