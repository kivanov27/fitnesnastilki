import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import PopularCategories from "@/components/PopularCategories";
import Footer from "@/components/Footer";
import slider_plate from '../assets/slider-plate.jpg'
import slider_roll from '../assets/slider-roll.jpeg'
import slider_turf from '../assets/slider-turf.jpg'
import slider_mat from '../assets/slider-mat.jpg'
import categories_plate from '../assets/categories-plate.jpg'
import categories_roll from '../assets/categories-roll.jpg'
import categories_turf from '../assets/categories-turf.jpg'
import categories_tatami from '../assets/categories-tatami.jpg'

const SLIDER_IMAGES = [
    { url: slider_plate, alt: 'Настилка на плоча' },
    { url: slider_roll, alt: 'Настилка на руло' },
    { url: slider_turf, alt: 'Настилка изкуствена трева' },
    { url: slider_mat, alt: 'Постелки за фитнес и йога' }
];

const POPULAR_IMAGES = [
    { url: categories_plate, alt: 'Настилка на плоча' },
    { url: categories_roll, alt: 'Настилка на руло' },
    { url: categories_turf, alt: 'Настилка изкуствена трева' },
    { url: categories_tatami, alt: 'Настилка татами' }
];

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full aspect-[10/3] my-0 mx-auto">
                <Slider images={SLIDER_IMAGES} />
            </div>
            <PopularCategories images={POPULAR_IMAGES} />
            <Footer />
        </div>
    );
};

export default Home;
