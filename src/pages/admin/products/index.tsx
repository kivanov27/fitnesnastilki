import { useState } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Product } from "@/types";
import Image from "next/image";
import Head from "next/head";
import ProductForm from "@/components/ProductForm";

interface AdminProductsPageProps {
    products: Product[];
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

    const products = await prisma.product.findMany();

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
};

const AdminProductsPage = ({ products }: AdminProductsPageProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [productList, setProductList] = useState<Product[]>(products);

    const deleteProduct = async (link: string) => {
        await fetch(`/api/products/${link}`, { method: "DELETE" });
        products.filter((product) => product.link !== link);
        setProductList(productList.filter(p => p.link !== link));
    };

    const refreshProducts = async () => {
        const res = await fetch('/api/products');
        const updatedProducts = await res.json();
        setProductList(updatedProducts);
    };

    return (
        <>
            <Head>
                <title>Всички продукти</title>
            </Head>
            <div>
                <Navbar />
                <h2 className="text-lg lg:text-xl font-medium text-center my-6">
                    Продукти
                </h2>
                {formOpen ?
                    <ProductForm
                        product={selectedProduct}
                        onSuccess={() => {
                            setFormOpen(false);
                            refreshProducts();
                        }}
                    />
                    :
                    <ul className="p-4 lg:p-6 flex flex-row sm:flex-col flex-wrap gap-y-4">
                        {productList.map((product) => (
                            <li
                                key={product.id}
                                className="flex flex-col sm:flex-row gap-x-4 items-center justify-center lg:justify-start"
                            >
                                <div className="relative aspect-square w-20 h-20">
                                    <Image
                                        src={product.image1}
                                        alt={product.name}
                                        fill
                                        sizes="5rem"
                                        className="object-cover"
                                    />
                                </div>
                                <p className="font-medium">{product.name}</p>
                                <p>Цена: {product.price}лв.</p>
                                <p>Отстъпка: {product.discount}%</p>
                                {product.discount ? (
                                    <p>
                                        Крайна:{" "}
                                        {product.price -
                                            (product.price * product.discount) /
                                            100}
                                        лв.
                                    </p>
                                ) : (
                                    <p>Крайна: {product.price}лв.</p>
                                )}
                                <button
                                    className="text-white bg-primary p-2"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setFormOpen(true);
                                    }}
                                >
                                    Промени
                                </button>
                                <button
                                    className="text-white bg-primary p-2"
                                    onClick={() => deleteProduct(product.link)}
                                >
                                    Изтрий
                                </button>
                            </li>
                        ))}
                    </ul>
                }
                <Footer />
            </div>
        </>
    );
};

export default AdminProductsPage;
