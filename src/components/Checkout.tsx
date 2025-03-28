import { TextField } from "@mui/material";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Checkout = () => {
    const { cart, totalPrice } = useCart();

    return (
        <div className="w-[75rem] mx-auto my-10 flex-1 flex">
            {/* Left side */}
            <div className="w-1/2 pe-10">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">Адрес за фактуриране</h1>
                <div className="flex gap-x-4 mb-6">
                    <TextField 
                        label="Име" 
                        type="text" 
                        variant="outlined" 
                        color="primary"
                        className="w-full"
                        required 
                    />
                    <TextField 
                        label="Фамилия" 
                        type="text" 
                        variant="outlined" 
                        color="primary"
                        className="w-full"
                        required 
                    />
                </div>
                <TextField 
                    label="Адрес за доставка" 
                    variant="outlined" 
                    placeholder="Посочете офис на еконт или ваш личен адрес за доставка" 
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required 
                />
                <TextField
                    label="Населено място"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                />
                <TextField
                    label="Телефон"
                    type="tel"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                />
                <TextField
                    label="Имейл адрес"
                    type="email"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                />
                <TextField
                    label="Бележки към поръчката (по избор)"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    multiline
                    rows={5}
                />
            </div>

            {/* Right side */}
            <div className="w-1/2 bg-gray-300 px-5 rounded-md">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">Вашата поръчка</h1>
                <div className="px-5 py-2 bg-gray-100 rounded-md">
                    <table className="bg-gray-100 w-full">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="uppercase">
                                    Продукт
                                </th>
                                <th />
                                <th className="uppercase">
                                    Общо
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item =>
                                <tr 
                                    key={item.id} 
                                    className="border-b border-gray-300"
                                >
                                    <td>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 py-2"
                                        />
                                    </td>
                                    <td className="text-sm">
                                        {item.name} <span className="font-bold">x {item.quantity}</span>
                                    </td>
                                    <td className="text-center">
                                        {item.price * item.quantity}лв.
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className="py-3 font-semibold">Общо</td>
                                <td className="py-3" />
                                <td className="py-3 font-semibold">{totalPrice.toFixed(2)}лв.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-b border-gray-500">
                    <p className="mt-6">Наложен платеж</p>
                    <p className="my-2 bg-gray-100 p-3 rounded-md">Плащане в брой при доставка</p> 
                </div>

                <p className="py-5 border-b border-gray-500 text-sm">
                    Вашите лични данни ще бъдат използвани за обработка на вашата поръчка и за други цели, описани в нашата 
                    <a 
                        href="politika-za-poveritelnost" 
                        className="font-semibold hover:text-primary"
                    > политиката за поверителност.</a>
                </p>

                <div className="mt-2">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms" className="ms-2 text-sm">
                        Прочетох и се съгласявам с 
                        <a 
                            href="/pravila-usloviya" 
                            className="font-semibold hover:text-primary"
                        > правилата и условията<span className="text-red-500"> *</span></a>
                    </label>
                </div>

                <button className="w-full p-3 my-4 bg-primary text-white hover:bg-primaryDim transition-colors duration-300 rounded-md">
                    Поръчване
                </button>
            </div>
        </div>
    );
};

export default Checkout;
