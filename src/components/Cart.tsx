import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

    return (
        <div className="w-[75rem] h-full mx-auto my-10 flex-1">
            {cart.length === 0 ? (
                <div className="w-full h-full flex flex-col gap-y-14 justify-center items-center mt-40">
                    <h1 className="text-6xl text-center">Вашата количка е празна</h1>
                    <button className="uppercase p-4 bg-primary text-white hover:bg-primaryDim rounded-md font-medium w-fit">Към магазина</button>
                </div>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-300">
                            <th />
                            <th />
                            <th className="text-2xl text-semibold pe-10 pb-5">Продукт</th>
                            <th className="text-2xl text-semibold pe-10 pb-5">Цена</th>
                            <th className="text-2xl text-semibold pe-10 pb-5">Количество</th>
                            <th className="text-2xl text-semibold pb-5">Общо</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product => (
                            <tr key={product.id} className="border-b border-gray-300">
                                <td 
                                    className="pe-10"
                                >
                                    <CloseIcon 
                                        className="cursor-pointer hover:text-primary transition-colors duration-300" 
                                        onClick={() => removeFromCart(product.id)}
                                    />
                                </td>
                                <td className="pe-10">
                                    <Image 
                                        src={product.image} 
                                        alt={product.name} 
                                        width={100} 
                                        height={100} 
                                        className="w-24 h-24 my-2"
                                    />
                                </td>
                                <td className="pe-10 text-center">{product.name}</td>
                                <td className="pe-10 text-center">{product.price}лв.</td>
                                <td className="h-24 pe-10 flex justify-center items-center">
                                    <div
                                        className="border border-gray-300 p-2 cursor-pointer transition-colors
                                        hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                                        onClick={() => decreaseQuantity(product.id)}
                                    >-</div>
                                    <div className="border border-gray-300 p-2 select-none">
                                        {product.quantity}
                                    </div>
                                    <div
                                        className="border border-gray-300 p-2 cursor-pointer transition-colors
                                        hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                                        onClick={() => increaseQuantity(product.id)}
                                    >+</div>
                                </td>
                                <td className="text-center">{(product.price * product.quantity).toFixed(2)}лв.</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} className="pt-6">
                                <button 
                                    className="border border-primary bg-primary text-white p-4 rounded-md uppercase font-semibold
                                    hover:bg-primaryDim transition-colors duration-300"
                                    onClick={() => clearCart()}
                                >
                                    Изчисти количката
                                </button>
                            </td>
                            <td colSpan={1} className="text-center pt-6">
                                <Link 
                                    href="/checkout"
                                    className="border border-primary bg-primary text-white p-4 rounded-md uppercase font-semibold
                                    hover:bg-primaryDim transition-colors duration-300"
                                >
                                    Приключване на поръчката
                                </Link>
                            </td>
                            <td colSpan={2} className="text-right text-2xl font-semibold pe-10 pt-4">Общо:</td>
                            <td className="text-center text-2xl font-semibold pt-4">{totalPrice.toFixed(2)}лв.</td>
                        </tr>
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default Cart;
