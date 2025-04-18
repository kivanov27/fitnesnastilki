import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../context/CartContext";
import { createTheme, ThemeProvider } from "@mui/material";

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
