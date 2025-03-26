import { CartProvider } from "../context/CartContext";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import "../app/globals.css";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <div className={montserrat.className}>
                <Component {...pageProps} />
            </div>
        </CartProvider>
    );
}

export default MyApp;
