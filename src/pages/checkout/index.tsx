import Navbar from "@/components/Navbar";
import Checkout from "@/components/Checkout";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Checkout />
            <Footer />
        </div>
    );
};

export default CheckoutPage;
