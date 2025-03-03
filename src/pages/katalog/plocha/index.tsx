import '../../../app/globals.css';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Products from "@/components/Products";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import black_100x100x2cm from '../../../assets/plates/black-100x100x2cm/1.jpg';
import black_100x100x15mm from '../../../assets/plates/black-100x100x1,5cm/1.jpg';
import darkGray_100x100x2cm from '../../../assets/plates/darkGray-100x100x2cm/1.png';
import black_100x50x2cm from '../../../assets/plates/black-100x50x2cm/1.jpg';
import darkGray_100x50x2cm from '../../../assets/plates/darkGray-100x50x2cm/1.jpg';
import Footer from "@/components/Footer";
import { Product } from '@/types';

// remove if not using
import { useEffect, useState } from 'react';

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

const PRODUCTS = [
    { url: black_100x100x2cm, name: 'Гумена Настилка - Плоча 100х100х2 см', price: 90.00, discount: 22, link: 'gumena-plocha-100x100x2cm' },
    { url: black_100x100x15mm, name: 'Гумена Настилка - Плоча 100х100х1.5 см', price: 85.00, discount: 19, link: 'gumena-plocha-100x100x1,5cm' },
    { url: darkGray_100x100x2cm, name: 'Гумена Настилка - Плоча 100х100х2 см, Тъмно Сив', price: 100.00, discount: 20, link: 'gumena-plocha-100x100x2cm-siv' },
    { url: black_100x50x2cm, name: 'Гумена Настилка - Плоча 100х50х2 см', price: 45, discount: 22, link: 'gumena-plocha-100x50x2cm' },
    { url: darkGray_100x50x2cm, name: 'Гумена Настилка - Плоча 100х50х2 см, Тъмно Сив', price: 45, discount: 0, link: 'gumena-plocha-100x50x2cm-siv' },
];

const Plocha = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products', { method: 'GET' })
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    return (
        <div className={`${montserrat.className}`}>
            <Navbar />
            <Breadcrumbs 
                aria-label="breadcrumbs" 
                className="w-[75rem] mx-auto"
                sx={{ marginX: 'auto', marginY: '2rem' }}
            >
                <Link href="/katalog" className="hover:underline hover:text-primary">
                    Каталог
                </Link>
                <Typography sx={{ fontWeight: '600' }}>Настилки на плоча</Typography>
            </Breadcrumbs>

            <div className="flex justify-center w-[75rem] mx-auto">
                <Sidebar />
                <Products products={products} />
            </div>
            <Footer />
        </div>
    );
};

export default Plocha;
