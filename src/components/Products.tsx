import '../app/globals.css';
import { StaticImageData } from "next/image";
import Product from './Product';

interface ProductsProps {
    products: {
        url: StaticImageData,
        name: string,
        price: number,
        discount: number,
        link: string,
    }[],
}

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="w-[57.5rem] flex flex-wrap gap-y-[0.625rem] text-sm">
            {products.map((product, i) => (
                <Product product={product} i={i} />
            ))}
        </div>
    );
};

export default Products;
