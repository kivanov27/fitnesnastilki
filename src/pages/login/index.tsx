import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import Head from "next/head";

const LoginPage = () => {
    return (
        <>
            <Head>
                <title>Влезте в акаунта си</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <LoginForm />
                <Footer />
            </div>
        </>
    );
};

export default LoginPage;
