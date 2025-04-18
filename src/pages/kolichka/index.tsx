import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import Head from "next/head";

const CartPage = () => {
    return (
        <>
            <Head>
                <title>Количка</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Cart />
                <Footer />
            </div>
        </>
    );
};

export default CartPage;
