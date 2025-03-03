import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product as ProductType } from "@/types";

interface ProductProps {
    product: ProductType;
}

const Product = ({ product }: ProductProps) => {
    return (
        <div 
            key={product.name}
            className="w-[14.375rem] ps-2 relative"
        >
            <div className="relative border border-gray-400 p-4 flex flex-col gap-y-2 hover:scale-105 transition duration-300 ease-in-out">
                {product.discount !== 0 &&
                    <div className='absolute top-0 left-0 bg-primary px-1 text-white'>
                        -{product.discount}%
                    </div>
                }
                <Link href={`/katalog/plocha/${product.link}`} className='border border-gray-100'>
                    <Image
                        src={product.image1}
                        alt={product.name}
                        width={500}
                        height={500}
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
    );
};

export default Product;
