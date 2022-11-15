import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "lib/utils/connectMongo";
import { verifyPassword } from "lib/utils/auth";
import User from "lib/models/user.model";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        await connectMongo();
        const email = credentials?.email;
        const password = credentials?.password ;
        const user = await User.findOne({
          email: email,
        });
        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    session({ session, token, user }) {
      session.user.role = token.user.role;
      session.user._id = token.user._id;
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});
