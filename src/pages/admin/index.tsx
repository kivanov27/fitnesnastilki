import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const AdminPage = () => {
    return (
        <>
            <Head>
                <title>Административен панел</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-col flex-1 items-center justify-center gap-y-10">
                    <h1 className="text-5xl">Admin Dashboard</h1>
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/admin/orders"
                            className="bg-primary text-white text-center p-4 rounded-lg hover:bg-primaryDim transition-colors duration-300"
                        >
                            Поръчки
                        </Link>
                        <Link
                            href="/admin/products"
                            className="bg-primary text-white text-center p-4 rounded-lg hover:bg-primaryDim transition-colors duration-300"
                        >
                            Продукти
                        </Link>
                        <Link
                            href="/admin/addProduct"
                            className="bg-primary text-white text-center p-4 rounded-lg hover:bg-primaryDim transition-colors duration-300"
                        >
                            Добави продукт
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AdminPage;
