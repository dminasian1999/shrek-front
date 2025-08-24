import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductT } from "../../utils/types.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { ProductsContext } from "../../utils/context.ts";
import { allMaterials, baseUrlBlog, collections, sizeOptions } from "../../utils/constants.ts"

const exampleColors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Purple", value: "purple" },
  { name: "Brown", value: "brown" },
  { name: "Gray", value: "gray" },
  { name: "Beige", value: "beige" },
  { name: "Pink", value: "pink" },
  { name: "Gold", value: "gold" },
  { name: "Silver", value: "silver" },
  { name: "Ivory", value: "ivory" },
  { name: "Cyan", value: "cyan" },
  { name: "Teal", value: "teal" },
  { name: "Olive", value: "olive" },
  { name: "Maroon", value: "maroon" },
  { name: "Navy", value: "navy" },
  { name: "Turquoise", value: "turquoise" },
  { name: "Coral", value: "coral" },
  { name: "Lavender", value: "lavender" },
  { name: "Mint", value: "mintcream" },
  { name: "Charcoal", value: "#36454F" },
  { name: "Sand", value: "#C2B280" },
  { name: "Other", value: "other" },
];

const EditProduct: React.FC = () => {
  const token = useAppSelector((state) => state.token);
  const { id = "" } = useParams();
  const [product, setProduct] = useState<ProductT>({
    id: undefined,
    name: "",
    imageUrls: [],
    quantity: 0,
    price: 0,
    category: "",
    weight: 0,
    size: "",
    color: "",
    material: "",
    desc: "",
    dateCreated: undefined,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load product data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${baseUrlBlog}/post/${id}`, {
      headers: { Authorization: token },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.imageUrls?.[0] || null);
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id, token]);

  // Handle input changes
  const handleChange = (field: keyof ProductT) => (e: any) => {
    const value =
      e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value;
    setProduct((prev) => ({ ...prev, [field]: value }));
  };


  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({ ...prev, color: e.target.value }));
  };

  // Add new images for upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setProduct((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...newPreviews],
    }));
  };

  // Remove image (existing or new)
  const handleRemoveImage = (url: string) => {
    setProduct((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((img) => img !== url),
    }));

    setImageFiles((prev) =>
      prev.filter((file) => URL.createObjectURL(file) !== url)
    );

    if (selectedImage === url) {
      setSelectedImage(null);
    }
  };

  // Upload images that are new files (imageFiles)
  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of imageFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
        method: "POST",
        headers: { Authorization: token },
        body: fd,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const text = await res.text();
      const url = (() => {
        try {
          return JSON.parse(text).url || text.trim();
        } catch {
          return text.trim();
        }
      })();
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      let finalImageUrls = product.imageUrls.filter(
        (url) => !url.startsWith("blob:")
      );
      if (imageFiles.length) {
        const uploadedUrls = await uploadImages();
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }

      const toPost = { ...product, imageUrls: finalImageUrls };

      const res = await fetch(`${baseUrlBlog}/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(toPost),
      });

      if (!res.ok) throw new Error("Failed to save product");
      alert("Product updated successfully.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error saving product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container-fluid p-0">
      <div className="row">
        {/* Left: images */}
        <div className="col-md-6">
          <div
            className="border rounded mb-3 text-center"
            style={{ height: 350 }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="object-fit-cover w-100 h-100"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div className="text-muted pt-5">No image selected</div>
            )}
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {product.imageUrls.map((url, idx) => (
              <div
                key={idx}
                style={{ position: "relative", width: 70, height: 70 }}
              >
                <img
                  src={url}
                  alt={`thumb-${idx}`}
                  className={`border rounded ${
                    selectedImage === url ? "border-primary border-2" : ""
                  }`}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(url)}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  style={{ padding: "0 5px", lineHeight: 1 }}
                  onClick={() => handleRemoveImage(url)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={saving}
              className="form-control"
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="col-md-6">
          <h2>Edit Product</h2>

          <div className="mb-3">
            <label className="form-label">ID</label>
            <input
              className="form-control"
              value={product.id || ""}
              disabled
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date Created</label>
            <input
              className="form-control"
              value={
                product.dateCreated
                  ? new Date(product.dateCreated).toLocaleString()
                  : ""
              }
              disabled
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={product.name}
              onChange={handleChange("name")}
              disabled={saving}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleChange("category")}
              disabled={saving}
            >
              <option value="">-- Category --</option>
              {collections.map((cat) => (
                <option key={cat.route} value={cat.route}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Wight</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={product.weight}
              onChange={handleChange("weight")}
              disabled={saving}
            />
          </div>
          {/* Size */}

          <div className="col-md-6">
            <label className="form-label">Size</label>
            <select
              className="form-select"
              value={product.size || ""}
              onChange={handleChange("size")}
              disabled={saving}
            >
              <option value="">-- Size --</option>
              {sizeOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.name}
                </option>
              ))}
            </select>
            {product.size === "custom" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="e.g., 10×15 cm or 20 cm diameter"
                value={product.size || "" as any}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, customSizeText: e.target.value as any }))
                }
                disabled={saving}
              />
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={product.quantity}
              onChange={handleChange("quantity")}
              disabled={saving}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={product.price}
              onChange={handleChange("price")}
              disabled={saving}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Color</label>
            <select
              className="form-select"
              value={product.color}
              onChange={handleColorChange}
              disabled={saving}
            >
              <option value="">-- Color --</option>
              {exampleColors.map(({ name, value }) => (
                <option
                  key={value}
                  value={value}
                  style={{
                    backgroundColor: value,
                    color: value === "black" || value === "#36454F" ? "white" : "black",
                  }}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Material</label>
            <select
              className="form-select"
              value={product.material || ""}
              onChange={handleChange("material")}
              disabled={saving}
            >
              <option value="">-- Material --</option>
              {allMaterials.map((m) => (
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
              value={product.desc}
              onChange={handleChange("desc")}
              disabled={saving}
            />
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={saving || !product.name || !product.category}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Save...
                </>
              ) : (
                <>
                  <i className="fa fa-save me-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
