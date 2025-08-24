import React, { useContext, useState } from "react";
import { ProductsContext } from "../../utils/context.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { ProductT } from "../../utils/types.ts";
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

const emptyProduct: ProductT = {
  name: "",
  imageUrls: [],
  quantity: 0,
  price: 0,
  category: "",
  weight: 0,
  size: "",
  color: "",
  material:"", // We'll still store it as an array, but only use one string
  desc: "",
};


const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<ProductT>(emptyProduct);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const { language } = useContext(ProductsContext);
  const user = useAppSelector((state) => state.user.profile);
  const token = useAppSelector((state) => state.token);

  const labels = {
    title:
      language === "Armenian"
        ? "Ավելացնել ապրանք"
        : language === "Russian"
          ? "Добавить продукт"
          : "Add Product",
    name: language === "Armenian" ? "Անուն" : language === "Russian" ? "Название" : "Name",
    category:
      language === "Armenian" ? "Կատեգորիա" : language === "Russian" ? "Категория" : "Category",
    color: language === "Armenian" ? "Գույն" : language === "Russian" ? "Цвет" : "Color",
    desc: language === "Armenian" ? "Նկարագրություն" : language === "Russian" ? "Описание" : "Description",
    quantity:
      language === "Armenian" ? "Քանակ" : language === "Russian" ? "Количество" : "Quantity",
    price: language === "Armenian" ? "Գին" : language === "Russian" ? "Цена" : "Price",
    materials:
      language === "Armenian" ? "Նյութ" : language === "Russian" ? "Материал" : "Material",
    image: language === "Armenian" ? "Նկարներ" : language === "Russian" ? "Изображения" : "Images",
    save: language === "Armenian" ? "Պահպանել" : language === "Russian" ? "Сохранить" : "Save",
    cancel: language === "Armenian" ? "Չեղարկել" : language === "Russian" ? "Отмена" : "Cancel",
  };

  const handleChange = (field: keyof ProductT) => (e: any) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setProduct((prev) => ({ ...prev, [field]: value }));
  };


  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({ ...prev, color: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setProduct((prev) => ({ ...prev, imageUrls: files.map((f) => URL.createObjectURL(f)) }));
  };

  const uploadImages = async () => {
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
    try {
      const imageUrls = await uploadImages();
      const toPost = { ...product, imageUrls };
      const res = await fetch(`${baseUrlBlog}/post/${user.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(toPost),
      });
      if (!res.ok) throw new Error("Failed to save product");
      alert("Product added successfully.");
      setProduct(emptyProduct);
      setImageFiles([]);
    } catch (e) {
      console.error(e);
      alert("Error saving product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">{labels.title}</h3>
      <div className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">{labels.name}</label>
          <input
            type="text"
            className="form-control"
            value={product.name}
            onChange={handleChange("name")}
            disabled={saving}
          />
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label">{labels.category}</label>
          <select
            className="form-select"
            value={product.category}
            onChange={handleChange("category")}
            disabled={saving}
          >
            <option value="">-- {labels.category} --</option>
            {collections.map((cat) => (
              <option key={cat.route} value={cat.route}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Wight */}
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

          {/* Optional custom size input */}
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

        {/* Quantity */}
        <div className="col-md-4">
          <label className="form-label">{labels.quantity}</label>
          <input
            type="number"
            min={0}
            className="form-control"
            value={product.quantity}
            onChange={handleChange("quantity")}
            disabled={saving}
          />
        </div>

        {/* Price */}
        <div className="col-md-4">
          <label className="form-label">{labels.price}</label>
          <input
            type="number"
            min={0}
            className="form-control"
            value={product.price}
            onChange={handleChange("price")}
            disabled={saving}
          />
        </div>

        {/* Color */}
        <div className="col-md-4">
          <label className="form-label">{labels.color}</label>
          <select
            className="form-select"
            value={product.color}
            onChange={handleColorChange}
            disabled={saving}
          >
            <option value="">-- {labels.color} --</option>
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

        {/* Material (Single Select) */}
        <div className="col-md-6">
          <label className="form-label">{labels.materials}</label>
          <select
            className="form-select"
            value={product.material || ""}
            onChange={handleChange("material")}
            disabled={saving}
          >
            <option value="">-- {labels.materials} --</option>
            {allMaterials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Images */}
        <div className="col-md-6">
          <label className="form-label">{labels.image}</label>
          <input
            type="file"
            multiple
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            disabled={saving}
          />
          <div className="d-flex flex-wrap gap-2 mt-2">
            {product.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="preview"
                style={{ width: 80, height: 80, objectFit: "cover" }}
                className="rounded border"
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label">{labels.desc}</label>
          <textarea
            className="form-control"
            rows={3}
            value={product.desc}
            onChange={handleChange("desc")}
            disabled={saving}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => window.history.back()}
            disabled={saving}
          >
            {labels.cancel}
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving || !product.name || !product.category}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                {labels.save}...
              </>
            ) : (
              <>
                <i className="fa fa-save me-2" />
                {labels.save}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
