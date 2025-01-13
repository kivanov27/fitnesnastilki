import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CategoriesProps {
    images: {
        url: StaticImageData,
        alt: string,
        link: string
    }[]
}

const Categories = ({ images }: CategoriesProps) => {
    return (
        <div className="pt-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase">Kатегории</h2>
            <div className="flex flex-wrap justify-between">
                {images.map(image => (
                    <div key={image.alt}>
                        <Link 
                            href={`/katalog/${image.link}`}
                            className="cursor-pointer"
                            draggable="false"
                        >
                            <Image 
                                src={image.url} 
                                alt={image.alt} 
                                className="w-[35rem] h-[35rem] mb-4 border drop-shadow-md" 
                                draggable="false"
                            />
                        </Link>
                        <h3 className="text-center mb-8">
                            {image.alt}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
