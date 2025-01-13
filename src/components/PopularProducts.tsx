import Image, { StaticImageData } from "next/image";

interface PopularProductsProps {
    images: {
        url: StaticImageData,
        alt: string
    }[]
}

const PopularProducts = ({ images }: PopularProductsProps) => {
    return (
        <div className="pt-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase">Популярни продукти</h2>
            <div className="flex flex-wrap justify-between">
                {images.map(image => (
                    <div 
                        key={image.alt}
                        className="w-[24%]"
                    >
                        <Image 
                            src={image.url} 
                            alt={image.alt} 
                            className="min-h-[288px] mb-4 border border-gray-400 drop-shadow-md" 
                            draggable="false"
                            // width={250}
                            // height={250}
                        />
                        <h3 className="text-center mb-8">{image.alt}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
