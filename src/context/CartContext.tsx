"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { CartItem } from "@/types";

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const [cart, setCart] = useState<CartItem[]>([]);

    const totalPrice = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
    );

    // load cart from localStorage
    useEffect(() => {
        const fetchCart = async () => {
            if (session?.user) {
                const res = await fetch("/api/cart");
                const dbCart = await res.json();
                setCart(dbCart);
            } else {
                const cookieCart = Cookies.get("fitnesnastilki-cart");
                if (cookieCart) setCart(JSON.parse(cookieCart));
            }
        };

        fetchCart();
    }, [session]);

    // sync guest cart to cookie
    useEffect(() => {
        if (!session?.user) {
            Cookies.set("fitnesnastilki-cart", JSON.stringify(cart), {
                expires: 7,
            });
        }
    }, [cart, session]);

    // migrate cookie cart to db on login
    useEffect(() => {
        const migrateCart = async () => {
            if (session?.user) {
                const cookieCart = Cookies.get("fitnesnastilki-cart");
                if (!cookieCart) return;

                const localCart = JSON.parse(cookieCart);
                await Promise.all(
                    localCart.map((item: CartItem) =>
                        fetch("api/cart", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                productId: item.id,
                                quantity: item.quantity,
                            }),
                        }),
                    ),
                );

                Cookies.remove("fitnesnastilki-cart");
            }
        };

        migrateCart();
    }, [session]);

    const addToCart = async (item: CartItem) => {
        if (session?.user) {
            await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: item.id,
                    quantity: item.quantity,
                }),
            });

            setCart((prev) => {
                const existing = prev.find((p) => p.id === item.id);
                if (existing) {
                    return prev.map((p) =>
                        p.id === item.id
                            ? { ...p, quantity: p.quantity + item.quantity }
                            : p,
                    );
                }
                return [...prev, item];
            });
        } else {
            setCart((prev) => {
                const existing = prev.find((p) => p.id === item.id);
                if (existing) {
                    return prev.map((p) =>
                        p.id === item.id
                            ? { ...p, quantity: p.quantity + item.quantity }
                            : p,
                    );
                }
                return [...prev, item];
            });
        }
    };

    const removeFromCart = async (id: number) => {
        if (session?.user) {
            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id }),
            });
        }

        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = async () => {
        if (session?.user) {
            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
        }

        setCart([]);
    };

    const increaseQuantity = async (id: number) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );

        if (session?.user) {
            const updatedItem = updatedCart.find((item) => item.id === id);
            await fetch("/api/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: id,
                    quantity: updatedItem?.quantity,
                }),
            });
        }

        setCart(updatedCart);
    };

    const decreaseQuantity = async (id: number) => {
        const updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item,
        );

        if (session?.user) {
            const updatedItem = updatedCart.find((item) => item.id === id);
            await fetch("/api/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: id,
                    quantity: updatedItem?.quantity,
                }),
            });
        }

        setCart(updatedCart);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
