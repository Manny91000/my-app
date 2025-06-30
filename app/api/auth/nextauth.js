import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await fetchUserFromDB(credentials.email);
        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
