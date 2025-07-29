import React, {useEffect, useState} from "react";
import {Pencil, Plus, Trash2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {addProduct, deleteProduct, getAllProducts, updateProduct} from "../../slices/productSlice.ts";
import Swal from "sweetalert2";
import {IdGenerator} from "../../utils/IdGenerator.ts";
import type {ProductData} from "../../modal/ProductData.ts";

export function ManageProducts() {

    const dispatch = useDispatch<AppDispatch>();

    const {list: products} = useSelector((state: RootState) => state.product);

    const [isOpen, setIsOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false); // State for update modal

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image: "",
    });

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const openModal = () => {
        setFormData({id: 0, name: "", description: "", price: 0, quantity: 0, image: ""});
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openEditModal = (product: any) => {
        setFormData({
            id: product.id, // Include the product ID
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            image: product.image || "",
            isWishlisted: product.isWishlisted || false,
            currency: product.currency
        }); // Pre-fill the form with product data
        setIsEditOpen(true); // Open the update modal
    };

    const closeEditModal = () => {
        setIsEditOpen(false); // Close the update modal
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, files} = e.target;
        if (name === "image" && files && files[0]) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0], // Store the selected file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "price" || name === "quantity" ? parseFloat(value) : value,
            }));
        }
    };

    const handleEditProduct = (product: any) => {
        if (!product.name || !product.price || !product.quantity || !product.image) {
            Swal.fire("Error", "Please fill in all required fields.", "error");
            return;
        }

        // Pre-fill the form with product data and open the modal
        openEditModal(product)
    };

    const handleDeleteProduct = (productId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Dispatch delete action or handle deletion logic
                dispatch(deleteProduct(productId)); // Replace with your delete action
                Swal.fire("Deleted!", "Your product has been deleted.", "success");
            }
        });
    };

    const handleAddProduct = async () => {
        const productId = IdGenerator.generateId("PRD");
        console.log(productId);
        if (formData.name && formData.price && formData.quantity && formData.image) {
            const newProduct = new FormData();
            newProduct.append("id", productId);
            newProduct.append("name", formData.name);
            newProduct.append("description", formData.description);
            newProduct.append("price", formData.price);
            newProduct.append("quantity", formData.quantity);
            newProduct.append("image", formData.image);
            newProduct.append("isWishlisted", "false");
            newProduct.append("currency", "Rs.");

            console.log("FormData entries:");
            for (const [key, value] of newProduct.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                await dispatch(addProduct(newProduct)); // Dispatch the addProduct action
                closeModal(); // Close the modal
            } catch (error) {
                Swal.fire("Error", "Failed to add product.", "error");
            }
        } else {
            Swal.fire("Error", "Please fill in all required fields.", "error");
        }
    };

    const handleUpdateProduct = async () => {
        if (formData.name && formData.price && formData.quantity) {
            const updatedData = new FormData();
            updatedData.append("id", formData.id.toString());
            updatedData.append("name", formData.name);
            updatedData.append("description", formData.description);
            updatedData.append("price", formData.price.toString());
            updatedData.append("quantity", formData.quantity.toString());
            updatedData.append("isWishlisted", "false");
            updatedData.append("currency", "Rs.");

            if (formData.image instanceof File) {
                updatedData.append("image", formData.image);
            }

            console.log("Update FormData entries:");
            for (const [key, value] of updatedData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                await dispatch(updateProduct({ id: formData.id, updatedData })); // Pass id and updatedData
                Swal.fire({
                    title: "Success",
                    text: "Product updated successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 2000
                }).then(r => {
                    if (r.isConfirmed || r.dismiss === Swal.DismissReason.timer) {
                        closeEditModal();
                    }
                });
                // window.location.reload();
            } catch (error) {
                console.error("Update failed:", error);
                Swal.fire("Error", "Failed to update product.", "error");
            }
        } else {
            Swal.fire("Error", "Please fill in all required fields.", "error");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Product Management</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={openModal}
                >
                    <Plus size={18}/> Add Product
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
                    {products.map((prod) => {
                        const fileName = prod.image ? prod.image.split('/').pop() : '';

                        return (
                            <tr key={prod.id} className="border-b">
                                <td className="p-3">
                                    <img
                                        src={`http://localhost:3000/uploads/${fileName}`}
                                        alt={prod.name}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                </td>
                                <td className="p-3">{prod.name}</td>
                                <td className="p-3">{prod.description}</td>
                                <td className="p-3">Rs. {prod.price}</td>
                                <td className="p-3">{prod.quantity}</td>
                                <td className="p-3 flex flex-col gap-3 items-center">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => handleEditProduct(prod)}
                                    >
                                        <Pencil size={18}/>
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDeleteProduct(prod.id)}
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
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
                            value={formData.price == 0 ? "" : formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Stock"
                            name="quantity"
                            type="number"
                            value={formData.quantity == 0 ? "" : formData.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Upload Image"
                            name="image"
                            type="file"
                            accept="image/*"
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

            {/*Edit Product Modal*/}
            {isEditOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-[500px]">
                        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
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
                            value={formData.price == 0 ? "" : formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Stock"
                            name="quantity"
                            type="number"
                            value={formData.quantity == 0 ? "" : formData.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            className="w-full border rounded px-3 py-2 mb-3"
                            placeholder="Upload Image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={closeEditModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleUpdateProduct}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}