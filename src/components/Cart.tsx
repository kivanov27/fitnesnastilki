import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className="w-[75rem] mx-auto my-10 flex-1">
            {cart.length === 0 ? (
                <h1>Вашата количка е празна</h1>
            ) : (
                <table>
                    <thead>
                        <tr className="border-b-2 border-gray-400">
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
                            <tr key={product.id} className="border-b border-gray-400">
                                <td 
                                    className="pe-10 cursor-pointer hover:text-gray-500 transition-colors duration-300"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    <CloseIcon />
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
                    </tbody>
                </table>
            )}

            <button onClick={() => clearCart()}>
                Изчисти количката
            </button>
        </div>
    );
};

export default Cart;
