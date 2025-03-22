"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../../../app/globals.css';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Products from "@/components/Products";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import { Product } from '@/types';

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

const Category = () => {
    const params = useParams();
    const slug = params?.slug;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const renderBreadcrumb = () => {
        switch (slug) {
            case "plocha":
                return <Typography sx={{ fontWeight: '600' }}>Настилки на плоча</Typography>;
            case "rulo":
                return <Typography sx={{ fontWeight: '600' }}>Настилки на руло</Typography>;
            case "izkustvena-treva":
                return <Typography sx={{ fontWeight: '600' }}>Настилки изкуствена трева</Typography>;
            case "tatami":
                return <Typography sx={{ fontWeight: '600' }}>Настилки татами</Typography>;
            case "postelki":
                return <Typography sx={{ fontWeight: '600' }}>Постелки за фитнес и йога</Typography>;
            case "platformi-podiumi":
                return <Typography sx={{ fontWeight: '600' }}>Платформи и подиуми</Typography>;
        }
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`/api/products/category/${slug}`);
                if (!res.ok) throw new Error("Couldn't fetch products");

                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchProducts();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!slug) return null;

    return (
        <div className={`${montserrat.className} bg-gray-200 min-h-screen flex flex-col`}>
            <Navbar />
            <Breadcrumbs 
                aria-label="breadcrumbs" 
                className="w-[75rem] mx-auto"
                sx={{ marginX: 'auto', marginY: '2rem' }}
            >
                <Link href="/katalog" className="hover:underline hover:text-primary">
                    Каталог
                </Link>
                {renderBreadcrumb()}
            </Breadcrumbs>

            <div className="flex flex-grow justify-center w-[75rem] mx-auto mb-20">
                <Sidebar />
                <Products products={products} category={slug} />
            </div>
            <Footer />
        </div>
    );
};

export default Category;
