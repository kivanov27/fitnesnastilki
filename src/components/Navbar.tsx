'use client'

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
    const { cart } = useCart();

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

                <div className='flex justify-between items-end gap-x-6'>
                    <SearchIcon />
                    <ProfileMenu />
                    <Link 
                        className='flex hover:text-primary'
                        href="/kolichka"
                    >
                        <ShoppingCartIcon />
                        <div>
                            {cart.length}
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
