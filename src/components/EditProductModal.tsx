import React, { useState, useEffect } from "react";
import { categories } from "../utils/constants";

export interface ProductEditT {
    id?: string;
    name: string;
    imageUrl: string;
    imageFile?: File | null;
    quantity: number;
    buy: number;
    sell: number;
    category: string;
}

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (product: ProductEditT) => Promise<void>;
    initial?: ProductEditT;
    saving?: boolean;
}

const emptyProduct: ProductEditT = {
    name: "",
    imageUrl: "",
    quantity: 0,
    buy: 0,
    sell: 0,
    category: "",
};

const EditProductModal: React.FC<Props> = ({
                                               show,
                                               onClose,
                                               onSave,
                                               initial,
                                               saving,
                                           }) => {
    const [product, setProduct] = useState<ProductEditT>(initial || emptyProduct);

    useEffect(() => {
        setProduct(initial || emptyProduct);
    }, [initial, show]);

    const handleChange = (
        field: keyof ProductEditT,
        value: any
    ) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleChange("imageFile", file);
            handleChange("imageUrl", URL.createObjectURL(file));
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal show d-block" tabIndex={-1} aria-modal="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {product.id ? "Edit Product" : "Add Product"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 text-center">
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="rounded mb-2"
                                        style={{ width: 80, height: 80, objectFit: "cover" }}
                                    />
                                )}
                                <label className="form-label d-block">
                                    Product Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control form-control-sm mt-1"
                                    />
                                </label>
                            </div>

                            <div className="mb-2">
                                <label className="form-label">
                                    Product Name
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Product Name"
                                        value={product.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">
                                    Category
                                    <select
                                        className="form-select mt-1"
                                        value={product.category}
                                        onChange={(e) => handleChange("category", e.target.value)}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.title} value={cat.route}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="row g-2">
                                <div className="col">
                                    <label className="form-label w-100">
                                        Quantity
                                        <input
                                            type="number"
                                            className="form-control mt-1"
                                            placeholder="Quantity"
                                            value={product.quantity}
                                            onChange={(e) => handleChange("quantity", Number(e.target.value))}
                                        />
                                    </label>
                                </div>
                                <div className="col">
                                    <label className="form-label w-100">
                                        Buy Price
                                        <input
                                            type="number"
                                            className="form-control mt-1"
                                            placeholder="Buy Price"
                                            value={product.buy}
                                            onChange={(e) => handleChange("buy", Number(e.target.value))}
                                        />
                                    </label>
                                </div>
                                <div className="col">
                                    <label className="form-label w-100">
                                        Sell Price
                                        <input
                                            type="number"
                                            className="form-control mt-1"
                                            placeholder="Sell Price"
                                            value={product.sell}
                                            onChange={(e) => handleChange("sell", Number(e.target.value))}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                disabled={saving}
                                onClick={() => onSave(product)}
                            >
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" />
        </>
    );
};

export default EditProductModal;
