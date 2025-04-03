import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Product } from "@/types";

interface AdminProductsPageProps {
    products: Product[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user?.isAdmin) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const products = await prisma.product.findMany({});

    return {
        props: {
            orders: JSON.parse(JSON.stringify(products)),
        }
    }
};

const AdminProductsPage = ({ products }: AdminProductsPageProps) => {
    const deleteProduct = async (id: number) => {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        products.filter(product => product.id !== id);
    };

    return (
        <div>
            <Navbar />
            <h2>Продукти</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <button onClick={() => deleteProduct(product.id)}>
                            Изтрий
                        </button>
                    </li>
                 ))}
            </ul>
            <Footer />
        </div>
    );
};

export default AdminProductsPage;
