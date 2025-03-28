import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma.db";
import Nodemailer from "next-auth/providers/nodemailer";
// import { getUserById } from "./actions/user.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
});
