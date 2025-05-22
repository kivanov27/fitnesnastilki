import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, TextField, Alert } from '@mui/material';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (newPassword !== confirmPassword) {
            setError('Новата парола и потвърждението не съвпадат');
            return;
        }

        if (newPassword.length < 6) {
            setError('Паролата трябва да бъде поне 6 символа');
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session?.user?.email,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Грешка при смяна на паролата');
            }

            setSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Optionally log out the user after password change
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неочаквана грешка');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full xl:w-[75rem] mx-auto p-6 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-0">
            <h2 className="text-2xl font-bold mb-6 text-center">Смяна на парола</h2>

            {error && <Alert severity="error" className="mb-4">{error}</Alert>}
            {success && (
                <Alert severity="success" className="mb-4">
                    Паролата е сменена успешно! Пренасочване към страницата за вход...
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    type="password"
                    label="Текуща парола"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    type="password"
                    label="Нова парола"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    helperText="Паролата трябва да бъде поне 6 символа"
                />

                <TextField
                    type="password"
                    label="Потвърди нова парола"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    className="mt-4"
                >
                    {isLoading ? 'Зареждане...' : 'Смени паролата'}
                </Button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
