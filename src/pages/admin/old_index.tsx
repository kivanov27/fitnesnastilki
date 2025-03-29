import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Order, Product } from "@/types";

const AdminPage = async () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (status === "loading") return;
        if (!session || !session.user.isAdmin) {
            router.push('/login');
        }

        async function fetchData() {
            const ordersRes = await fetch("/api/orders");
            const ordersData = await ordersRes.json();
            setOrders(ordersData);

            const productsRes = await fetch("/api/products");
            const productsData = await productsRes.json();
            setProducts(productsData);
        }

        fetchData();
    }, [session, status, router]);

    const deleteProduct = async (id: number) => {
        await fetch(`/api/products/{id}`, { method: "DELETE" });
        setProducts(products.filter(product => product.id !== id));
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
        </div>
    );
};

export default AdminPage;
