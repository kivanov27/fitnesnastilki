import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ categories }: { categories: Category[] }) => {
    return (
        <div className="my-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-xl lg:text-4xl text-center text-primary uppercase">Kатегории</h2>
            <div className="flex flex-wrap justify-between">
                {categories.map(category => (
                    <div key={category.link}>
                        <Link 
                            href={`/katalog/${category.link}`}
                            className="cursor-pointer"
                            draggable="false"
                        >
                            <Image 
                                src={category.image} 
                                alt={category.name} 
                                className="w-[35rem] h-[35rem] mb-4 border drop-shadow-md" 
                                draggable="false"
                                width={560}
                                height={560}
                            />
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
