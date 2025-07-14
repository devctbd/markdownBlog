import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session: async ({ session, token }: { session: any; token: JWT }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            role: true,
          },
        });
        session.user.role = user?.role || "USER";
      }
      return session;
    },
    jwt: async ({ token, user }: { token: JWT; user: any }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
