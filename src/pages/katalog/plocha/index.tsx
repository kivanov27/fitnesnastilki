import Navbar from "@/components/Navbar";
import { StaticImageData } from "next/image";

interface PlochaProps {
    products: {
        url: StaticImageData,
        alt: string,
    }[];
}

const Plocha = ({ products }: PlochaProps) => {
    console.log(products);

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default Plocha;
