import Navbar from "@/components/Navbar";
import Slider from "@/components/Slider";
import PopularCategories from "@/components/PopularCategories";
import PopularProducts from "@/components/PopularProducts";
import Footer from "@/components/Footer";

import slider_plate from '../assets/slider/plate.jpg';
import slider_roll from '../assets/slider/roll.jpeg';
import slider_turf from '../assets/slider/turf.jpg';
import slider_mat from '../assets/slider/mat.jpg';
import categories_plate from '../assets/categories/plate.jpg';
import categories_roll from '../assets/categories/roll.jpg';
import categories_turf from '../assets/categories/turf.jpg';
import categories_tatami from '../assets/categories/tatami.jpg';

import plate_black_100x100x2cm from '../assets/plates/black-100x100x2cm.jpg';
import plate_darkGray_100x100x2cm from '../assets/plates/darkGray-100x100x2cm.png';
import roll_epdmBlue_6mm from '../assets/rolls/epdm-blue-6mm.jpg';
import roll_epdmYellow_6mm from '../assets/rolls/epdm-yellow-6mm.jpg';
import roll_sbrm_10mm from '../assets/rolls/sbr-10mm.jpg';
import grass_plate_50x50x2cm from '../assets/grass/grass-50x50x2cm.jpg';
import grass_plate_98x98x2cm from '../assets/grass/grass-98x98x2cm.jpg';
import grassGreen_plate_98x98x2cm from '../assets/grass/grassGreen-98x98x2cm.jpg';
import tatami_100x100x25mm from '../assets/tatami/tatami-100x100x2,5cm.jpg';
import tatami_wood_100x100x25mm from '../assets/tatami/tatami-wood-100x100x2,5cm.jpg';
import mat_aerobics_15mm from '../assets/mats/aerobics-15mm.jpg';
import mat_yoga_purple_6mm from '../assets/mats/yoga-purple-6mm.jpg';

const SLIDER_IMAGES = [
    { url: slider_plate, alt: 'Настилка на плоча' },
    { url: slider_roll, alt: 'Настилка на руло' },
    { url: slider_turf, alt: 'Настилка изкуствена трева' },
    { url: slider_mat, alt: 'Постелки за фитнес и йога' }
];

const CATEGORIES_IMAGES = [
    { url: categories_plate, alt: 'Настилка на плоча' },
    { url: categories_roll, alt: 'Настилка на руло' },
    { url: categories_turf, alt: 'Настилка изкуствена трева' },
    { url: categories_tatami, alt: 'Настилка татами' }
];

const POPULAR_PRODUCTS = [
    { url: plate_black_100x100x2cm, alt: 'Гумена Настилка - Плоча 100х100х2 см' },
    { url: plate_darkGray_100x100x2cm, alt: 'Гумена Настилка - Плоча 100х100х2 см, Тъмно Сив' },
    { url: roll_epdmBlue_6mm, alt: 'Гумена настилка EPDM ролка 12 кв.м. | 6 мм, Синя' },
    { url: roll_epdmYellow_6mm, alt: 'Гумена настилка EPDM ролка 12 кв.м. | 6 мм, Жълта' },
    { url: roll_sbrm_10mm, alt: 'Гумена настилка SBR ролка 12 кв.м. | 10 мм' },
    { url: grass_plate_50x50x2cm, alt: 'Гумени Плочи / Изкуствена Трева - 50х50х2 см' },
    { url: grass_plate_98x98x2cm, alt: 'Гумени Плочи / Изкуствена Трева - 98х98х2 см' },
    { url: grassGreen_plate_98x98x2cm, alt: 'Изкуствена Трева Green - Плоча 98 х 98 см, 20 мм' },
    { url: tatami_100x100x25mm, alt: 'Татами Настилка - 100х100х2.5 см' },
    { url: tatami_wood_100x100x25mm, alt: 'Татами Настилка - 100х100х2.5 см, Дървен Профил' },
    { url: mat_aerobics_15mm, alt: 'Постелка за Аеробика 15 мм' },
    { url: mat_yoga_purple_6mm, alt: 'Постелка за Йога 0,6 см - Лилав' }
];

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full aspect-[10/3] my-0 mx-auto">
                <Slider images={SLIDER_IMAGES} />
            </div>
            <PopularCategories images={CATEGORIES_IMAGES} />
            <PopularProducts images={POPULAR_PRODUCTS} />
            <Footer />
        </div>
    );
};

export default Home;
