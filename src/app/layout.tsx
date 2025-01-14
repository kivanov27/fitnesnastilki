import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

export const metadata: Metadata = {
    title: "Фитнес Настилки",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.className} antialiased bg-gray-200`}
            >
                {children}
            </body>
        </html>
    );
}
