import Image, { StaticImageData } from "next/image";

interface PopularProductsProps {
    images: {
        url: StaticImageData,
        alt: string
    }[]
}

const PopularProducts = ({ images }: PopularProductsProps) => {
    return (
        <div className="pt-24 px-[420px]">
            <h2 className="mb-12 text-4xl text-center uppercase">Популярни продукти</h2>
            <div className="flex flex-wrap justify-between">
                {images.map(image => (
                    <div key={image.alt}>
                        <Image src={image.url} alt={image.alt} className="w-[500px] h-[500px] mb-4 border drop-shadow-md" />
                        <h3 className="text-center uppercase mb-8">{image.alt}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProducts;
