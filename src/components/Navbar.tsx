'use client'

import SearchIcon from '@mui/icons-material/Search';
import PersonOutline from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='border border-b-gray-400'>
            <div className="flex justify-between items-center w-[75rem] mx-auto">

                <div className='border p-10 border-gray-900'>
                    logo
                </div>

                <div className='flex justify-between gap-x-14'>
                    <Link 
                        href="/" 
                        className='nav-btn relative cursor-pointer text-xl hover:text-primary duration-300'
                    >
                        Начало
                        <div className='nav-btn-underline' />
                    </Link>
                    <Link 
                        href="/katalog" 
                        className='nav-btn relative cursor-pointer text-xl hover:text-primary'
                    >
                        Каталог
                        <div className='nav-btn-underline' />
                    </Link>
                    <div 
                        className='nav-btn relative cursor-pointer text-xl hover:text-primary'
                    >
                        За Нас
                        <div className='nav-btn-underline' />
                    </div>
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
