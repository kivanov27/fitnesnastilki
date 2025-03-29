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
    description: string;
    manufacturer: string;
    manufacturer_description: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderItems {
    id: string;
    order_id: string;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    id: string;
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    total_price: number;
    status?: string;
    created_at: Date;
    order_items: OrderItems[];
}
