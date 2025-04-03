import { NewProduct } from "@/types";
import React, { useState } from "react";

const ProductForm = () => {
    const [formData, setFormData] = useState<NewProduct>({
        name: '',
        price: 0,
        discount: 0,
        link: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        category: [],
        popular: false,
        description: '',
        manufacturer: '',
        manufacturer_description: ''
    });
    const [error, setError] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const checked = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        if (name === "price" || name === "discount") {
            setFormData({
                ...formData,
                [name]: value === "" ? 0 : Number(value)
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: checked !== undefined ? checked : value
            });
        }
    };

    const handleCategoryAdd = () => {
        if (categoryInput.trim() && !formData.category.includes(categoryInput.trim())) {
            setFormData({
                ...formData,
                category: [...formData.category, categoryInput.trim()]
            });
            setCategoryInput('');
        }
    };

    const handleCategoryRemove = (categoryToRemove: string) => {
        setFormData({
            ...formData,
            category: formData.category.filter(c => c !== categoryToRemove)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/products', {
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

            alert(`Продукт ${data.name} беше добавен`);
        }
        catch (error) {
            if (error instanceof Error) setError(error.message);
            else setError("Encountered an error when trying to create a product");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-[75rem] mx-auto mt-6">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="w-full flex gap-x-10">
                {/* Name */}
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block mb-2 text-center">Име</label>
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
                {/* Link */}
                <div className="w-full mb-4">
                    <label htmlFor="link" className="block mb-2 text-center">Линк</label>
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
            </div>

            <div className="w-full flex gap-x-10">
                {/* Price */}
                <div className="w-full mb-4">
                    <label htmlFor="price" className="block mb-2 text-center">Цена</label>
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
                <div className="w-full mb-4">
                    <label htmlFor="discount" className="block mb-2 text-center">Отстъпка</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            </div>

            <div className="w-full flex gap-x-10">
                {/* Image1 */}
                <div className="w-full mb-4">
                    <label htmlFor="image1" className="block mb-2 text-center">Първа снимка</label>
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
                <div className="w-full mb-4">
                    <label htmlFor="image2" className="block mb-2 text-center">Втора снимка</label>
                    <input
                        type="text"
                        id="image2"
                        name="image2"
                        value={formData.image2}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            </div>

            <div className="w-full flex gap-x-10">
                {/* Image3 */}
                <div className="w-full mb-4">
                    <label htmlFor="image3" className="block mb-2 text-center">Трета снимка</label>
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
                <div className="w-full mb-4">
                    <label htmlFor="image4" className="block mb-2 text-center">Четвърта снимка</label>
                    <input
                        type="text"
                        id="image4"
                        name="image4"
                        value={formData.image4}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="w-full mb-4">
                <label htmlFor="category" className="block mb-2 text-center">Категории (plocha, rulo, izkustvena-treva, tatami, postelki, platformi-podiumi)</label>
                <div className="flex">
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={categoryInput}
                        onChange={({ target }) => setCategoryInput(target.value)}
                        className="flex-1 p-2 border rounded-l-md"
                        placeholder="Добави категория"
                    />
                    <button
                        type="button"
                        onClick={handleCategoryAdd}
                        className="bg-gray-300 px-4 rounded-r-md hover:bg-gray-400"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Display categories */}
            <div className="mt-2 flex flex-wrap gap-2">
                {formData.category.map(c => (
                    <span
                        key={c}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                    >
                        {c}
                        <button
                            type="button"
                            onClick={() => handleCategoryRemove(c)}
                            className="ml-2 text-red-500"
                        >
                            x
                        </button>
                    </span>
                ))}
            </div>

            {/* Popular */}
            <div className="w-full mb-4 flex items-center justify-center">
                <input
                    type="checkbox"
                    id="popular"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label htmlFor="popular">Популярен продукт</label>
            </div>

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    rows={6}
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
                <textarea
                    id="manufacturer_description"
                    name="manufacturer_description"
                    value={formData.manufacturer_description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    rows={6}
                />
            </div>
            <button 
                type="submit" 
                className="block mx-auto p-2 mb-4 bg-primary text-white rounded-md hover:bg-primaryDim transition-colors duration-300"
            >
                Създаване
            </button>
        </form>
    );
};

export default ProductForm;
