import { useState } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Order } from "@/types";
import Head from "next/head";

interface OrdersPageProps {
    orders: Order[];
}

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

    const response = await fetch(`${process.env.BASE_URL}/api/orders`, {
        headers: {
            Cookie: context.req.headers.cookie || "",
        },
    });
    if (!response.ok) {
        return {
            props: { orders: [] },
        };
    }

    const orders = await response.json();
    return {
        props: { orders },
    };
};

const OrdersPage = ({ orders: initialOrders }: OrdersPageProps) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);

    const changeStatus = async (id:string, status: string) => {
        const response = await fetch("/api/orders", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, status }),
        });
        if (!response.ok) {
            console.error("Couldn't update order status");
        }
        else {
            setOrders(prev =>
                prev.map(o => o.id === id ? { ...o, status } : o)
            );
        }
    };
    
    const deleteOrder = async (id: string) => {
        try {
            const res = await fetch("/api/orders", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            
            if (!res.ok) {
                console.error("Couldn't delete order")
            }

            setOrders(prev =>
                prev.filter(o => o.id != id)
            );
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Head>
                <title>Всички поръчки</title>
            </Head>
            <div className="flex flex-col min-h-screen w-full">
                <Navbar />
                <div className="w-full xl:w-[75rem] mx-auto flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-0">
                    <h2 className="text-center text-2xl my-6">Поръчки</h2>
                    <div className="flex flex-col mb-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-y-2 p-4 mb-4 border border-black"
                            >
                                <p className="font-medium">
                                    Поръчка #{order.id}
                                </p>
                                {order.created_at &&
                                    <p>
                                        <span className="font-medium">
                                            Дата:{" "}
                                        </span>
                                        {new Date(order.created_at).toLocaleString('en-GB', {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                }
                                <p>
                                    <span className="font-medium">
                                        Статус:{" "}
                                    </span>
                                    <select 
                                        value={order.status}
                                        className="border border-black px-2"
                                        onChange={({ target }) => changeStatus(order.id, target.value)}
                                    >
                                        <option value="Очаква се">Очаква се</option>
                                        <option value="Изпратена">Изпратена</option>
                                        <option value="Извършена">Извършена</option>
                                        <option value="Отказана">Отказана</option>
                                    </select>
                                </p>
                                <p>
                                    <span className="font-medium">Име: </span>
                                    {order.customer_name}{" "}
                                    {order.customer_surname}
                                </p>
                                <p>
                                    <span className="font-medium">Тел: </span>
                                    {order.customer_phone}
                                </p>
                                <p>
                                    <span className="font-medium">Имейл: </span>
                                    {order.customer_email}
                                </p>
                                <p>
                                    <span className="font-medium">Адрес: </span>
                                    {order.customer_city},{" "}
                                    {order.customer_address}
                                </p>
                                <p>
                                    <span className="font-medium">Сума: </span>
                                    {order.total_price}лв.
                                </p>
                                {order.notes && <p>
                                    <span className="font-medium">Бележки: </span>
                                    {order.notes}
                                </p>}
                                <p className="font-medium">Продукти:</p>
                                {order.order_items &&
                                    order.order_items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-x-4"
                                        >
                                            <p>{item.product_name}</p>
                                            <p>
                                                <span className="font-medium">
                                                    Цена:{" "}
                                                </span>
                                                {item.price}лв.
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Брой:{" "}
                                                </span>
                                                {item.quantity}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Общо:{" "}
                                                </span>
                                                {item.subtotal}лв.
                                            </p>
                                        </div>
                                    ))}
                                <button
                                    className="w-fit p-2 mt-3 border border-black
                                    rounded-md hover:bg-slate-300"
                                    onClick={() => deleteOrder(order.id)}
                                >
                                    Изтрий поръчка
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default OrdersPage;
