import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Login failed");
            }

            const { token } = await res.json();

            // store token and redirect
            localStorage.setItem('fitnesnastilki_token', token);
            router.push('/');
        }
        catch(error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 flex-1 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6">Влезте в акаунта си</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">Имейл</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1">Парола</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded-md hover:bg-primaryDim transition-colors duration-300"
                >
                    Вход
                </button>
            </form>

            <span className="mt-4 text-gray-600">Нямате акаунт?</span>
            <Link href="/registration" className="text-primary hover:underline">Регистрация</Link>
        </div>
    );
};

export default LoginForm;
