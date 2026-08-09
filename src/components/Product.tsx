import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product as ProductType } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductProps {
    product: ProductType;
    category: string | string[];
}

const Product = ({ product, category }: ProductProps) => {
    const { addToCart } = useCart();

    return (
        <div
            key={product.id}
            className="w-[48%] sm:w-[32%] xl:w-[24%] lg:ms-2 relative bg-gray-100
            border border-gray-400 p-4 flex flex-col gap-y-2 hover:scale-105
            transition duration-300 ease-in-out"
        >
            {/* Discount dot */}
            {product.discount !== 0 && (
                <div className="absolute top-0 left-0 px-1 bg-primary font-medium rounded-br-lg text-white z-20">
                    -{product.discount}%
                </div>
            )}

            {/* Product Image */}
            <Link
                href={`/katalog/${category}/${product.link}`}
                className="block"
            >
                <div className="relative w-full aspect-square border border-gray-300 overflow-hidden z-10">
                    <Image
                        src={product.image1}
                        alt={product.name}
                        fill
                        sizes="(max-width: 639px) 48vw, (max-width: 1023px) 32vw, (max-width: 1279px) 25vw, 24vw"
                        quality={75}
                        draggable="false"
                        className="object-cover hover:scale-110 transition-transform duration-[2000ms] ease-in-out"
                    />
                </div>
            </Link>

            {/* Product Name */}
            <Link href={`/katalog/${category}/${product.link}`}>
                <p className="h-20 text-xs sm:text-sm font-medium hover:text-primary overflow-y-scroll">
                    {product.name}
                </p>
            </Link>

            <div className="flex-grow">
	        {/* Price Leva */}
                {/* {product.discount ? ( */}
                {/*     <p className="font-medium flex flex-col md:flex-row gap-x-2 xl:text-base"> */}
                {/*         <span className="text-gray-400 line-through"> */}
                {/*             {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" лв."} */}
                {/*         </span> */}
                {/*         <span className="text-primary"> */}
                {/*             {( */}
                {/*                 product.price - */}
                {/*                 (product.price * product.discount) / 100 */}
                {/*             ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" лв."} */}
                {/*         </span> */}
                {/*     </p> */}
                {/* ) : ( */}
                {/*     <p className="text-primary font-medium xl:text-base"> */}
                {/*         {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" лв."} */}
                {/*     </p> */}
                {/* )} */}

                {/* Price Euro */}
                {product.discount ? (
                    <p className="font-medium flex flex-col md:flex-row gap-x-2 xl:text-base">
                        <span className="text-gray-400 line-through">
                            {(product.price * 0.51129188).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" €"}
                        </span>
                        <span className="text-primary">
                            {((product.price - (product.price * product.discount) / 100) * 0.51129188).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" €"}
                        </span>
                    </p>
                ) : (
                    <p className="text-primary font-medium xl:text-base">
                        {(product.price * 0.51129188).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" €"}
                    </p>
                )}
            </div>

            {/* Add to Cart Button */}
            <Button
                variant="contained"
                sx={{
                    width: "100%",
                    display: "block",
                    marginX: "auto",
                    backgroundColor: "var(--color-primary)",
                    marginTop: 'auto'
                }}
                className="addToCart-btn"
                onClick={() =>
                    addToCart({
                        ...product,
                        price: product.discount
                            ? product.price -
                            (product.price * product.discount) / 100
                            : product.price,
                        quantity: 1,
                        image: product.image1,
                    })
                }
            >
                <ShoppingCartIcon />
            </Button>
        </div>
    );
};

export default Product;
