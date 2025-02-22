import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { User, Session } from "next-auth";
import { saveUserToSanity } from "../../lib/sanity";

export const authOptions = {
  debug: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      await saveUserToSanity(user);
      return true;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.id = token.sub as string; // Ensure ID is always set
      }
      return session;
    },
  },
};

export const auth = NextAuth(authOptions);
