import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handlers = NextAuth(
    {
        pages:{
            signIn: '/Signin',
            signOut: '/logout',
            error: '/error',

        },
        providers: [
        

            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                  email: { label: "email", type: "text", placeholder: "Manuel" },
                  password: { label: "Password", type: "password" }
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async authorize(credentials): Promise<any> {
                  return {
                    name: 'Manuel',
                    id: 1,
                    email: credentials?.email,
                    image: 'https://example.com/images/profile.jpg',
                    roles: ['user']
                  }
                }
              })
        ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }

}
    }
);

export { handlers as GET, handlers as POST, } 