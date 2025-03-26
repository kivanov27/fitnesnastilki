import { TextField } from "@mui/material";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Checkout = () => {
    const { cart } = useCart();

    return (
        <div className="w-[75rem] mx-auto my-10 flex-1 flex">
            {/* Left side */}
            <div className="w-1/2 pe-10">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">Адрес за фактуриране</h1>
                <div className="flex justify-between mb-6">
                    <TextField 
                        label="Име" 
                        type="text" 
                        variant="outlined" 
                        color="primary"
                        required 
                    />
                    <TextField 
                        label="Фамилия" 
                        type="text" 
                        variant="outlined" 
                        color="primary"
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
            <div className="w-1/2 bg-gray-300 px-10">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">Вашата поръчка</h1>
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
                            <tr className="border-b border-gray-300">
                                <td>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20"
                                    />
                                </td>
                                <td className="text-sm">
                                    {item.name} x {item.quantity}
                                </td>
                                <td>
                                    {item.price * item.quantity}лв.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Checkout;
