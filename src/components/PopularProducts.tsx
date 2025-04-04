import Image from "next/image";

interface PopularProductsProps {
    products: {
        id: number;
        name: string;
        image1: string;
    }[]
}

const PopularProducts = ({ products }: PopularProductsProps) => {
    return (
        <div className="my-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase text-primary">Популярни продукти</h2>
            <div className="flex flex-wrap justify-between">
                {products.map(product => (
                    <div 
                        key={product.id}
                        className="w-[24%]"
                    >
                        <Image 
                            src={product.image1} 
                            alt={product.name} 
                            className="min-h-[288px] mb-4 border border-gray-400 drop-shadow-md" 
                            draggable="false"
                            width={288}
                            height={288}
                        />
                        <h3 className="text-center mb-8">{product.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
