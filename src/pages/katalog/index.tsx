import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Head from "next/head";

export async function getServerSideProps() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        );
        if (!res.ok) throw new Error("Failed to fetch categories.");
        const categories = await res.json();
        return { props: { categories } };
    } catch (error) {
        console.error(error);
        return { props: { categories: [] } };
    }
}

const Catalogue = ({ categories }: { categories: any[] }) => {
    return (
        <>
            <Head>
                <title>Каталог</title>
            </Head>
            <div>
                <Navbar />
                <Categories categories={categories} />
                <Footer />
            </div>
        </>
    );
};

export default Catalogue;
