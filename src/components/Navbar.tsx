import SearchIcon from '@mui/icons-material/Search';
import PersonOutline from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    return (
        <div className="flex justify-around py-10">
            <div className='border'>
                logo
            </div>
            <ul className='flex justify-between gap-x-14'>
                <li>тел.</li>
                <li>Колекции</li>
                <li>За Нас</li>
            </ul>
            <div className='flex justify-between gap-x-6'>
                <SearchIcon />
                <PersonOutline />
                <div className='flex'>
                    <ShoppingCartIcon />
                    <div>
                        0
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
