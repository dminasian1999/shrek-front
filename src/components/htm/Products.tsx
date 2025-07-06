import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrlBlog } from "../../utils/constants.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { ProductT } from "../../utils/types.ts"
import EditProductModal, { ProductEditT } from "../EditProductModal.tsx"
import { deletePost } from "../../features/api/postActions.ts"

const Products: React.FC = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = useAppSelector(state => state.token)
  const dis = useAppDispatch()
  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/posts`)
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
        const data: ProductT[] = await res.json()
        setProducts(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Modal open/close logic
  const openEditModal = (idx: number) => {
    setEditIdx(idx)
    setEditModalOpen(true)
  }

  const handleEditSave = async (edited: ProductEditT) => {
    if (editIdx === null) return
    setSavingEdit(true)
    try {
      let imageUrl = edited.imageUrl
      if (edited.imageFile) {
        // upload image to backend, get URL
        const fd = new FormData()
        fd.append("file", edited.imageFile)
        const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
          method: "POST",
          headers: { Authorization: token },
          body: fd,
        })
        if (!res.ok) throw new Error("Image upload failed")
        const text = await res.text()
        imageUrl = JSON.parse(text).url || text.trim()
      }
      // Update backend
      const toSend = {
        ...edited,
        imageUrl,
        imageFile: undefined,
      }
      const prodId = products[editIdx].id
      const res2 = await fetch(`${baseUrlBlog}/post/${prodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(toSend),
      })
      if (!res2.ok) throw new Error("Save failed")
      // Update local state
      setProducts(prev =>
        prev.map((p, i) => (i === editIdx ? { ...p, ...toSend } : p)),
      )
      setEditModalOpen(false)
      setEditIdx(null)
    } catch (e) {
      alert("Error saving: " + (e as Error).message)
    } finally {
      setSavingEdit(false)
    }
  }

  // DELETE HANDLER
  const handleDelete = async (idx: number) => {
    dis(deletePost(products[idx].id))
    const prodId = products[idx].id
    if (!window.confirm("Are you sure you want to delete this product?")) return

    // try {
    //   await deletePost(prodId!, token);
    //   setProducts((prev) => prev.filter((_, i) => i !== idx));
    // } catch (e) {
    //   alert("Error deleting: " + (e as Error).message);
    // }
  }

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container py-4 mt-5">
      <div className="card shadow-sm mt-5">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Inventory</h5>
          <button className="btn btn-light" onClick={() => navigate("/new")}>
            Add Product
          </button>
        </div>
        <div className="card-body ">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Buy (₪)</th>
                  <th>Sell (₪)</th>
                  <th className="text-danger">Profit (₪)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, idx) => (
                  <tr key={prod.id}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="rounded me-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{prod.name}</span>
                      </div>
                    </td>
                    <td className="align-middle">{prod.category}</td>
                    <td className="align-middle">{prod.quantity}</td>
                    <td className="align-middle">${prod.buy}</td>
                    <td className="align-middle">${prod.sell}</td>
                    <td className="align-middle">${prod.sell - prod.buy}</td>
                    <td className="align-middle text-end">
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => navigate(`/product/edit/${prod.id}`)}
                        >
                          <div className={" fa fa-edit"}></div>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(idx)}
                        >
                          <div className={" fa fa-trash"}></div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editModalOpen && editIdx !== null && (
        <EditProductModal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditSave}
          saving={savingEdit}
          initial={{
            ...products[editIdx],
            imageFile: null, // always null at first open
          }}
        />
      )}
    </div>
  )
}

export default Products
