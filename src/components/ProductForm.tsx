import { NewProduct } from "@/types";
import { useState } from "react";

const ProductForm = () => {
    const [formData, setFormData] = useState<NewProduct>({
        name: '',
        price: 0,
        discount: undefined,
        link: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        description: '',
        manufacturer: '',
        manufacturer_description: ''
    });
    const [error, setError] = useState<string>('');

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
            const response = await fetch('/api/product', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Product creation failed");
            }

            const data = await response.json();

            // Add success message
            alert(`Продукт ${data.product.name} беше добавен`);
        }
        catch (error) {
            if (error instanceof Error) setError(error.message);
            else setError("Encountered an error when trying to create a product");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Име</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Price */}
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Цена</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Discount */}
            <div className="mb-4">
                <label htmlFor="discount" className="block mb-2">Отстъпка</label>
                <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Link */}
            <div className="mb-4">
                <label htmlFor="link" className="block mb-2">Линк</label>
                <input
                    type="text"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Image1 */}
            <div className="mb-4">
                <label htmlFor="image1" className="block mb-2">Първа снимка</label>
                <input
                    type="text"
                    id="image1"
                    name="image1"
                    value={formData.image1}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Image2 */}
            <div className="mb-4">
                <label htmlFor="image2" className="block mb-2">Втора снимка</label>
                <input
                    type="text"
                    id="image2"
                    name="image2"
                    value={formData.image2}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Image3 */}
            <div className="mb-4">
                <label htmlFor="image3" className="block mb-2">Трета снимка</label>
                <input
                    type="text"
                    id="image3"
                    name="image3"
                    value={formData.image3}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Image4 */}
            <div className="mb-4">
                <label htmlFor="image4" className="block mb-2">Четвърта снимка</label>
                <input
                    type="text"
                    id="image4"
                    name="image4"
                    value={formData.image4}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Описание</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Manufacturer */}
            <div className="mb-4">
                <label htmlFor="manufacturer" className="block mb-2">Производител</label>
                <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            {/* Manufacturer_description */}
            <div className="mb-4">
                <label htmlFor="manufacturer_description" className="block mb-2">Описание на производител</label>
                <input
                    type="text"
                    id="manufacturer_description"
                    name="manufacturer_description"
                    value={formData.manufacturer_description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-primary text-white p-2 rounded-md hover:bg-primaryDim transition-colors duration-300">
                Създаване
            </button>
        </form>
    );
};

export default ProductForm;
