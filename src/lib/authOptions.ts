import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // REMOVE
                console.log("AUTHORIZING USER: ", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) {
                    throw new Error("User not found");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                // REMOVE
                console.log("USER AUTHENTICATED: ", user);
                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // REMOVE
            console.log("JWT CALLBACK - Before: ", token);

            if (user) {
                token.id = user.id;
                token.email = user.email ?? "";
                token.isAdmin = user.email === "fitnesnastilki@gmail.com"; // add more admin emails here if needed
            }
            // REMOVE
            console.log("JWT CALLBACK - After: ", token);

            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            // REMOVE
            console.log("SESSION CALLBACK - Before: ", session);

            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            // REMOVE
            console.log("SESSION CALLBACK - After: ", session);

            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    }
};
