import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks.ts";
import { ProductT, SizeQuantitiesT } from "../../utils/types.ts"
import {
  baseUrl,
  collections,
  sizeOptions,
  ringSizes,
  allMaterials,
} from "../../utils/constants.ts";

// Hardcoded English labels
const ENGLISH_LABELS = {
  title: "Add Product",
  name: "Name",
  category: "Category",
  subcategory: "Subcategory",
  color: "Color",
  desc: "Description",
  price: "Price",
  materials: "Material",
  image: "Images",
  save: "Save",
  cancel: "Cancel",
  weight: "Weight",
  size: "Size",
  sizesTitle: "Sizes / Quantities",
};

// Colors example
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

// Clothes sizes
const clothesSizes = [
  { value: "S", name: "Small (S)" },
  { value: "M", name: "Medium (M)" },
  { value: "L", name: "Large (L)" },
  { value: "XL", name: "Extra Large (XL)" },
  { value: "XXL", name: "Extra Extra Large (XXL)" },
];

// Empty product template (matches ProductT)
const emptyProduct: ProductT = {
  name: "",
  imageUrls: [],
  price: 0,
  category: "",
  subCategory: "",
  weight: 0,
  color: "",
  material: "",
  desc: "",
  sizeQuantities: [],
  // id and dateCreated are optional
};

// Dynamic size logic
const getSizeOptions = (category: string, subCategory: string) => {
  const cat = category?.toLowerCase() || "";
  const sub = subCategory?.toLowerCase() || "";
  if (sub === "rings") return ringSizes.map((r) => ({ value: r.size, name: r.size }));
  if (cat === "clothing") return clothesSizes;
  return sizeOptions;
};

type SizeRow = { size: string; quantity: number };

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<ProductT>(emptyProduct);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [sizeRows, setSizeRows] = useState<SizeRow[]>([]);
  const user = useAppSelector((state) => state.user.profile);
  const token = useAppSelector((state) => state.token);

  const labels = ENGLISH_LABELS;

  // keep product.sizeQuantities in sync with sizeRows
  useEffect(() => {
    if (sizeRows.length === 0) {
      // don't overwrite existing sizeQuantities if user clears rows intentionally
      setProduct(prev => ({ ...prev, sizeQuantities: [] }));
      return;
    }
    const mapped: SizeQuantitiesT[] = sizeRows.map(r => ({ size: r.size, quantity: Number(r.quantity || 0) }));
    setProduct(prev => ({ ...prev, sizeQuantities: mapped }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeRows]);

  // Generic field change
  const handleChange = (field: keyof ProductT) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setProduct((prev) => ({ ...prev, [field]: value } as ProductT));
  };

  // Color select
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({ ...prev, color: e.target.value }));
  };

  // Image select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setProduct((prev) => ({ ...prev, imageUrls: urls }));
  };

  // Upload images
  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of imageFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${baseUrl}/post/file/upload`, {
        method: "POST",
        headers: { Authorization: token },
        body: fd,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const text = await res.text();
      const url = (() => {
        try {
          return JSON.parse(text).url || JSON.parse(text).fileUrl || text.trim();
        } catch {
          return text.trim();
        }
      })();
      urls.push(url);
    }
    return urls;
  };

  // Size rows handlers
  const addSizeRow = () => setSizeRows(prev => [...prev, { size: "", quantity: 0 }]);
  const removeSizeRow = (idx: number) => setSizeRows(prev => prev.filter((_, i) => i !== idx));
  const changeSizeRow = (idx: number, field: keyof SizeRow) => (e: any) => {
    const value = field === "quantity" ? Number(e.target.value || 0) : e.target.value;
    setSizeRows(prev => prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  // Submit handler
  const handleSubmit = async () => {
    // Validate
    if (!product.name || !product.category || product.price <= 0) {
      alert("Please fill in required fields (Name, Category, Price).");
      return;
    }

    // If sizes present, ensure each has valid data
    if (sizeRows.length > 0) {
      const invalid = sizeRows.some(r => !r.size || r.quantity <= 0);
      if (invalid) {
        alert("Please fill all sizes and set quantity > 0 for each size row.");
        return;
      }
    } else {
      // If user didn't add size rows, require at least one sizeQuantities entry (fits your ProductT)
      if (!product.sizeQuantities || product.sizeQuantities.length === 0) {
        alert("Please add at least one size / quantity row.");
        return;
      }
      // validate sizeQuantities entries
      const invalid = product.sizeQuantities.some(sq => !sq.size || sq.quantity <= 0);
      if (invalid) {
        alert("Please make sure sizeQuantities entries are valid and quantity > 0.");
        return;
      }
    }

    setSaving(true);
    try {
      const uploadedUrls = await uploadImages();
      const toPost: any = {
        ...product,
        imageUrls: uploadedUrls,
        // sizeQuantities already synced in product via useEffect
      };
      const res = await fetch(`${baseUrl}/post/${user.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(toPost),
      });
      if (!res.ok) throw new Error(`Failed to save product: ${res.statusText}`);
      alert("Product added successfully!");
      setProduct(emptyProduct);
      setImageFiles([]);
      setSizeRows([]);
    } catch (e: any) {
      alert(`Error saving product: ${e.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const availableSizes = getSizeOptions(product.category, product.subCategory || "");

  // helper: total quantity (sum of sizeQuantities) for display
  const totalQuantity = product.sizeQuantities?.reduce((s, q) => s + Number(q.quantity || 0), 0) ?? 0;

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">{labels.title}</h3>
      <div className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">{labels.name}</label>
          <input className="form-control" value={product.name} onChange={handleChange("name")} disabled={saving} />
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label">{labels.category}</label>
          <select className="form-select" value={product.category} onChange={handleChange("category")} disabled={saving}>
            <option value="">-- {labels.category} --</option>
            {collections.map((cat) => (
              <option key={cat.route} value={cat.route}>{cat.title}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {product.category && (
          <div className="col-md-6 offset-md-6">
            <label className="form-label">{labels.subcategory}</label>
            <select className="form-select" value={product.subCategory || ""} onChange={handleChange("subCategory")} disabled={saving}>
              <option value="">-- {labels.subcategory} --</option>
              {collections.find(c => c.route === product.category)?.subCategory?.map(sub => (
                <option key={sub.route} value={sub.route}>{sub.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Weight */}
        <div className="col-md-4">
          <label className="form-label">{labels.weight}</label>
          <input type="number" min={0} className="form-control" value={product.weight || ""} onChange={handleChange("weight")} disabled={saving} />
        </div>

        {/* Price */}
        <div className="col-md-4">
          <label className="form-label">{labels.price}</label>
          <input type="number" min={0} className="form-control" value={product.price || ""} onChange={handleChange("price")} disabled={saving} />
        </div>

        {/* Color */}
        <div className="col-md-4">
          <label className="form-label">{labels.color}</label>
          <select className="form-select" value={product.color} onChange={handleColorChange} disabled={saving}>
            <option value="">-- {labels.color} --</option>
            {exampleColors.map(c => (
              <option key={c.value} value={c.value} style={{ backgroundColor: c.value, color: c.value === "black" || c.value === "#36454F" ? "white" : "black" }}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div className="col-md-4">
          <label className="form-label">{labels.materials}</label>
          <select className="form-select" value={product.material || ""} onChange={handleChange("material")} disabled={saving}>
            <option value="">-- {labels.materials} --</option>
            {allMaterials.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* Sizes — multi-row UI */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label mb-0">{labels.sizesTitle}</label>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">Total: {totalQuantity}</small>
              <button className="btn btn-sm btn-outline-success" type="button" onClick={addSizeRow} disabled={saving}>
                <i className="fa fa-plus me-1" /> Add Size Row
              </button>
            </div>
          </div>

          {sizeRows.length === 0 && <div className="text-muted mb-2">No size rows — add them if you want variant-level quantities.</div>}

          {/* Desktop table */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-sm">
              <thead className="table-light">
              <tr>
                <th style={{ width: "60%" }}>Size</th>
                <th style={{ width: "25%" }}>Quantity</th>
                <th style={{ width: "15%" }} />
              </tr>
              </thead>
              <tbody>
              {sizeRows.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <select className="form-select" value={r.size} onChange={changeSizeRow(idx, "size")} disabled={saving}>
                      <option value="">-- Select size --</option>
                      {availableSizes.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
                      <option value="custom">Custom</option>
                    </select>
                    {r.size === "custom" && (
                      <input className="form-control mt-1" placeholder="Custom size (e.g., 10×15 cm or US 9)" value={r.size === "custom" ? "" : r.size} onChange={changeSizeRow(idx, "size")} disabled={saving} />
                    )}
                  </td>
                  <td>
                    <input type="number" min={0} className="form-control" value={r.quantity} onChange={changeSizeRow(idx, "quantity")} disabled={saving} />
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeSizeRow(idx)} disabled={saving}>
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="d-md-none">
            {sizeRows.map((r, idx) => (
              <div className="card mb-2" key={idx}>
                <div className="card-body p-2">
                  <div className="mb-2">
                    <select className="form-select" value={r.size} onChange={changeSizeRow(idx, "size")} disabled={saving}>
                      <option value="">-- Select size --</option>
                      {availableSizes.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <input type="number" min={0} className="form-control" value={r.quantity} onChange={changeSizeRow(idx, "quantity")} disabled={saving} />
                  </div>
                  <div className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeSizeRow(idx)} disabled={saving}>
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="col-12">
          <label className="form-label">{labels.image}</label>
          <input type="file" multiple accept="image/*" className="form-control" onChange={handleImageChange} disabled={saving} />
          <div className="d-flex flex-wrap gap-2 mt-2">
            {product.imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`preview-${idx}`} style={{ width: 80, height: 80, objectFit: "cover" }} className="rounded border" />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label">{labels.desc}</label>
          <textarea className="form-control" rows={3} value={product.desc} onChange={handleChange("desc")} disabled={saving} />
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-outline-secondary" onClick={() => window.history.back()} disabled={saving}>{labels.cancel}</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving || !product.name || !product.category}>
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />{labels.save}...
              </>
            ) : (
              <>
                <i className="fa fa-save me-2" />{labels.save}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
