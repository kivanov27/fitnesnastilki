import { GetServerSideProps } from "next";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

interface ProductProps {
    url: StaticImageData,
    name: string,
    price: number,
    discount: number,
    link: string
}

const ProductPage = ({ url, name, price, discount, link }: ProductProps) => {
    const router = useRouter()

    return (
        <div>
            {router.query.slug}
            <Image src={url} alt={name} />
            <p>{name} {price} {discount} {link}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params as { slug: string };
    console.log(slug);

    // fetch product data from API or database based on slug
    const product = {
        name: 'Dynamic Product',
        price: 99.99,
        url: 'blabla'
    };

    return {
        props: product,
    };
};

export default ProductPage;
