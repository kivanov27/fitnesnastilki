import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

console.log("🔹 Initializing NextAuth..."); // 🚀 Debug log

export default NextAuth(authOptions);

console.log("✅ NextAuth Initialized!"); // 🚀 Debug log

