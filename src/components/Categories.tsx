import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ categories }: { categories: Category[] }) => {
    return (
        <div className="my-6 lg:my-16 xl:my-24 w-full xl:w-[75rem] mx-auto px-6 sm:px-12 lg:px-20 xl:px-0">
            <h2 className="mb-6 lg:mb-12 text-xl lg:text-4xl text-center text-primary uppercase">Kатегории</h2>
            <div className="flex flex-wrap justify-between">
                {categories.map(category => (
                    <div 
                        key={category.link}
                        className="w-full md:w-[45%]"
                    >
                        <Link 
                            href={`/katalog/${category.link}`}
                            draggable="false"
                            className="block"
                        >
                            <div className="relative w-full aspect-square mb-4 border border-gray-400 drop-shadow-md overflow-hidden">
                                <Image 
                                    src={category.image} 
                                    alt={category.name} 
                                    fill
                                    sizes="(max-width: 767px) 100vw, 45vw"
                                    quality={75}
                                    draggable="false"
                                    className="object-cover hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        </Link>
                        <h3 className="text-center text-xl mb-8">
                            {category.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
