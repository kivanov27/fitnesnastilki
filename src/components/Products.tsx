import Image, { StaticImageData } from "next/image";

interface ProductsProps {
    products: {
        url: StaticImageData,
        name: string,
        price: number,
        discount: number,
        link: string,
    }[]
};

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="w-[57.5rem] flex flex-wrap gap-y-2">
            {products.map((product, i) => (
                <div 
                    key={i}
                    className="w-[14.375rem] ps-2"
                >
                    <div className="border border-gray-400">
                        <Image
                            src={product.url}
                            alt={product.name}
                            draggable="false"
                        />
                        <p className="px-2">
                            {product.name}
                        </p>
                        <p className="px-2 py-2">
                            {(product.price - (product.price * product.discount/100)).toFixed(2)} лв.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
