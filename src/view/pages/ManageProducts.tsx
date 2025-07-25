/*
import React, { useState } from "react";

export const ManageProducts = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Product 1",
            price: 100,
            image: "https://via.placeholder.com/150",
            quantity: 10,
            description: "This is product 1",
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            image: "https://via.placeholder.com/150",
            quantity: 5,
            description: "This is product 2",
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        quantity: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
        };
        setProducts([...products, newProduct]);
        setShowAddModal(false);
        setFormData({ name: "", price: "", image: "", quantity: "", description: "" });
    };

    const handleEditProduct = () => {
        setProducts(
            products.map((product) =>
                product.id === selectedProduct.id ? { ...selectedProduct, ...formData } : product
            )
        );
        setShowEditModal(false);
        setSelectedProduct(null);
        setFormData({ name: "", price: "", image: "", quantity: "", description: "" });
    };

    const handleDeleteProduct = () => {
        setProducts(products.filter((product) => product.id !== selectedProduct.id));
        setShowDeleteModal(false);
        setSelectedProduct(null);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600">Stock: {product.quantity}</p>
                        <p className="text-gray-500 text-sm">{product.description}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setFormData(product);
                                    setShowEditModal(true);
                                }}
                                className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setShowDeleteModal(true);
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/!* Add Product Modal *!/}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">Add Product</h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddProduct}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/!* Edit Product Modal *!/}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleEditProduct}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/!* Delete Confirmation Modal *!/}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be
                            undone.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteProduct}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;*/

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
};

const dummyProducts: Product[] = [
    {
        id: 1,
        name: "Chocolate Cake",
        description: "Rich and creamy chocolate cake.",
        price: 1200,
        stock: 5,
        image: "https://via.placeholder.com/80",
    },
    {
        id: 2,
        name: "Vanilla Muffin",
        description: "Soft and sweet vanilla muffins.",
        price: 600,
        stock: 12,
        image: "https://via.placeholder.com/80",
    },
];

export function ManageProducts() {
    const [products, setProducts] = useState(dummyProducts);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
    });

    const openModal = () => {
        setFormData({ id: 0, name: "", description: "", price: 0, stock: 0, image: "" });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
        }));
    };

    const handleAddProduct = () => {
        const newProduct = { ...formData, id: Date.now() };
        setProducts((prev) => [...prev, newProduct]);
        closeModal();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Product Management</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={openModal}
                >
                    <Plus size={18} /> Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead className="bg-gray-100 text-left text-sm font-semibold">
                    <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id} className="border-b">
                            <td className="p-3">
                                <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded object-cover" />
                            </td>
                            <td className="p-3">{prod.name}</td>
                            <td className="p-3">{prod.description}</td>
                            <td className="p-3">Rs. {prod.price}</td>
                            <td className="p-3">{prod.stock}</td>
                            <td className="p-3 flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Pencil size={18} />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-[500px]">
                        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <textarea
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleAddProduct}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}