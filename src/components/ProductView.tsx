import { Product } from "@/types";
import { Breadcrumbs, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

interface ProductViewProps {
    product: Product,
    category: string | string[] | undefined
}

const ProductView = ({ product, category }: ProductViewProps) => {
    const [index, setIndex] = useState<number>(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const images = [product.image1, product.image2, product.image3, product.image4].filter((img): img is string => Boolean(img));

    const scrollThumbnails = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            if (direction === "left") {
                scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    const renderCategoryBreadcrumb = () => {
        switch (category) {
            case "plocha":
                return <Link href="/katalog/plocha" className="hover:underline hover:text-primary">Настилки на плоча</Link>;
            case "rulo":
                return <Link href="/katalog/rulo" className="hover:underline hover:text-primary">Настилки на руло</Link>;
            case "izkustvena-treva":
                return <Link href="/katalog/izkustvena-treva" className="hover:underline hover:text-primary">Настилки изкуствена трева</Link>;
            case "tatami":
                return <Link href="/katalog/tatami" className="hover:underline hover:text-primary">Настилки татами</Link>;
            case "postelki":
                return <Link href="/katalog/postelki" className="hover:underline hover:text-primary">Постелки за фитнес и йога</Link>;
            case "platformi-podiumi":
                return <Link href="/katalog/platformi-podiumi" className="hover:underline hover:text-primary">Платформи и подиуми</Link>;
        }
    };

    return (
        <div className="w-[75rem] mx-auto my-10 flex">
            <div className="w-1/2 pe-2">

                {/* Main image */}
                <div className="w-full flex overflow-hidden">
                    {images.map((image, i)=> (
                        <div
                            key={i}
                            style={{
                                transform: `translateX(${-100 * index}%)`,
                                transition: "transform 0.3s ease-in-out",
                                minWidth: "100%"
                            }}
                            className="border border-gray-400"
                        >
                            <Image 
                                src={image} 
                                alt={`Product image ${i+1}`} 
                                width={600}
                                height={600}
                                aria-hidden={index !== i}
                                className="slider-img w-[37.25rem] h-[37.25rem] object-contain block shrink-0 grow-0"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>

                {/* Thumbnail images */}
                <div className="w-full relative flex pt-2 bg-gray-200">

                    {/* Left arrow */}
                    <button 
                        className="bg-gray-200 hover:bg-gray-400 border border-gray-400 px-1 text-gray-800 transition-colors duration-300 me-1"
                        onClick={() => scrollThumbnails("left")}
                    >
                        ◀
                    </button>

                    {/* Thumbnails */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-hidden w-full" 
                    >
                        {images.map((image, i) => (
                            <div
                                key={i}
                                className={`cursor-pointer border-2 ${index === i ? "border-gray-400" : "border-transparent"} transition-all duration-300`}
                                onClick={() => setIndex(i)}
                            >
                                <Image
                                    src={image}
                                    alt={`Product image ${i + 1}`}
                                    width={200}
                                    height={200}
                                    className="w-40 min-w-40 h-40 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button 
                        className="bg-gray-200 hover:bg-gray-400 border border-gray-400 px-1 text-gray-800 transition-colors duration-300 ms-1"
                        onClick={() => scrollThumbnails("right")}
                    >
                        ▶
                    </button>
                </div>
            </div>

            <div className="w-1/2 bg-white ms-2 shadow-lg border border-gray-400 p-8">
                {category && 
                    <Breadcrumbs aria-label="breadcrumbs" sx={{ fontSize: "0.75rem" }} className="mb-8">
                        <Link href="/katalog" className="hover:underline hover:text-primary">
                            Каталог
                        </Link>
                        {renderCategoryBreadcrumb()}
                        <Typography sx={{ fontWeight: 600, fontSize: "0.75rem" }}>{product.name}</Typography>
                    </Breadcrumbs>
                }
                <h2>{product.name}</h2>
                {product.discount ?
                    <div>
                        <p><span>{product.price}</span> {product.discount}</p>
                    </div>
                    :
                    <p>{product.price}</p>
                }
            </div>
        </div>
    );
};

export default ProductView;
