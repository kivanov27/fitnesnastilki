import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { Order, Product } from "@/types";
import ProductForm from "@/components/ProductForm";

interface AdminPageProps {
    orders: Order[];
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

    const orders = await prisma.orders.findMany({});
    const products = await prisma.product.findMany({});

    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
};

const AdminPage = ({ orders, products }: AdminPageProps) => {

    const deleteProduct = async (id: number) => {
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        products.filter(product => product.id !== id);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Поръчки</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Поръчка #{order.id} - {order.status} - {order.total_price}лв.
                    </li>
                ))}
            </ul>

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

            <ProductForm />
        </div>
    );
};

export default AdminPage;
