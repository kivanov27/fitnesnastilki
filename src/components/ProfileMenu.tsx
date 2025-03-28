import { useState, useEffect } from 'react';
import { useCompatibleRouter } from '@/lib/router-utils';
import { PersonOutline } from '@mui/icons-material';
import Link from 'next/link';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useCompatibleRouter();

    // check auth status
    useEffect(() => {
        const token = localStorage.getItem('fitnesnastilki_token');
        setIsLoggedIn(!!token);
    }, []);

    // Handle outside click
    // useEffect(() => {
    //     const handleClickOutside = (e: MouseEvent) => {
    //         const target = e.target as HTMLElement;
    //         if (!target.closest('.profile-menu-container')) {
    //             setIsOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const handleLogout = () => {
        localStorage.removeItem('fitnesnastilki_token');
        setIsLoggedIn(false);
        setIsOpen(false);
        router.push('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative profile-menu-container'>
            <button
                onClick={toggleMenu}
                aria-label='User menu'
            >
                <PersonOutline className='hover:text-primary cursor-pointer transition-colors duration-300' />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200'>
                    {isLoggedIn ? (
                        <div>
                            {/* <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Профил
                            </Link> */}
                            <button
                                onClick={handleLogout}
                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                                Изход
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                href="/login"
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                onClick={() => setIsOpen(false)}
                            >
                                Вход
                            </Link>
                            <Link
                                href="/registration"
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                onClick={() => setIsOpen(false)}
                            >
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
