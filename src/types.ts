export interface Product {
    id: number;
    name: string;
    price: number;
    discount?: number;
    link: string;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    category: string[];
    popular?: boolean;
    description?: string;
    manufacturer?: string;
    manufacturer_description?: string;
}

export type NewProduct = Omit<Product, "id">;

export interface Category {
    id: number;
    name: string;
    image: string;
    link: string;
    popular: boolean;
}

export type NewCategory = Omit<Category, "id">;

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: number;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export type NewOrderItem = Omit<OrderItem, "id" | "order_id">;

export interface Order {
    id: string;
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_city: string;
    total_price: number;
    status?: string;
    order_items: OrderItem[];
    notes?: string;
}

export interface NewOrder {
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_city: string;
    total_price: number;
    status?: string;
    notes?: string;
    order_items: NewOrderItem[];
}

export interface Logo {
    image: string;
    link: string;
}

export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
}
