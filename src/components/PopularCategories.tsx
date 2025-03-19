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
        <div className="pt-24 w-[75rem] mx-auto">
            <h2 className="mb-12 text-4xl text-center uppercase text-primary">Популярни категории</h2>
            <div className="flex flex-wrap justify-between">
                {categories.map(category => (
                    <div key={category.link}>
                        <Link href={`/katalog/${category.link}`} draggable="false">
                            <Image 
                                src={category.image} 
                                alt={category.name} 
                                width={500}
                                height={500}
                                draggable="false"
                                className="w-[35rem] h-[35rem] mb-4 border border-gray-400 drop-shadow-md" 
                            />
                        </Link>
                        <h3 className="text-center uppercase mb-12">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
