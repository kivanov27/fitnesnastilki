import '../app/globals.css';
import Product from './Product';
import { Product as ProductType } from '@/types';

interface ProductsProps {
    products: ProductType[],
    category: string | string[]
}

const Products = ({ products, category }: ProductsProps) => {
    return (
        <div className="w-[57.5rem] flex flex-wrap gap-y-[0.625rem] text-sm">
            {products.map((product) => (
                <Product product={product} category={category} key={product.id} />
            ))}
        </div>
    );
};

export default Products;
