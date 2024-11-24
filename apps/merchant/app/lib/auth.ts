import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: {
        email: string;
        name: string;
      };
      account: {
        provider: "google" | "github";
      };
    }) {
      if (!user || !user.email) {
        return false;
      }
      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "GOOGLE" : "GITHUB",
        },
        update: {
          name: user.name,
          auth_type: account.provider === "google" ? "GOOGLE" : "GITHUB",
        },
      });
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
