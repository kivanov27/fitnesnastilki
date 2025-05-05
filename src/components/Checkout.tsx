import { TextField } from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { NewOrder } from "@/types";

const Checkout = () => {
    const [formData, setFormData] = useState<NewOrder>({
        customer_name: "",
        customer_surname: "",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        customer_city: "",
        total_price: 0,
        order_items: [],
        notes: "",
    });
    const [agreed, setAgreed] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const { cart, totalPrice, clearCart } = useCart();
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch("/api/user");
                if (!res.ok) throw new Error("Failed to fetch user data");
                const user = await res.json();

                setFormData((prev) => ({
                    ...prev,
                    customer_name: user.firstName || "",
                    customer_surname: user.lastName || "",
                    customer_email: user.email || "",
                    customer_phone: user.phone || "",
                    customer_address: user.address || "",
                    customer_city: user.city || "",
                }));
            } catch (err) {
                console.error("Could not prefill user data");
            }
        };

        fetchUserData();
    }, []);

    const submitOrder = async () => {
        setError("");
        setSuccess("");

        if (!agreed) {
            setError("Моля съгласете се с правилата и условията.");
            return;
        }

        const requiredFields = [
            formData.customer_name,
            formData.customer_surname,
            formData.customer_email,
            formData.customer_phone,
            formData.customer_address,
            formData.customer_city,
        ];

        if (requiredFields.some((field) => !field.trim())) {
            setError("Моля, попълнете всички задължителни полета.");
            return;
        }

        if (!formData.customer_email.includes("@")) {
            setError("Невалиден имейл");
            return;
        } else if (!formData.customer_phone.match(/^\+?\d+$/)) {
            setError("Невалиден телефонен номер");
            return;
        } else if (!formData.customer_city) {
            setError("Градът е задължителен");
            return;
        } else if (!formData.customer_address) {
            setError("Адресът е задължителен");
            return;
        }

        const newOrder: NewOrder = {
            ...formData,
            total_price: totalPrice,
            status: "Pending",
            order_items: cart.map((item) => ({
                product_id: item.id,
                product_name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
                image: item.image,
            })),
        };

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Грешка при създаването на поръчка.");
                return;
            }

            setSuccess("Поръчката е изпратена успешно.");
            clearCart();
            setFormData({
                customer_name: "",
                customer_surname: "",
                customer_email: "",
                customer_phone: "",
                customer_address: "",
                customer_city: "",
                total_price: 0,
                order_items: [],
                notes: "",
            });
        } catch (err) {
            console.error("Order submission failed: ", err);
            setError("Възникна грешка при изпращането на поръчката.");
        }
    };

    if (status === "loading") {
        return <div className="text-center mt-20">Зареждане...</div>;
    }

    return (
        <div
            className="w-full xl:w-[75rem] mx-auto my-10 px-4 sm:px-12 lg:px-20 xl:px-0
            flex flex-col lg:flex-row flex-1 gap-y-6 lg:gap-y-0"
        >
            {/* Left side */}
            <div className="w-full lg:w-1/2 lg:pe-10">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">
                    Адрес за фактуриране
                </h1>
                <div className="flex gap-x-4 mb-6">
                    <TextField
                        label="Име"
                        type="text"
                        variant="outlined"
                        color="primary"
                        className="w-full"
                        required
                        value={formData.customer_name}
                        onChange={({ target }) =>
                            setFormData({
                                ...formData,
                                customer_name: target.value,
                            })
                        }
                    />
                    <TextField
                        label="Фамилия"
                        type="text"
                        variant="outlined"
                        color="primary"
                        className="w-full"
                        required
                        value={formData.customer_surname}
                        onChange={({ target }) =>
                            setFormData({
                                ...formData,
                                customer_surname: target.value,
                            })
                        }
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
                    value={formData.customer_address}
                    onChange={({ target }) =>
                        setFormData({
                            ...formData,
                            customer_address: target.value,
                        })
                    }
                />
                <TextField
                    label="Населено място"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                    value={formData.customer_city}
                    onChange={({ target }) =>
                        setFormData({
                            ...formData,
                            customer_city: target.value,
                        })
                    }
                />
                <TextField
                    label="Телефон"
                    type="tel"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                    value={formData.customer_phone}
                    onChange={({ target }) =>
                        setFormData({
                            ...formData,
                            customer_phone: target.value,
                        })
                    }
                />
                <TextField
                    label="Имейл адрес"
                    type="email"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    sx={{ marginBottom: "1.5rem" }}
                    required
                    value={formData.customer_email}
                    onChange={({ target }) =>
                        setFormData({
                            ...formData,
                            customer_email: target.value,
                        })
                    }
                />
                <TextField
                    label="Бележки към поръчката (по избор)"
                    variant="outlined"
                    className="w-full"
                    color="primary"
                    multiline
                    rows={5}
                    value={formData.notes}
                    onChange={({ target }) =>
                        setFormData({ ...formData, notes: target.value })
                    }
                />
            </div>

            {/* Right side */}
            <div className="w-full lg:w-1/2 bg-gray-300 px-5 rounded-md">
                <h1 className="text-2xl font-medium text-center mb-6 p-3">
                    Вашата поръчка
                </h1>
                <div className="px-5 py-2 bg-gray-100 rounded-md">
                    <div className="bg-gray-100 w-full flex flex-col">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="border-b border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-y-2 sm:gap-y-0 gap-x-2 py-2"
                            >
                                <div className="relative aspect-square w-20 h-20">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="5rem"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-xs md:text-sm">
                                    {item.name}{" "}
                                    <span className="font-bold">
                                        x {item.quantity}
                                    </span>
                                </div>
                                <div className="text-sm text-center">
                                    {(item.price * item.quantity).toFixed(2)}лв.
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <p className="py-3 font-semibold">Общо</p>
                        <p className="py-3 font-semibold text-primary">
                            {totalPrice.toFixed(2)}лв.
                        </p>
                    </div>
                </div>

                <div className="border-b border-gray-500 text-sm md:text-base">
                    <p className="mt-6">Начин на плащане</p>
                    <p className="my-2 bg-gray-100 p-3 rounded-md">
                        Наш представител ще се свърже с вас, за да уточни
                        подробностите по поръчката ви.
                    </p>
                </div>

                <p className="py-5 border-b border-gray-500 text-sm">
                    Вашите лични данни ще бъдат използвани за обработка на
                    вашата поръчка и за други цели, описани в нашата
                    <a
                        href="/privacy-policy"
                        className="font-semibold hover:text-primary"
                    >
                        {" "}
                        политиката за поверителност.
                    </a>
                </p>

                <div className="mt-2 flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        required
                        className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-sm 
                            checked:bg-primary checked:border-primary checked:text-white 
                            flex items-center justify-center aspect-square bg-white
                            before:content-['✔'] before:scale-0 checked:before:scale-100 
                            before:transition-transform before:duration-150 before:text-white text-center"
                    />
                    <label htmlFor="terms" className="ms-2 text-sm">
                        Прочетох и се съгласявам с
                        <a
                            href="/obshti-usloviya"
                            className="font-semibold hover:text-primary"
                        >
                            {" "}
                            правилата и условията
                            <span className="text-red-500"> *</span>
                        </a>
                    </label>
                </div>

                <button
                    className="w-full p-3 my-4 bg-primary text-white hover:bg-primaryDim transition-colors duration-300 rounded-md"
                    onClick={submitOrder}
                >
                    Поръчване
                </button>
                {error && <p className="text-red-900 mb-4">{error}</p>}
                {success && <p className="text-green-900 mb-4">{success}</p>}
            </div>
        </div>
    );
};

export default Checkout;
