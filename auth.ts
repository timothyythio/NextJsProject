import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) {
          console.log("Credentials not found");
          return null;
        }
        //find user in db
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //check if user exists and if password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if password is correct, return the user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        //if user doesn't exist, or password is not correct, return null
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, user, trigger, token }: any) {
      //set userid from the token
      session.user.id = token.sub;
      session.user.role = token.role;

      //if there is any update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      //Assign user fields to token
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    authorized({ request, auth }: any) {
      //check for session cart Id (which is a UUID to identify user's cart)
      //if the cookie doesn't exist, create one
      if (!request.cookies.get("sessionCartId")) {
        //create here
        const sessionCartId = crypto.randomUUID();

        //clone the request headers
        const newRequestHeaders = new Headers(request.headers);

        //create the new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        //set new generated sessionCartId in response cookie
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else return true;
    },
  },
} satisfies NextAuthConfig;
//ensures object structure is compatible with type NextAuthConfig (you cant have other things that aren't in the list)

//handlers are objects that contain HTTP handlers for different endpoints that NextAuth uses.
//auth is a function to get the session and check if users are signed in or not
//sign in checks for providers and will reroute to the sign in page if no providers
//sign out will destroy cookies and sign out the user
export const { handlers, auth, signIn, signOut } = NextAuth(config);
