import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";
import slider_plate from '../assets/slider-plate.jpg'
import slider_roll from '../assets/slider-roll.jpeg'
import slider_turf from '../assets/slider-turf.jpg'
import slider_mat from '../assets/slider-mat.jpg'
import popular_plate from '../assets/popular-plate.jpg'
import popular_roll from '../assets/popular-roll.jpg'
import popular_turf from '../assets/popular-turf.jpg'
import popular_tatami from '../assets/popular-tatami.jpg'

const SLIDER_IMAGES = [
    { url: slider_plate, alt: 'Настилка на плоча' },
    { url: slider_roll, alt: 'Настилка на руло' },
    { url: slider_turf, alt: 'Настилка изкуствена трева' },
    { url: slider_mat, alt: 'Постелки за фитнес и йога' }
];

const POPULAR_IMAGES = [
    { url: popular_plate, alt: 'Настилка на плоча' },
    { url: popular_roll, alt: 'Настилка на руло' },
    { url: popular_turf, alt: 'Настилка изкуствена трева' },
    { url: popular_tatami, alt: 'Настилка татами' }
];

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full aspect-[10/3] my-0 mx-auto">
                <Slider images={SLIDER_IMAGES} />
            </div>
            <PopularProducts images={POPULAR_IMAGES} />
            <Footer />
        </div>
    );
};

export default Home;
