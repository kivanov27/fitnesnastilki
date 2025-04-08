'use client'

import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Category } from '@/types';

const Navbar = () => {
    const { cart } = useCart();
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [expandedCategories, setExpandedCategories] = useState({
        catalogue: false
    });
    const categoriesRef = useRef<HTMLDivElement>(null);
    const [categoriesHeight, setCategoriesHeight] = useState<number>(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            }
            catch (error) {
                console.error("Error fetching categories: ", error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchCategories();

        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsMobileView(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (categoriesRef.current && expandedCategories.catalogue) {
            setCategoriesHeight(categoriesRef.current.scrollHeight);
        } 
        else {
            setCategoriesHeight(0);
        }
    }, [expandedCategories.catalogue, categories]);

    const toggleCategory = (category: keyof typeof expandedCategories) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className='border border-b-gray-400'>
            <div className="flex justify-between items-centerw w-full xl:w-[75rem] mx-auto lg:px-20 xl:px-0">
                {/* Logo */}
                {!isMobileView &&
                    <div className='border p-10 border-gray-900'>
                        logo
                    </div>
                }

                {/* Nav links */}
                {!isMobileView &&
                    <div className='flex justify-between items-center gap-x-14'>
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
                }

                {/* Mobile menu button */}
                {isMobileView &&
                    <div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='p-3'
                        >
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                }

                {/* Buttons */}
                <div className='flex justify-between items-center p-3 lg:p-0 gap-x-4 lg:gap-x-6'>
                    <SearchIcon />
                    <ProfileMenu />
                    <Link
                        className='flex hover:text-primary'
                        href="/kolichka"
                    >
                        <ShoppingCartIcon />
                        <div>{cart.length}</div>
                    </Link>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {isMobileView && isMobileMenuOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40'
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile menu */}
            {isMobileView &&
                <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg
                                transform transition-transform duration-300 ease-in-out
                                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className='p-4 flex flex-col h-full'>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='flex justify-start active:text-primary mb-4'
                        >
                            <CloseIcon />
                        </button>

                        <nav className='flex-1 flex flex-col gap-6 overflow-y-auto'>
                            <Link 
                                href="/"
                                className="py-3 text-xl active:text-primary border-b border-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Начало
                            </Link>

                            <div className='border-b border-gray-100 flex flex-col'>
                                <div className='flex items-center justify-between py-3'>
                                    <Link 
                                        href="/katalog" 
                                        className='text-xl active:text-primary'
                                    >
                                        Каталог
                                    </Link>
                                    <button
                                        onClick={() => toggleCategory("catalogue")}
                                        className="p-1 transform transition-transform duration-300"
                                        style={{
                                            transform: expandedCategories.catalogue ? 'rotate(90deg)' : 'rotate(0deg)'
                                        }}
                                        aria-expanded={expandedCategories.catalogue}
                                        aria-label='Toggle categories'
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                </div>
                                <div
                                    ref={categoriesRef}
                                    className='overflow-hidden transition-all duration-300 ease-in-out' 
                                    style={{
                                        maxHeight: expandedCategories.catalogue ? `${categoriesHeight}px` : "0px"
                                    }}
                                >
                                    <div className='ml-4 pl-2'>
                                        {!isLoading && categories.map(category => (
                                            <Link
                                                key={category.id}
                                                href={`/katalog/${category.link}`}
                                                className="block py-2 text-base active:text-primary"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {'•'} {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div> 

                            <div className='py-3 text-xl active:text-primary border-b border-gray-100'>
                                За Нас
                            </div>
                        </nav>
                    </div>
                </div>
            }
        </div>
    );
};

export default Navbar;
