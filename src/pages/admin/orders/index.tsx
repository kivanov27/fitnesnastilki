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

    const orders = await prisma.orders.findMany({
        include: {
            order_items: true,
        }
    });

    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders)),
        }
    }
};

const OrdersPage = ({ orders }: OrdersPageProps) => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <div className="w-full xl:w-[75rem] mx-auto flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-0">
                <h2 className="text-center text-2xl my-6">Поръчки</h2>
                <div className="flex flex-col mb-6">
                    {orders.map(order => (
                        <div key={order.id} className="flex flex-col gap-y-2">
                            <p className="font-medium">Поръчка #{order.id}</p>
                            <p><span className="font-medium">Статус: </span>{order.status}</p>
                            <p><span className="font-medium">Име: </span>{order.customer_name} {order.customer_surname}</p>
                            <p><span className="font-medium">Тел: </span>{order.customer_phone}</p>
                            <p><span className="font-medium">Имейл: </span>{order.customer_email}</p>
                            <p><span className="font-medium">Адрес: </span>{order.customer_city}, {order.customer_address}</p>
                            <p><span className="font-medium">Сума: </span>{order.total_price}лв.</p>
                            {order.notes && <p>Бележки: {order.notes}</p>}
                            <p className="font-medium">Продукти:</p>
                            {order.order_items && order.order_items.map(item => (
                                <div key={item.id} className="flex gap-x-4">
                                    <p>{item.product_name}</p>
                                    <p><span className="font-medium">Цена: </span>{item.price}лв.</p>
                                    <p><span className="font-medium">Брой: </span>{item.quantity}</p>
                                    <p><span className="font-medium">Общо: </span>{item.subtotal}лв.</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default OrdersPage;
