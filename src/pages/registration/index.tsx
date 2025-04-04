import Navbar from "../../components/Navbar";
import RegistrationForm from "../../components/RegistrationForm";
import Footer from "../../components/Footer";

const RegistrationPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <RegistrationForm />
            <Footer />
        </div>
    );
};

export default RegistrationPage;
