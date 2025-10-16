import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { useAppSelector } from "../../app/hooks.ts"
import {
  allColors,
  allMaterials,
  baseUrl,
  collections,
  ringSizes,
  sizeOptions,
} from "../../utils/constants.ts"

const clothesSizes = [
  { value: "S", name: "Small (S)" },
  { value: "M", name: "Medium (M)" },
  { value: "L", name: "Large (L)" },
]

type SizeRow = { size: string; quantity: number }

const EditProduct: React.FC = () => {
  const token = useAppSelector(s => s.token)
  const { id = "" } = useParams()

  const [product, setProduct] = useState<ProductT>({} as ProductT)
  const [sizeRows, setSizeRows] = useState<SizeRow[]>([{ size: "", quantity: 0 }])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`${baseUrl}/post/${id}`, { headers: { Authorization: token } })
      .then(async res => {
        if (!res.ok) throw new Error("Failed to load")
        const data = await res.json()
        data.imageUrls = Array.isArray(data.imageUrls) ? data.imageUrls : []
        data.sizeQuantities = Array.isArray(data.sizeQuantities)
          ? data.sizeQuantities
          : []

        setProduct(data)
        setSelectedImage(data.imageUrls[0] ?? null)

        setSizeRows(
          data.sizeQuantities.length
            ? data.sizeQuantities.map((sq: any) => ({
              size: sq.size || "",
              quantity: sq.quantity || 0,
            }))
            : [{ size: "", quantity: 0 }]
        )
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false))
  }, [id, token])

  useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p))
    }
  }, [previews])

  const setField = (k: keyof ProductT, v: any) => {
    setProduct(p => ({ ...p, [k]: v }))
  }

  const addSizeRow = () => setSizeRows(s => [...s, { size: "", quantity: 0 }])

  const removeSizeRow = (i: number) => {
    setSizeRows(s => (s.length > 1 ? s.filter((_, idx) => idx !== i) : s))
  }

  const setSizeRow = (i: number, field: keyof SizeRow, value: any) =>
    setSizeRows(s =>
      s.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    )

  const totalQuantity = sizeRows.reduce(
    (acc, r) => acc + Number(r.quantity || 0),
    0
  )

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const newPreviews = files.map(f => URL.createObjectURL(f))
    setNewFiles(prev => [...prev, ...files])
    setPreviews(prev => [...prev, ...newPreviews])
    setProduct(p => ({
      ...p,
      imageUrls: [...(p.imageUrls ?? []), ...newPreviews],
    }))
  }

  const removeImage = (url: string) => {
    if (previews.includes(url)) {
      setPreviews(p => p.filter(x => x !== url))
      setNewFiles(files => {
        const idx = previews.findIndex(x => x === url)
        if (idx >= 0) {
          const next = [...files]
          next.splice(idx, 1)
          return next
        }
        return files
      })
      URL.revokeObjectURL(url)
    }
    setProduct(p => ({
      ...p,
      imageUrls: (p.imageUrls ?? []).filter(u => u !== url),
    }))
    if (selectedImage === url) setSelectedImage(null)
  }

  const uploadNewFiles = async (): Promise<string[]> => {
    const uploaded: string[] = []
    for (const f of newFiles) {
      const fd = new FormData()
      fd.append("file", f)
      const res = await fetch(`${baseUrl}/post/file/upload`, {
        method: "POST",
        headers: { Authorization: token },
        body: fd,
      })
      if (!res.ok) throw new Error("Upload failed")
      const text = await res.text()
      try {
        const parsed = JSON.parse(text)
        uploaded.push(parsed.url || text.trim())
      } catch {
        uploaded.push(text.trim())
      }
    }
    return uploaded
  }

  const onSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const existing = (product.imageUrls ?? []).filter(
        (u: string) => !u.startsWith("blob:")
      )
      const uploaded = newFiles.length ? await uploadNewFiles() : []
      const finalImages = [...existing, ...uploaded]

      const sizeQuantities = sizeRows.map(r => ({
        size: r.size,
        quantity: Number(r.quantity || 0),
      }))

      const payload: any = {
        ...product,
        imageUrls: finalImages,
        sizeQuantities,
      }

      const res = await fetch(`${baseUrl}/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Save failed")
      alert("Saved")
      previews.forEach(p => URL.revokeObjectURL(p))
      setNewFiles([])
      setPreviews([])
      setProduct(p => ({ ...p, imageUrls: finalImages }))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error")
    } finally {
      setSaving(false)
    }
  }

  const getSizeOptions = () => {
    const cat = (product.category ?? "").toLowerCase()
    const sub = (product.subCategory ?? "").toLowerCase()
    if (sub === "rings")
      return ringSizes.map(r => ({ value: r.size, name: r.size }))
    if (cat === "clothing") return clothesSizes
    return sizeOptions
  }

  if (loading)
    return (
      <div className="text-center p-5">
        <div className="spinner-border" />
        <div>Loading...</div>
      </div>
    )
  if (error) return <div className="text-danger text-center p-4">{error}</div>

  return (
    <div className="container">
      <h3>Edit Product</h3>
      <div className="row">
        <div className="col-md-5">
          <div
            style={{ height: 320 }}
            className="border d-flex align-items-center justify-content-center mb-2"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="selected"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <div className="text-muted">No Image</div>
            )}
          </div>

          <div className="d-flex flex-wrap gap-2 mb-2">
            {(product.imageUrls ?? []).map((u, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={u}
                  alt={`thumb-${i}`}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      selectedImage === u
                        ? "2px solid #0d6efd"
                        : "1px solid #ddd",
                  }}
                  onClick={() => setSelectedImage(u)}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  onClick={() => removeImage(u)}
                  style={{ padding: "0 6px", lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onFilesChange}
            className="form-control mb-3"
            disabled={saving}
          />
        </div>

        <div className="col-md-7">
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={product.name ?? ""}
              onChange={e => setField("name", e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={product.category ?? ""}
              onChange={e => setField("category", e.target.value)}
              disabled={saving}
            >
              <option value="">-- select --</option>
              {collections.map(c => (
                <option key={c.route} value={c.route}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {product.category && (
            <div className="mb-2">
              <label className="form-label">Subcategory</label>
              <select
                className="form-select"
                value={product.subCategory ?? ""}
                onChange={e => setField("subCategory", e.target.value)}
                disabled={saving}
              >
                <option value="">-- select --</option>
                {collections
                  .find(c => c.route === product.category)
                  ?.subCategory?.map(s => (
                    <option key={s.route} value={s.route}>
                      {s.title}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="mb-2 d-flex gap-2">
            <div style={{ flex: 1 }}>
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={product.price ?? 0}
                onChange={e => setField("price", Number(e.target.value || 0))}
                disabled={saving}
              />
            </div>
            <div style={{ width: 140 }}>
              <label className="form-label">Weight</label>
              <input
                type="number"
                className="form-control"
                value={product.weight ?? 0}
                onChange={e => setField("weight", Number(e.target.value || 0))}
                disabled={saving}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label mb-0">Sizes</label>
              {(product.subCategory === "rings" || product.category === "clothing") && (
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={addSizeRow}
                  disabled={saving}
                >
                  Add
                </button>
              )}

            </div>

            {sizeRows.map((r, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <select
                  className="form-select"
                  value={r.size}
                  onChange={e => setSizeRow(i, "size", e.target.value)}
                  disabled={saving}
                >
                  <option value="">--size--</option>
                  {getSizeOptions().map(s => (
                    <option key={s.value} value={s.value}>
                      {s.name}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>

                <input
                  type="number"
                  className="form-control"
                  style={{ width: 110 }}
                  value={r.quantity}
                  min={0}
                  onChange={e =>
                    setSizeRow(i, "quantity", Number(e.target.value || 0))
                  }
                  disabled={saving}
                />

                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeSizeRow(i)}
                  disabled={saving || sizeRows.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mb-2">
            <label className="form-label">Total Quantity (computed)</label>
            <input className="form-control" value={totalQuantity} readOnly />
          </div>

          <div className="mb-2">
            <label className="form-label">Color</label>
            <select
              className="form-select"
              value={product.color ?? ""}
              onChange={e => setField("color", e.target.value)}
              disabled={saving}
            >
              <option value="">-- color --</option>
              {allColors.map(({ name, value }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Material</label>
            <select
              className="form-select"
              value={product.material ?? ""}
              onChange={e => setField("material", e.target.value)}
              disabled={saving}
            >
              <option value="">-- material --</option>
              {allMaterials.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={product.desc ?? ""}
              onChange={e => setField("desc", e.target.value)}
              disabled={saving}
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={onSave}
              disabled={saving || !(product.name && product.category)}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
