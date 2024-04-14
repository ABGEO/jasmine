import axios from "axios";

import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data: newToken, status } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        grant_type: "refresh_token",
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (status !== 200) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    return {
      ...token,
      accessToken: newToken.access_token,
      accessTokenExpires: Date.now() + newToken.expires_in * 1000,
      refreshToken: newToken.refresh_token,
      idToken: newToken.id_token,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      // Initial sign in.
      if (
        account &&
        account.access_token &&
        account.refresh_token &&
        account.id_token &&
        account.expires_at
      ) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.accessTokenExpires = account.expires_at * 1000;

        return Promise.resolve(token);
      }

      // Return previous token if the access token has not expired yet.
      if (Date.now() < (token.accessTokenExpires as number)) {
        return Promise.resolve(token);
      }

      // Access token has expired, try to update it.
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.idToken = token.idToken as string;
      session.error = token?.error as string;

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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
