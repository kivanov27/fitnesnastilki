'use client'

import SearchIcon from '@mui/icons-material/Search';
import PersonOutline from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='border border-b-gray-400'>
            <div className="flex justify-between items-center w-[1080px] mx-auto">

                <div className='border p-10'>
                    logo
                </div>

                <div className='flex justify-between gap-x-14'>
                    <Link href="/" className='cursor-pointer'>Начало</Link>
                    <Link href="/katalog" className='cursor-pointer'>Каталог</Link>
                    <div>За Нас</div>
                </div>

                <div className='flex justify-between gap-x-6'>
                    <SearchIcon />
                    <PersonOutline />
                    <div className='flex'>
                        <ShoppingCartIcon />
                        <div>0</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
