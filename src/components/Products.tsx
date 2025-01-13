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
        <div className="w-[60rem] mx-auto flex flex-wrap">
            {products.map(product => (
                <div 
                    key={product.name}
                    className="w-1/4 px-2"
                >
                    <div className="border border-black">
                        <Image
                            src={product.url}
                            alt={product.name}
                        />
                        <p>
                            {product.name}
                        </p>
                        <p>
                            {(product.price - (product.price * product.discount/100)).toFixed(2)} лв.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
