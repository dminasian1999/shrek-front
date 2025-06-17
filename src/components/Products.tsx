import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {baseUrlBlog} from "../utils/constants";
import {useAppSelector} from "../app/hooks";
import {ProductT} from "../utils/types";
import {ProductEditT} from "./EditProductModal";
import {deletePost} from "../features/api/postActions.tsx";

const Products: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = useAppSelector((state) => state.token);

    // Edit modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${baseUrlBlog}/posts`);
                if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
                const data: ProductT[] = await res.json();
                setProducts(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Modal open/close logic
    const openEditModal = (idx: number) => {
        setEditIdx(idx);
        setEditModalOpen(true);
    };

    const handleEditSave = async (edited: ProductEditT) => {
        if (editIdx === null) return;
        setSavingEdit(true);
        try {
            let imageUrl = edited.imageUrl;
            if (edited.imageFile) {
                // upload image to backend, get URL
                const fd = new FormData();
                fd.append("file", edited.imageFile);
                const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
                    method: "POST",
                    headers: { Authorization: token },
                    body: fd,
                });
                if (!res.ok) throw new Error("Image upload failed");
                const text = await res.text();
                imageUrl = JSON.parse(text).url || text.trim();
            }
            // Update backend
            const toSend = {
                ...edited,
                imageUrl,
                imageFile: undefined,
            };
            const prodId = products[editIdx].id;
            const res2 = await fetch(`${baseUrlBlog}/post/${prodId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: token },
                body: JSON.stringify(toSend),
            });
            if (!res2.ok) throw new Error("Save failed");
            // Update local state
            setProducts((prev) =>
                prev.map((p, i) =>
                    i === editIdx ? { ...p, ...toSend } : p
                )
            );
            setEditModalOpen(false);
            setEditIdx(null);
        } catch (e) {
            alert("Error saving: " + (e as Error).message);
        } finally {
            setSavingEdit(false);
        }
    };

    // DELETE HANDLER
    const handleDelete = async (idx: number) => {
        const prodId = products[idx].id;
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deletePost(prodId!, token);
            setProducts((prev) => prev.filter((_, i) => i !== idx));
        } catch (e) {
            alert("Error deleting: " + (e as Error).message);
        }
    };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>

        </div>
    );
};

export default Products;
