import '../app/globals.css';
import Product from './Product';
import { Product as ProductType } from '@/types';

interface ProductsProps {
    products: ProductType[];
}

const Products = ({ products }: ProductsProps) => {
    return (
        <div className="w-[57.5rem] flex flex-wrap gap-y-[0.625rem] text-sm">
            {products.map((product) => (
                <Product product={product} key={product.name} />
            ))}
        </div>
    );
};

export default Products;
