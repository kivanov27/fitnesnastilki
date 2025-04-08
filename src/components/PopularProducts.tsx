import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

const PopularProducts = ({ products }: { products: Product[] }) => {
    return (
        <div className="w-full xl:w-[75rem] my-6 lg:my-24 mx-auto px-6 sm:px-12 lg:px-20 xl:px-0">
            <h2 className="mb-6 lg:mb-12 text-xl lg:text-4xl text-center uppercase text-primary">Популярни продукти</h2>
            <div className="flex flex-wrap justify-between">
                {products.map(product => (
                    <Link 
                        key={product.id}
                        href={`/katalog/vsichki/${product.link}`}
                        className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[23%] xl:w-[24%]"
                    >
                        <div className="relative w-full aspect-square mb-2 lg:mb-4 border border-gray-400 drop-shadow-md overflow-hidden">
                            <Image 
                                src={product.image1} 
                                alt={product.name} 
                                fill
                                sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 24vw"
                                quality={75}
                                draggable="false"
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-center text-sm lg:text-base mb-6 lg:mb-8">{product.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
