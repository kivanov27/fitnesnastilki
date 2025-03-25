import "../../app/globals.css"
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";

const CartPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Cart />
            <Footer />
        </div>
    );
};

export default CartPage;
