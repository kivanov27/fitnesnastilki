import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import img_plocha from '../assets/slider-plocha.jpg'
import img_rulo from '../assets/slider-rulo.jpeg'
import img_turf from '../assets/slider-turf.jpg'
import img_mat from '../assets/slider-mat.png'

const IMAGES = [
    { url: img_plocha, alt: 'Настилка на плоча' },
    { url: img_rulo, alt: 'Настилка на руло' },
    { url: img_turf, alt: 'Настилка изкуствена трева' },
    { url: img_mat, alt: 'Постелки за фитнес и йога' },
]

const Home = () => {
    return (
        <div>
            <Navbar />
            <Slider images={IMAGES} />
        </div>
    );
}

export default Home;
