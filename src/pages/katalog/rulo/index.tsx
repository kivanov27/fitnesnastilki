import '../../../app/globals.css';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Products from "@/components/Products";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import { Product } from '@/types';

import { useEffect, useState } from 'react';

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
});

const Rulo = () => {
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
                <Typography sx={{ fontWeight: '600' }}>Настилки на руло</Typography>
            </Breadcrumbs>

            <div className="flex justify-center w-[75rem] mx-auto">
                <Sidebar />
                <Products products={products} />
            </div>
            <Footer />
        </div>
    );
};

export default Rulo;
