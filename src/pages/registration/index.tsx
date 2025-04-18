import Navbar from "../../components/Navbar";
import RegistrationForm from "../../components/RegistrationForm";
import Footer from "../../components/Footer";
import Head from "next/head";

const RegistrationPage = () => {
    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <RegistrationForm />
                <Footer />
            </div>
        </>
    );
};

export default RegistrationPage;
