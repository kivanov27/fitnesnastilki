import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Products from "@/components/Products";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Product } from "@/types";
import Head from "next/head";

const Category = () => {
    const params = useParams();
    const slug = params?.slug;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const renderCategoryName = () => {
        switch (slug) {
            case "vsichki":
                return "Всички продукти";
            case "plocha":
                return "Настилки на плоча";
            case "rulo":
                return "Настилки на руло";
            case "izkustvena-treva":
                return "Настилки изкуствена трева";
            case "tatami":
                return "Настилки татами";
            case "postelki":
                return "Постелки за фитнес и йога";
            case "platformi-podiumi":
                return "Платформи и подиуми";
        }
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                if (slug === "vsichki") {
                    const res = await fetch(`/api/products`);
                    if (!res.ok) throw new Error("Couldn't fetch products");
                    const data = await res.json();
                    setProducts(data);
                } else {
                    const res = await fetch(`/api/products/category/${slug}`);
                    if (!res.ok) throw new Error("Couldn't fetch products");
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchProducts();
    }, [slug]);

    if (loading) return null;
    if (!slug) return null;

    return (
        <>
            <Head>
                <title>{renderCategoryName()}</title>
            </Head>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Breadcrumbs
                    aria-label="breadcrumbs"
                    className="w-full xl:w-[75rem] mx-auto px-6 sm:px-12 lg:px-20 xl:px-0"
                    sx={{ marginX: "auto", marginY: "2rem" }}
                >
                    <Link
                        href="/katalog"
                        className="hover:underline hover:text-primary"
                    >
                        Каталог
                    </Link>
                    <Typography sx={{ fontWeight: "600" }}>
                        {renderCategoryName()}
                    </Typography>
                </Breadcrumbs>

                <div className="flex flex-grow justify-center w-full xl:w-[75rem] mx-auto px-6 sm:px-12 lg:px-20 xl:px-0 mb-20">
                    <Sidebar />
                    <Products products={products} category={slug} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Category;
