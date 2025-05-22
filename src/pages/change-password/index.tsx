import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";
import ChangePasswordForm from "../../components/ChangePasswordForm";

const ChangePasswordPage = () => {
    return (
        <>
            <Head>
                <title>Смяна на паролата</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <ChangePasswordForm />
                <Footer />
            </div>
        </>
    );
};

export default ChangePasswordPage;
