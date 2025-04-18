import Navbar from "@/components/Navbar";
import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";
import Head from "next/head";

const CheckoutPage = () => {
    return (
        <>
            <Head>
                <title>Приключване на поръчката</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Checkout />
                <Footer />
            </div>
        </>
    );
};

export default CheckoutPage;
