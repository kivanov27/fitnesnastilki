import { CartProvider } from "../context/CartContext";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import "../app/globals.css";
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
        <CartProvider>
            <ThemeProvider theme={theme}>
                <div className={montserrat.className}>
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </CartProvider>
    );
}

export default MyApp;
