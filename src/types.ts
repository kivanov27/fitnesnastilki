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
