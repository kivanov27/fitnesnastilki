import { Product } from "@/types";
import { Breadcrumbs, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";

interface ProductViewProps {
    product: Product,
    category: string | string[] | undefined
}

const ProductView = ({ product, category }: ProductViewProps) => {
    const [index, setIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [quantityInput, setQuantityInput] = useState<string>("1");
    const [quantityError, setQuantityError] = useState<string | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const images = [product.image1, product.image2, product.image3, product.image4].filter((img): img is string => Boolean(img));
    const { addToCart } = useCart();

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
            case "vsichki":
                    return <Link href="/katalog/vsichki" className="hover:underline hover:text-primary">Всички продукти</Link>;
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

    const handleQuantitySet = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const num = Number(quantityInput);

            if (isNaN(num)) {
                setQuantityError("Моля въведете валидно число");
            } else if (num < 1) {
                setQuantityError("Моля въведете число по-голямо от 0");
            } else {
                setQuantity(num);
                setQuantityError(null);
            }
        }
    };

    return (
        <div 
            className="w-full xl:w-[75rem] mx-auto my-10 px-6 sm:px-12 lg:px-20 xl:px-0
            flex flex-col md:flex-row gap-y-6 md:gap-y-0"
        >

            {/* Left side */}
            <div className="w-full md:w-1/2 md:pe-2">

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
                            <div className="relative w-full aspect-square">
                                <Image 
                                    src={image} 
                                    alt={`Product image ${i+1}`} 
                                    aria-hidden={index !== i}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 37.25rem"
                                    className="slider-img object-contain"
                                    draggable="false"
                                />
                            </div>
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
                                <div className="relative w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40">
                                    <Image
                                        src={image}
                                        alt={`Product image ${i + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 6rem, (max-width: 1280px) 8rem, 10rem"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button 
                        className="bg-gray-200 border border-gray-400 px-1 text-gray-800 
                        hover:bg-gray-400 transition-colors duration-300 ms-1"
                        onClick={() => scrollThumbnails("right")}
                    >
                        ▶
                    </button>
                </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 bg-white md:ms-2 shadow-lg border border-gray-400 p-4 sm:p-8">
                {/* Breadcrumbs */}
                {category && 
                    <Breadcrumbs aria-label="breadcrumbs" sx={{ fontSize: "0.75rem", marginBottom: "2rem" }}>
                        <Link href="/katalog" className="hover:underline hover:text-primary">
                            Каталог
                        </Link>
                        {renderCategoryBreadcrumb()}
                        <Typography sx={{ fontWeight: 600, fontSize: "0.75rem" }}>{product.name}</Typography>
                    </Breadcrumbs>
                }

                {/* Product name */}
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium mb-8">{product.name}</h2>

                {/* Price */}
                {product.discount ?
                    <div className="mb-8">
                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-primary font-medium">
                            <span className="font-normal text-gray-400 me-3 line-through">{product.price}лв.</span>
                            {product.price - (product.price * product.discount / 100)}лв.
                        </p>
                    </div>
                    :
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-primary font-medium mb-8">{product.price}лв.</p>
                }

                {/* Add to cart */}
                <div className="flex gap-x-6">
                    <div className="flex">
                        <div 
                            className="border border-gray-300 p-2 cursor-pointer transition-colors
                            hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                            onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                    setQuantityInput(String(quantity - 1));
                                }
                            }}
                        >
                            -
                        </div>
                        <input 
                            className="border border-gray-300 w-14 p-2 text-center" 
                            value={quantityInput} 
                            onChange={({ target }) => setQuantityInput(target.value)}
                            onKeyDown={handleQuantitySet}
                        />
                        <div
                            className="border border-gray-300 p-2 cursor-pointer transition-colors
                            hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                            onClick={() => {
                                setQuantity(quantity + 1);
                                setQuantityInput(String(quantity + 1));
                            }}
                        >
                            +
                        </div>
                    </div>

                    <button 
                        className="border border-primary bg-primary uppercase text-white text-xs font-bold px-2 
                        hover:bg-primaryDim hover:border-primaryDim transition-colors duration-300"
                        onClick={() => {
                            addToCart({ 
                                ...product, 
                                price: product.discount ? product.price - (product.price * product.discount / 100) : product.price,
                                quantity: quantity,
                                image: product.image1
                            });
                        }}
                    >
                        Добавяне в количката
                    </button>
                </div>
                {quantityError &&
                    <p className="w-fit mt-1 p-3 bg-gray-700 rounded-md text-white text-sm">{quantityError}</p>
                }

            </div>
        </div>
    );
};

export default ProductView;
