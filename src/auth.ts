import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { getUserByUsername } from "@/db/queries/select";
import { verifyPassword } from "@/db/utils/password";
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        let user = null;

        // Validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        // Get user
        user = await getUserByUsername(parsedCredentials.data.username);

        if (!user) {
          console.error("Invalid username");
          return null;
        }

        const passwordMatch = await verifyPassword(parsedCredentials.data.password, user.password);

        if (!passwordMatch) {
          console.error("Invalid credentials");
          return null;
        }

        return {
          ...user,
          id: user.id.toString(),
          name: user.username
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.id = String(token.id);
      }
      return session;
    },
  },
});
