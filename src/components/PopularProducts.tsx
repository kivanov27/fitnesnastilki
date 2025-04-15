"use client"

import { Product as ProductType } from "@/types";
// import Image from "next/image";
// import Link from "next/link";
import Product from "./Product";

const PopularProducts = ({ products }: { products: ProductType[] }) => {
    return (
        <div className="w-full xl:w-[75rem] my-6 lg:my-24 mx-auto px-6 sm:px-12 lg:px-20 xl:px-0">
            <h2 className="mb-6 lg:mb-12 text-xl lg:text-4xl text-center uppercase text-primary">Популярни продукти</h2>
            <div className="flex flex-wrap justify-between gap-y-3">
                {products.map(product =>
                    <Product product={product} category={product.category[0]} key={product.id} />
                )}
            </div>
        </div>
    );
};

export default PopularProducts;
