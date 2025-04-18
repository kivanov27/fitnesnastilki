import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { PersonOutline } from "@mui/icons-material";
import Link from "next/link";
import { User } from "@/types";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch("/api/user");
                if (!res.ok) throw new Error("Not logged in");
                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error("Failed to fetch user: ", err);
                setUser(null);
            }
        };

        fetchUserData();
    }, []);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".profile-menu-container")) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setUser(null);
        setIsOpen(false);
        await signOut({ callbackUrl: "/" });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative profile-menu-container">
            <button onClick={toggleMenu} aria-label="User menu">
                <PersonOutline className="hover:text-primary cursor-pointer transition-colors duration-300" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-fit bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {user ? (
                        <div>
                            <p className="font-medium px-2">
                                {user.firstName ? user.firstName : user.email}
                            </p>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Изход
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                href="/login"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Вход
                            </Link>
                            <Link
                                href="/registration"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
