import { useState } from "react";
import { useRouter } from "next/router";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        address: '',
        firstName: '',
        lastName: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Registration failed");
            }

            const user = await response.json();

            // store token and redirect (might want to use context or state management)
            localStorage.setItem('fitnesnastilki-token', user.token);
            router.push('/');
        }
        catch (error: unknown) {
            if (error instanceof Error) setError(error.message)
            else setError("Encountered an error when trying to register.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Имейл</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Парола</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">Телефон</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block mb-2">Адрес</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2">Име</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2">Фамилия</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-primary text-white p-2 rounded-md hover:bg-primaryDim transition-colors duration-300">
                Регистрация
            </button>
        </form>
    );
};

export default RegistrationForm;
