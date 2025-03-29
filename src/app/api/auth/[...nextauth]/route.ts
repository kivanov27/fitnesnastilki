import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
// import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: { 
        strategy: "jwt", 
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("🔹 Authorizing user:", credentials?.email);

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

                console.log("✅ User authenticated:", user.email);
                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log("🔹 JWT Callback - Before:", token);

            if (user) {
                token.id = user.id;
                token.email = user.email ?? "";
                token.isAdmin = user.email === "fitnesnastilki@gmail.com";
            }

            console.log("✅ JWT Callback - After:", token);
            return token;
        },
        async session({ session, token }) {
            console.log("🔹 Session Callback - Before:", session);

            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.isAdmin = token.isAdmin as boolean;
            }

            console.log("✅ Session Callback - After:", session);
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
