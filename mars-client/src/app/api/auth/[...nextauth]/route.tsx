import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authRepository from "@/features/auth/api/auth-repository";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const response = await authRepository.authorize(credentials?.email, credentials?.password)

          if (response.data) {
            return { id: response.data.user.id, name: response.data.user.name, email: response.data.user.email };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
