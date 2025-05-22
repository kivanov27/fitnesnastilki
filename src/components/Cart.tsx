import { useCart } from "@/context/CartContext";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const Cart = () => {
    const {
        cart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
    } = useCart();

    return (
        <div className="w-full xl:w-[75rem] h-full mx-auto my-10 flex items-center flex-1 px-4 sm:px-12 lg:px-20 xl:px-0">
            {cart.length === 0 ? (
                <div className="w-full h-full flex flex-col gap-y-14 justify-center items-center">
                    <h1 className="text-4xl sm:text-6xl text-center">
                        Вашата количка е празна
                    </h1>
                    <Link
                        href="/katalog/vsichki"
                        className="uppercase p-4 bg-primary text-white hover:bg-primaryDim rounded-md font-medium w-fit"
                    >
                        Към магазина
                    </Link>
                </div>
            ) : (
                <div className="w-full">
                    {/* Desktop and Tablet view */}
                    <table className="w-full hidden lg:table">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th />
                                <th />
                                <th className="text-xl xl:text-2xl text-semibold pe-5 lg:pe-10 pb-5">
                                    Продукт
                                </th>
                                <th className="text-xl xl:text-2xl text-semibold pe-5 lg:pe-10 pb-5">
                                    Цена
                                </th>
                                <th className="text-xl xl:text-2xl text-semibold pe-5 lg:pe-10 pb-5">
                                    Количество
                                </th>
                                <th className="text-xl xl:text-2xl text-semibold pb-5">
                                    Общо
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-gray-300"
                                >
                                    <td className="pe-5 lg:pe-10">
                                        <CloseIcon
                                            className="cursor-pointer hover:text-primary transition-colors duration-300"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        />
                                    </td>
                                    <td className="pe-5 lg:pe-10">
                                        <div className="relative aspect-square w-24 h-24 my-2">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="6rem"
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="pe-5 lg:pe-10 text-center text-base">
                                        {product.name}
                                    </td>
                                    <td className="pe-5 lg:pe-10 text-center text-base">
                                        {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}лв.
                                    </td>
                                    <td className="h-24 pe-5 lg:pe-10 flex justify-center items-center">
                                        <div
                                            className="border border-gray-300 p-2 cursor-pointer transition-colors
                                                    hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                                            onClick={() =>
                                                decreaseQuantity(product.id)
                                            }
                                        >
                                            -
                                        </div>
                                        <div className="border border-gray-300 p-2 select-none">
                                            {product.quantity}
                                        </div>
                                        <div
                                            className="border border-gray-300 p-2 cursor-pointer transition-colors
                                                    hover:bg-primary hover:border-primary hover:text-white duration-300 select-none"
                                            onClick={() =>
                                                increaseQuantity(product.id)
                                            }
                                        >
                                            +
                                        </div>
                                    </td>
                                    <td className="text-center text-base">
                                        {(product.price * product.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} лв.
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pt-6 hidden lg:flex justify-between">
                        <button
                            className="border border-primary bg-primary text-white text-sm xl:text-base px-2 py-4
                                rounded-md uppercase font-semibold hover:bg-primaryDim transition-colors duration-300"
                            onClick={() => clearCart()}
                        >
                            Изчисти количката
                        </button>
                        <Link href="/checkout" className="text-center">
                            <button
                                className="border border-primary bg-primary text-white text-sm xl:text-base px-2 py-4 xl:p-4 
                                    rounded-md uppercase font-semibold hover:bg-primaryDim transition-colors duration-300"
                            >
                                Приключване на поръчката
                            </button>
                        </Link>
                        <div className="text-xl xl:text-2xl font-semibold">
                            Общо:
                            <span className="ms-2">
                                {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} лв.
                            </span>
                        </div>
                    </div>

                    {/* Mobile view */}
                    <div className="lg:hidden flex flex-col gap-4">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="pb-4 border-b border-gray-300 flex flex-col gap-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="relative aspect-square w-24 h-24">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="6rem"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <p className="font-semibold text-sm">
                                                {product.name}
                                            </p>
                                            <p className="text-sm flex justify-between">
                                                <span className="font-medium">
                                                    Цена:{" "}
                                                </span>
                                                {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} лв.
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">
                                                    Количество:{" "}
                                                </span>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                product.id,
                                                            )
                                                        }
                                                        className="border border-gray-300 px-1"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="border border-gray-300 px-1">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                product.id,
                                                            )
                                                        }
                                                        className="border border-gray-300 px-1"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm flex justify-between font-medium">
                                                Общо:
                                                <span className="text-primary">
                                                    {(product.price * product.quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} лв.
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <CloseIcon
                                        className="cursor-pointer ms-1"
                                        onClick={() =>
                                            removeFromCart(product.id)
                                        }
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col gap-4 mt-8">
                            <div className="text-lg md:text-xl font-semibold text-right flex justify-between">
                                Общо:
                                <span className="text-primary">
                                    {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} лв.
                                </span>
                            </div>
                            <button
                                className="bg-primary text-white py-3 rounded-md font-semibold"
                                onClick={() => clearCart()}
                            >
                                Изчисти количката
                            </button>
                            <Link href="/checkout">
                                <button className="bg-primary text-white py-3 rounded-md font-semibold w-full">
                                    Приключване на поръчката
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
