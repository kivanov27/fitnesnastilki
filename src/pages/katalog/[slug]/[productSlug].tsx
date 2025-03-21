"use client"

import "../../../app/globals.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductView from "@/components/ProductView";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

const ProductPage = () => {
    const params = useParams();
    const slug = params?.productSlug;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProduct() {
            if (!slug) return;

            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error("Product not found");
                
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>

    return (
        <div className={`${montserrat.className} bg-gray-200`}>
            <Navbar />
            <ProductView product={product} />
            <Footer />
        </div>
    );
};

export default ProductPage;
