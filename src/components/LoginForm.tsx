import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (!res || !res.ok) {
                setError("Invalid email or password");
            } else {
                router.push("/");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="w-full xl:w-[75rem] mx-auto p-6 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-0">
            <h2 className="text-xl lg:text-3xl font-medium mb-8">
                Влезте в акаунта си
            </h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" variant="contained">
                    Вход
                </Button>
            </form>

            <span className="mt-4 text-gray-600">Нямате акаунт?</span>
            <Link href="/registration" className="text-primary hover:underline">
                Регистрация
            </Link>
        </div>
    );
};

export default LoginForm;
