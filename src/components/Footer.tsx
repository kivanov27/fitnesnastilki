import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <div className="flex mt-24 px-[420px] py-12 bg-gray-200">
            <div className="w-1/4 px-4">
                <div className="border border-black text-center">
                    logo
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate.
                </p>
            </div>

            <div className="w-1/4 px-4">
                <h3 className='text-center font-medium text-lg'>Контакти</h3>
                <div className='flex items-center gap-x-2'>
                    <StoreIcon />
                    <a href='' className='cursor-pointer'>olx: фитнес настилки</a>
                </div>
                <div className='flex items-center gap-x-2'>
                    <PhoneIcon />
                    <span>0878150520</span>
                </div>
                <div className='flex items-center gap-x-2'>
                    <EmailIcon />
                    <span>fitnesnastilki@gmail.com</span>
                </div>
            </div>

            <div className="w-1/4 px-4">
                <h3 className='text-center font-medium text-lg'>Полезни връзки</h3>
            </div>

            <div className="w-1/4 px-4">
            </div>
        </div>
    );
};

export default Footer;
