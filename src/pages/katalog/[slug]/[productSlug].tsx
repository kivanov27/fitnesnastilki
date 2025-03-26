"use client"

import "../../../app/globals.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductView from "@/components/ProductView";

const ProductPage = () => {
    const params = useParams();

    const productSlug = params?.productSlug;
    const categorySlug = params?.slug;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProduct() {
            if (!productSlug || !categorySlug) return;

            try {
                const res = await fetch(`/api/products/${productSlug}`);
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
    }, [productSlug, categorySlug]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>

    return (
        <div>
            <Navbar />
            <ProductView product={product} category={categorySlug} />
            <Footer />
        </div>
    );
};

export default ProductPage;
