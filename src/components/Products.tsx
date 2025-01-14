import '../app/globals.css';
import { Button } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
        <div className="w-[57.5rem] flex flex-wrap gap-y-[0.625rem] text-sm">
            {products.map((product, i) => (
                <div 
                    key={i}
                    className="w-[14.375rem] ps-2 relative"
                >
                    <div className="relative border border-gray-400 p-4 flex flex-col gap-y-2 hover:scale-105 transition duration-300 ease-in-out">
                        {product.discount !== 0 &&
                            <div className='absolute top-0 left-0 bg-primary px-1 text-white'>
                                -{product.discount}%
                            </div>
                        }
                        <Link href='' className='border border-gray-100'>
                            <Image
                                src={product.url}
                                alt={product.name}
                                draggable="false"
                            />
                        </Link>
                        <Link href=''>
                            <p className="font-medium hover:text-gray-600">
                                {product.name}
                            </p>
                        </Link>
                        {product.discount ?
                            <p>
                                <span className="text-gray-400 line-through me-2">
                                    {product.price.toFixed(2)} лв.
                                </span>
                                <span className="text-primary me-2">
                                    {(product.price - (product.price * product.discount/100)).toFixed(2)} лв.
                                </span>
                            </p>
                            :
                            <p className="text-primary">{product.price} лв.</p>
                        }
                        <Button 
                            variant="contained" 
                            sx={{ width: '100%' , display: 'block', marginX: 'auto', backgroundColor: 'var(--color-primary)' }}
                            className='addToCart-btn'
                        >
                            <ShoppingCartIcon />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
