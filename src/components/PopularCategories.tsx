import Image from "next/image";
import Link from "next/link";

interface PopularCategoriesProps {
    categories: {
        name: string,
        image: string,
        link: string
    }[]
}

const PopularCategories = ({ categories }: PopularCategoriesProps) => {
    return (
        <div className="pt-6 lg:pt-24 w-full xl:w-[75rem] mx-auto">
            <h2 className="mb-6 lg:mb-12 text-xl lg:text-4xl text-center uppercase text-primary">Популярни категории</h2>
            <div className="flex flex-wrap justify-center xl:justify-between gap-x-4 md:gap-x-6 lg:gap-x-10 xl:gap-x-0">
                {categories.map(category => (
                    <div key={category.link} className="w-[45%]">
                        <Link 
                            href={`/katalog/${category.link}`} 
                            draggable="false"
                            className="block"
                        >
                            <div 
                                className="relative w-full aspect-square mb-4 border border-gray-400 drop-shadow-md overflow-hidden"
                            >
                                <Image 
                                    src={category.image} 
                                    alt={category.name} 
                                    fill
                                    sizes="45vw"
                                    quality={75}
                                    draggable="false"
                                    className="object-cover hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        </Link>
                        <h3 
                            className="text-center uppercase mb-8 lg:mb-12 text-sm md:text-base lg:text-xl"
                        >
                            {category.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
