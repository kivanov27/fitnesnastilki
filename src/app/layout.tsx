import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
// import { createTheme, ThemeProvider } from "@mui/material";

export const metadata: Metadata = {
    title: "Фитнес Настилки",
    description: "",
};

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#870000",
//             dark: "#620000",
//         },
//     },
// });

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="bg">
            <body
                className={`${montserrat.className} antialiased`}
            >
                <CartProvider>
                    {/* <ThemeProvider theme={theme}> */}
                        {children}
                    {/* </ThemeProvider> */}                
                </CartProvider>
            </body>
        </html>
    );
}
