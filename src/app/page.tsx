import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import PopularCategories from "@/components/PopularCategories";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";

const getSliderData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/slider`);
    if (!res.ok) throw new Error("Failed to fetch slider data");
    return res.json();
}

const getPopularCategories = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/categories/popular`);
    if (!res.ok) throw new Error("Failed to fetch popular categories");
    return res.json();
}

const getPopularProducts = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/products/popular`);
    if (!res.ok) throw new Error("Failed to fetch popular products");
    return res.json();
}

const Home = async () => {
    const sliderData = await getSliderData();
    const popularCategories = await getPopularCategories();
    const popularProducts = await getPopularProducts();

    return (
        <div>
            <Navbar />
            <div className="w-full aspect-[10/3] my-0 mx-auto">
                <Slider slides={sliderData} />
            </div>
            <PopularCategories categories={popularCategories} />
            <PopularProducts products={popularProducts} />
            <Footer />
        </div>
    );
};

export default Home;
