import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Order } from "@/types";

interface OrdersPageProps {
    orders: Order[];
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

    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders)),
        }
    }
};

const OrdersPage = ({ orders }: OrdersPageProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
                <h2>Поръчки</h2>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Поръчка #{order.id} - {order.status} - {order.total_price}лв.
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
};

export default OrdersPage;
