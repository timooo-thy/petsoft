import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validation";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        const { email, password } = validatedFormData.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    maxAge: 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const accessPage = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && accessPage) {
        return false;
      }

      if (isLoggedIn && accessPage && !auth?.user.subscriptionPlan) {
        return Response.redirect(new URL("/payment", request.url));
      }

      if (isLoggedIn && accessPage && auth?.user.subscriptionPlan) {
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.subscriptionPlan
      ) {
        return Response.redirect(new URL("/app/dashboard", request.url));
      }

      if (isLoggedIn && !accessPage && !auth?.user.subscriptionPlan) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.url));
        }
        return true;
      }

      if (!isLoggedIn && !accessPage) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email as string;
        token.subscriptionPlan = user.subscriptionPlan;
      }

      if (trigger === "update") {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (user) {
          token.subscriptionPlan = user.subscriptionPlan;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.subscriptionPlan = token.subscriptionPlan;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
