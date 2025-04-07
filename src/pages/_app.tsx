import { CartProvider } from "../context/CartContext";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import "../app/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#870000",
            dark: "#620000",
        },
    },
});


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <CartProvider>
                <ThemeProvider theme={theme}>
                    <div className={`max-w-full ${montserrat.className}`}>
                        <Component {...pageProps} />
                    </div>
                </ThemeProvider>
            </CartProvider>
        </SessionProvider>
    );
}

export default MyApp;
