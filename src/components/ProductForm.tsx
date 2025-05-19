import { NewProduct } from "@/types";
import React, { useState } from "react";
import Editor from "./Editor";

type ProductFormData = Omit<NewProduct, "price" | "discount"> & {
    price: string;
    discount: string;
};

const ProductForm = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        price: "",
        discount: "",
        link: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
        category: [],
        popular: false,
        description: "",
        manufacturer: "",
        manufacturer_description: "",
    });
    const [error, setError] = useState<string>("");
    const [categoryInput, setCategoryInput] = useState<string>("");
    const [imageFiles, setImageFiles] = useState<Partial<Record<keyof NewProduct, File>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const checked =
            e.target.type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : undefined;

        setFormData({
            ...formData,
            [name]: checked !== undefined ? checked : value,
        });
    };

    const handleDescriptionChange = (html: string) => {
        setFormData(prev => ({ ...prev, description: html }));
    };

    const handleManufacturerDescriptionChange = (html: string) => {
        setFormData(prev => ({ ...prev, manufacturer_description: html }));
    };

    const handleImageSelect = async (
        e: React.ChangeEvent<HTMLInputElement>,
        imageField: keyof NewProduct
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFiles(prev => ({ ...prev, [imageField]: file }));
        setFormData(prev => ({ ...prev, [imageField]: file.name }));
    };

    const handleCategoryAdd = () => {
        if (
            categoryInput.trim() &&
            !formData.category.includes(categoryInput.trim())
        ) {
            setFormData({
                ...formData,
                category: [...formData.category, categoryInput.trim()],
            });
            setCategoryInput("");
        }
    };

    const handleCategoryRemove = (categoryToRemove: string) => {
        setFormData({
            ...formData,
            category: formData.category.filter((c) => c !== categoryToRemove),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const uploadedImageUrls: Partial<Record<keyof NewProduct, string>> = {};

            // upload each image file
            for (const [field, file] of Object.entries(imageFiles)) {
                if (!file) continue;

                const formDataFile = new FormData();
                formDataFile.append("image", file);
                formDataFile.append("category", formData.category[0]);
                formDataFile.append("productLink", formData.link);
                formDataFile.append("imageNumber", field.replace("image", ""));

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataFile,
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Upload failed");

                uploadedImageUrls[field as keyof NewProduct] = data.imageUrl;
            }

            const price = Number(formData.price);
            const discount = Number(formData.discount);

            if (isNaN(price) || price < 0) {
                setError("Моля, въведете валидна цена.");
                return;
            }
            if (isNaN(discount) || discount < 0) {
                setError("Моля, въведете валидна отстъпка.");
                return;
            }

            const finalFormData: NewProduct = {
                name: formData.name,
                price,
                discount,
                link: formData.link,
                image1: formData.image1,
                image2: formData.image2,
                image3: formData.image3,
                image4: formData.image4,
                image5: formData.image5,
                image6: formData.image6,
                image7: formData.image7,
                image8: formData.image8,
                category: formData.category,
                popular: formData.popular,
                description: formData.description,
                manufacturer: formData.manufacturer,
                manufacturer_description: formData.manufacturer_description,
            };

            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalFormData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Product creation failed");
            }

            const data = await response.json();

            alert(`Продукт ${data.name} беше добавен`);
        } catch (error) {
            if (error instanceof Error) setError(error.message);
            else
                setError(
                    "Encountered an error when trying to create a product",
                );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full xl:w-[75rem] mx-auto mt-6 px-6 sm:px-12 lg:px-20 xl:px-0"
        >
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="w-full flex flex-col sm:flex-row gap-x-10">
                {/* Name */}
                <div className="w-full mb-4">
                    <label htmlFor="name" className="block mb-2 text-center">
                        Име
                    </label>
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
                    <label htmlFor="link" className="block mb-2 text-center">
                        Линк
                    </label>
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
                    <label htmlFor="price" className="block mb-2 text-center">
                        Цена
                    </label>
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
                    <label
                        htmlFor="discount"
                        className="block mb-2 text-center"
                    >
                        Отстъпка
                    </label>
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

            {/* Image1 */}
            <div className="w-full mb-4">
                <label htmlFor="image1" className="block mb-2 text-center">
                    Първа снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image1"
                        name="image1"
                        value={formData.image1}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image1")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image2 */}
            <div className="w-full mb-4">
                <label htmlFor="image2" className="block mb-2 text-center">
                    Втора снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image2"
                        name="image2"
                        value={formData.image2}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image2")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image3 */}
            <div className="w-full mb-4">
                <label htmlFor="image3" className="block mb-2 text-center">
                    Трета снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image3"
                        name="image3"
                        value={formData.image3}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image3")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image4 */}
            <div className="w-full mb-4">
                <label htmlFor="image4" className="block mb-2 text-center">
                    Четвърта снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image4"
                        name="image4"
                        value={formData.image4}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image4")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image5 */}
            <div className="w-full mb-4">
                <label htmlFor="image5" className="block mb-2 text-center">
                    Пета снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image5"
                        name="image5"
                        value={formData.image5}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image5")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image6 */}
            <div className="w-full mb-4">
                <label htmlFor="image6" className="block mb-2 text-center">
                    Шеста снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image6"
                        name="image6"
                        value={formData.image6}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image6")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image7 */}
            <div className="w-full mb-4">
                <label htmlFor="image7" className="block mb-2 text-center">
                    Седма снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image7"
                        name="image7"
                        value={formData.image7}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image7")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Image8 */}
            <div className="w-full mb-4">
                <label htmlFor="image8" className="block mb-2 text-center">
                    Осма снимка
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="image8"
                        name="image8"
                        value={formData.image8}
                        readOnly
                        className="flex-1 p-2 border rounded-md"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, "image8")}
                        className="p-2"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="w-full mb-4">
                <label htmlFor="category" className="block mb-2 text-center">
                    Категории (plocha, rulo, izkustvena-treva, tatami, postelki,
                    platformi-podiumi, lepilo, fitnes-ured)
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={categoryInput}
                        onChange={({ target }) =>
                            setCategoryInput(target.value)
                        }
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
                {formData.category.map((c) => (
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
                <label htmlFor="description" className="block mb-2">
                    Описание
                </label>
                <Editor content={formData.description} onChangeAction={handleDescriptionChange} />
            </div>

            {/* Manufacturer */}
            <div className="mb-4">
                <label htmlFor="manufacturer" className="block mb-2">
                    Производител
                </label>
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
                <label
                    htmlFor="manufacturer_description"
                    className="block mb-2"
                >
                    Описание на производител
                </label>
                <Editor
                    content={formData.manufacturer_description}
                    onChangeAction={handleManufacturerDescriptionChange}
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
