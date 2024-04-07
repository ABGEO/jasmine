import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      // Initial sign in.
      if (
        account &&
        account.access_token &&
        account.id_token
      ) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;

      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/api/auth/signin")) {
        return "/";
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      return baseUrl;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
