import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface PopularCategoriesProps {
    images: {
        url: StaticImageData,
        alt: string,
        link: string
    }[]
}

const PopularCategories = ({ images }: PopularCategoriesProps) => {
    return (
        <div className="pt-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase">Популярни категории</h2>
            <div className="flex flex-wrap justify-between">
                {images.map(image => (
                    <div key={image.alt}>
                        <Link href={`/katalog/${image.link}`} draggable="false">
                            <Image 
                                src={image.url} 
                                alt={image.alt} 
                                draggable="false"
                                className="w-[35rem] h-[35rem] mb-4 border border-gray-400 drop-shadow-md" 
                            />
                        </Link>
                        <h3 className="text-center uppercase mb-12">{image.alt}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
