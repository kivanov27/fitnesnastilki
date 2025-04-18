import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import PopularCategories from "../components/PopularCategories";
import PopularProducts from "../components/PopularProducts";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Head from "next/head";

const Home = () => {
    const [sliderData, setSliderData] = useState(null);
    const [popularCategories, setPopularCategories] = useState(null);
    const [popularProducts, setPopularProducts] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const [sliderRes, categoriesRes, productsRes] = await Promise.all([
                fetch("/api/slider"),
                fetch("/api/categories/popular"),
                fetch("/api/products/popular"),
            ]);

            if (!sliderRes.ok || !categoriesRes.ok || !productsRes.ok) {
                throw new Error("One or more requests failed");
            }

            const [sliderData, categoriesData, productsData] =
                await Promise.all([
                    sliderRes.json(),
                    categoriesRes.json(),
                    productsRes.json(),
                ]);

            setSliderData(sliderData);
            setPopularCategories(categoriesData);
            setPopularProducts(productsData);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading || !sliderData || !popularCategories || !popularProducts) {
        return <div className="text-center mt-20">Зареждане...</div>;
    }

    return (
        <>
            <Head>
                <title>Фитнес Настилки</title>
            </Head>
            <div className="max-w-full">
                <Navbar />
                <div className="w-full aspect-[10/7] sm:aspect-[10/4] lg:aspect-[10/3] my-0 mx-auto">
                    <Slider slides={sliderData} />
                </div>
                <PopularCategories categories={popularCategories} />
                <PopularProducts products={popularProducts} />
                <Footer />
            </div>
        </>
    );
};

export default Home;
