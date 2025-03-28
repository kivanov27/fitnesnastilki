import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <LoginForm />
            <Footer />
        </div>
    )
}

export default LoginPage;
