import db from '@repo/db/client'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { NextAuthOptions} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          phone: { label: "Phone Number", type: "text", placeholder: "123456789" },
          password: { label: "Password", type: "password" }
        },

        // TODO: User credentials type from next-auth
        async authorize(credentials) {
          if (!credentials) {
            throw new Error('No credentials provided');
          }
          
          const { phone, password } = credentials;

          // Zod Validation & OTP Validation

          const hashedPassword = await bcrypt.hash(password, 10)
          const existingUser = await db.user.findFirst({
            where: {
              number: phone,
            }
          })

          if(existingUser){
            const passwordValidation = await bcrypt.compare(password, existingUser.password)
            if(passwordValidation){
              return {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
              }
            }
            return null;
          }

          try {
            const user = await db.user.create({
              data: {
                number: phone,
                password: hashedPassword,
              }
            })

            return {
              id: user.id,
              name: user.name,
              email: user.email
            }
          } catch (error) {
            console.error(error)
          }

          return null;
        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
      async session({ token, session }) {
        if (session.user && token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
  }
}