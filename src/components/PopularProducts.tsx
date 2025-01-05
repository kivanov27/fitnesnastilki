import Image, { StaticImageData } from "next/image";

interface PopularProductsProps {
    images: {
        url: StaticImageData,
        alt: string
    }[]
}

const PopularProducts = ({ images }: PopularProductsProps) => {
    return (
        <div className="pt-24 w-[1080px] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase">Популярни продукти</h2>
            <div className="flex flex-wrap">
                {images.map(image => (
                    <div 
                        key={image.alt}
                        className="w-1/4 px-[10px]"
                    >
                        <Image 
                            src={image.url} 
                            alt={image.alt} 
                            className="min-h-[250px] mb-4 border drop-shadow-md" 
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
