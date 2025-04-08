"use client"

import Link from 'next/link';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Footer = () => {
    const copyText = (target: EventTarget | null) => {
        if (target instanceof HTMLElement) {
            const text = target.textContent;
            if (text) {
                navigator.clipboard.writeText(text);
            }

            if (text == 'fitnesnastilki@gmail.com') {
                const element = document.querySelector('.email-copy');
                if (element) {
                    element.setAttribute('style', 'opacity: 0.9');
                    setTimeout(() => {
                        element.setAttribute('style', 'opacity: 0');
                    }, 1500);
                }
            }
            else {
                const element = document.querySelector('.tel-copy');
                if (element) {
                    element.setAttribute('style', 'opacity: 0.9');
                    setTimeout(() => {
                        element.setAttribute('style', 'opacity: 0');
                    }, 1500);
                }
            }
        }
    };

    return (
        <div className="py-8 bg-primary text-white">
            <div className='w-fit xl:w-[75rem] mx-auto flex flex-col xl:flex-row'>

                <div className="xl:w-1/3 mb-6 xl:mb-0 px-6 xl:px-0">
                    <h3 className='font-bold text-lg text-start uppercase mb-2 xl:mb-4 '>Информация</h3>
                    <ul className='flex flex-col items-start'>
                        <li className='footer-li'>Общи условия</li>
                        <li className='footer-li'>Политика за поверителност</li>
                        <li className='footer-li'>Плащане и доставка</li>
                        <li className='footer-li'>Свържете се с нас</li>
                    </ul>
                </div>

                <div className="xl:w-1/3 mb-6 xl:mb-0 px-6 xl:px-0">
                    <h3 className='font-bold text-lg text-start uppercase mb-2 xl:mb-4'>Продукти</h3>
                    <ul className='flex flex-col items-start'>
                        <li className='footer-li'>
                            <Link href='/katalog/plocha' className='hover:text-gray-300'>
                                Настилки на плоча
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href='/katalog/rulo' className='hover:text-gray-300'>
                                Настилки на руло
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href='/katalog/tatami' className='hover:text-gray-300'>
                                Настилки татами
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href='/katalog/izkustvena-treva' className='hover:text-gray-300'>
                                Настилки изкуствена трева
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href="/katalog/postelki" className='hover:text-gray-300'>
                                Постелки за фитнес и йога
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href='/katalog/lepilo' className='hover:text-gray-300'>
                                Лепило за настилки
                            </Link>
                        </li>
                        <li className='footer-li'>
                            <Link href='/katalog/platformi-podiumi' className='hover:text-gray-300'>
                                Платформи и подиуми
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="xl:w-1/3 px-6 xl:px-0">
                    <h3 className='font-bold text-lg text-start uppercase mb-2 xl:mb-4'>Контакти</h3>
                    <div className='relative flex items-center justify-start gap-x-4 mb-2'>
                        <EmailIcon />
                        <span 
                            className='cursor-pointer hover:text-gray-300' 
                            onClick={({ target }) => copyText(target)}
                        >
                            fitnesnastilki@gmail.com
                        </span>
                        <span 
                            className='email-copy absolute bottom-8 bg-gray-950 p-2 rounded-lg opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none'
                        >
                            <ContentCopyIcon />
                            Копирано
                        </span>
                    </div>
                    <div className='relative flex items-center justify-start gap-x-4 mb-2'>
                        <PhoneIcon />
                        <span 
                            className='cursor-pointer hover:text-gray-300' 
                            onClick={({ target }) => copyText(target)}
                        >
                            0878150520
                        </span>
                        <span className='tel-copy absolute bottom-8 bg-gray-950 p-2 rounded-lg opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none'>
                            <ContentCopyIcon />
                            Копирано
                        </span>
                    </div>
                    <div className='flex items-center justify-start gap-x-4'>
                        <StoreIcon />
                        <Link href='' className='hover:text-gray-300'>olx: фитнес настилки</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
