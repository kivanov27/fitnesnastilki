import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <div className="mt-24 py-8 bg-gray-200">
            <div className='w-[1080px] mx-auto flex'>

                <div className="w-1/3 px-12">
                    <h3 className='text-center font-medium text-lg mb-4'>Информация</h3>
                    <ul className=''>
                        <li className='list-disc list-inside'>Общи условия</li>
                        <li className='list-disc list-inside'>Политика за поверителност</li>
                        <li className='list-disc list-inside'>Плащане и доставка</li>
                        <li className='list-disc list-inside'>Свържете се с нас</li>
                    </ul>
                </div>

                <div className="w-1/3 px-12">
                    <h3 className='text-center font-medium text-lg mb-4'>Продукти</h3>
                    <ul className=''>
                        <li className='list-disc list-inside'>Настилки на плоча</li>
                        <li className='list-disc list-inside'>Настилки на руло</li>
                        <li className='list-disc list-inside'>Настилки татами</li>
                        <li className='list-disc list-inside'>Настилки изкуствена трева</li>
                        <li className='list-disc list-inside'>Постелки за фитнес и йога</li>
                        <li className='list-disc list-inside'>Лепило за настилки</li>
                        <li className='list-disc list-inside'>Платформи и подиуми</li>
                    </ul>
                </div>

                <div className="w-1/3 px-12">
                    <h3 className='text-center font-medium text-lg mb-4'>Контакти</h3>
                    <div className='flex items-center gap-x-2'>
                        <EmailIcon />
                        <span>fitnesnastilki@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <PhoneIcon />
                        <span>0878150520</span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <StoreIcon />
                        <a href='' className='cursor-pointer'>olx: фитнес настилки</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
