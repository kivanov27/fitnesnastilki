import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <div className="mt-24 py-8 bg-gray-600 text-white">
            <div className='w-[75rem] mx-auto flex'>

                <div className="w-1/3">
                    <h3 className='font-medium text-lg mb-4 underline underline-offset-8'>Информация</h3>
                    <ul className=''>
                        <li className='footer-li'>Общи условия</li>
                        <li className='footer-li'>Политика за поверителност</li>
                        <li className='footer-li'>Плащане и доставка</li>
                        <li className='footer-li'>Свържете се с нас</li>
                    </ul>
                </div>

                <div className="w-1/3">
                    <h3 className='font-medium text-lg mb-4 underline underline-offset-8'>Продукти</h3>
                    <ul className=''>
                        <li className='footer-li'>Настилки на плоча</li>
                        <li className='footer-li'>Настилки на руло</li>
                        <li className='footer-li'>Настилки татами</li>
                        <li className='footer-li'>Настилки изкуствена трева</li>
                        <li className='footer-li'>Постелки за фитнес и йога</li>
                        <li className='footer-li'>Лепило за настилки</li>
                        <li className='footer-li'>Платформи и подиуми</li>
                    </ul>
                </div>

                <div className="w-1/3">
                    <h3 className='font-medium text-lg mb-4 underline underline-offset-8'>Контакти</h3>
                    <div className='flex items-center gap-x-4 mb-2'>
                        <EmailIcon />
                        <span>fitnesnastilki@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-x-4 mb-2'>
                        <PhoneIcon />
                        <span>0878150520</span>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        <StoreIcon />
                        <a href='' className='cursor-pointer'>olx: фитнес настилки</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
