import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../prisma/prisma.config"; // ruta del prisma client
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Nombre", type: "text" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const name = credentials?.name?.trim();
        const email = credentials?.email?.trim()?.toLowerCase();
        if (!email) return null;

        // Busca usuario por email; si no existe, créalo (asignando id automática en Prisma)
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { name: name ?? "Sin nombre", email },
          });
        }
        // Devuelve los campos que quieras exponer en el token/session
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = session.user || {};
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
});