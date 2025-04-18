import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Navbar from "../../../components/Navbar";
import ProductForm from "../../../components/ProductForm";
import Footer from "../../../components/Footer";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    if (!session?.user?.isAdmin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

const AddProductPage = () => {
    return (
        <>
            <Head>
                <title>Добави продукт</title>
            </Head>
            <div>
                <Navbar />
                <ProductForm />
                <Footer />
            </div>
        </>
    );
};

export default AddProductPage;
