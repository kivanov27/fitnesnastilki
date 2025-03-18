
"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types";

const ProductPage = () => {
    const params = useParams();
    const slug = params?.slug;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProduct() {
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

        if (slug) fetchProduct()
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>

    return (
        <div>
            <p>{product.name} | {product.id}</p>
            <Image 
                src={product.image1} 
                alt={product.name} 
                width={500}
                height={500}
            />
        </div>
    );
};

export default ProductPage;
