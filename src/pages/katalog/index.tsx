import '../../app/globals.css'
import Navbar from "@/components/Navbar";
import Categories from '@/components/Categories';

import plate from '../../assets/categories/plate.jpg';
import roll from '../../assets/categories/roll.jpg';
import tatami from '../../assets/categories/tatami.jpg';
import grass from '../../assets/categories/turf.jpg';
import mat from '../../assets/categories/mat.jpg';
import platform from '../../assets/categories/platform.jpg';

const CATEGORY_IMAGES = [
    { url: plate, alt: 'Настилки на плоча', link: 'plocha' },
    { url: roll, alt: 'Настилки на руло', link: 'rulo' },
    { url: tatami, alt: 'Настилки татами', link: 'tatami' },
    { url: grass, alt: 'Настилки изкуствена трева', link: 'izkustvena-treva' },
    { url: mat, alt: 'Постелки за фитнес и йога', link: 'postelki' },
    { url: platform, alt: 'Платформи и подиуми', link: 'platformi-podiumi' },
    // { url: glue, alt: 'Лепило за настилки', link: 'lepilo' },
];

const Catalogue = () => {
    return (
        <div>
            <Navbar />
            <Categories images={CATEGORY_IMAGES} />
        </div>
    );
};

export default Catalogue;
