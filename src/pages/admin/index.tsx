import { useState, useEffect } from "react";

const AdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const ordersRes = await fetch("/api/orders");
            const productsRes = await fetch("/api/products");

            setOrders(await ordersRes.json());
            setProducts(await productsRes.json());
        }
        fetchData();
    }, [])

    console.log("Orders: ", orders);
    console.log("Products: ", products);

    return (
        <div>
            admin page
        </div>
    );
};

export default AdminPage;
