import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        address: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Registration failed");
            }

            const user = await response.json();

            // store token and redirect (might want to use context or state management)
            localStorage.setItem("fitnesnastilki-token", user.token);
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) setError(error.message);
            else setError("Encountered an error when trying to register.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-[30rem] sm:w-[30rem] mx-auto my-10 flex-1 flex flex-col justify-center gap-y-6 px-4 sm:px-0"
        >
            <h2 className="text-center text-xl lg:text-3xl font-medium mb-2">
                Регистрация
            </h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-between gap-x-4 sm:gap-x-0">
                <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Имейл"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Парола"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
            </div>
            <div className="flex justify-between gap-x-4 sm:gap-x-0">
                <TextField
                    type="text"
                    id="phone"
                    name="phone"
                    label="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
                <TextField
                    type="text"
                    id="city"
                    name="city"
                    label="Град"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
            </div>
            <TextField
                type="text"
                id="address"
                name="address"
                label="Адрес"
                value={formData.address}
                onChange={handleChange}
                required
                variant="outlined"
            />
            <div className="flex justify-between gap-x-4 sm:gap-x-0">
                <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="Име"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Фамилия"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                className="w-fit"
                sx={{ marginX: "auto" }}
            >
                Регистрация
            </Button>
        </form>
    );
};

export default RegistrationForm;
