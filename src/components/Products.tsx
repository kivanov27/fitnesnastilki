import Product from "./Product";
import { Product as ProductType } from "@/types";

interface ProductsProps {
    products: ProductType[];
    category: string | string[];
}

const Products = ({ products, category }: ProductsProps) => {
    return (
        <div className="w-full lg:w-[70%] xl:w-[78%] flex flex-wrap gap-x-2 lg:gap-x-0 gap-y-[0.625rem] text-sm">
            {products.map((product) => (
                <Product
                    product={product}
                    category={category}
                    key={product.id}
                />
            ))}
        </div>
    );
};

export default Products;
