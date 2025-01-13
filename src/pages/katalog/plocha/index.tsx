import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Products from "@/components/Products";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

import black_100x100x2cm from '../../../assets/plates/black-100x100x2cm.jpg';
import black_100x100x15mm from '../../../assets/plates/black-100x100x1,5cm.jpg';
import darkGray_100x100x2cm from '../../../assets/plates/darkGray-100x100x2cm.png';
import black_100x50x2cm from '../../../assets/plates/black-100x50x2cm.jpg';
import darkGray_100x50x2cm from '../../../assets/plates/darkGray-100x50x2cm.jpg';
import Footer from "@/components/Footer";

const PRODUCTS = [
    { url: black_100x100x2cm, name: 'Гумена Настилка - Плоча 100х100х2 см', price: 90.00, discount: 22, link: '' },
    { url: black_100x100x15mm, name: 'Гумена Настилка - Плоча 100х100х1.5 см', price: 85.00, discount: 19, link: '' },
    { url: darkGray_100x100x2cm, name: 'Гумена Настилка - Плоча 100х100х2 см, Тъмно Сив', price: 100.00, discount: 20, link: '' },
    { url: black_100x50x2cm, name: 'Гумена Настилка - Плоча 100х50х2 см', price: 45, discount: 22, link: '' },
    { url: darkGray_100x50x2cm, name: 'Гумена Настилка - Плоча 100х50х2 см', price: 45, discount: 0, link: '' },
];

const Plocha = () => {
    return (
        <div>
            <Navbar />
            <Breadcrumbs 
                aria-label="breadcrumbs" 
                className="w-[75rem] mx-auto"
                sx={{ marginX: 'auto', marginY: '2rem' }}
            >
                <Link href="/katalog" className="hover:underline">
                    Каталог
                </Link>
                <Typography sx={{ fontWeight: '600' }}>Настилки на плоча</Typography>
            </Breadcrumbs>

            <div className="flex justify-center w-[75rem] mx-auto">
                <Sidebar />
                <Products products={PRODUCTS} />
            </div>
            <Footer />
        </div>
    );
};

export default Plocha;
