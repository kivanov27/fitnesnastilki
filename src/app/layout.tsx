import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
        <html lang="bg">
            <body
                className={`${montserrat.className} antialiased bg-gray-200`}
            >
                {children}
            </body>
        </html>
    );
}
