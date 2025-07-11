import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, uploadImage } from "../../features/api/postActions.tsx"
import { baseUrlBlog, categories } from "../../utils/constants.ts"
import { ProductT } from "../../utils/types.ts"
import { useAppSelector } from "../../app/hooks.ts"
import { ProductsContext } from "../../utils/context.ts"

const EditProduct = (
) => {
  const { id = "" } = useParams()
  const [product, setProduct] = useState<ProductT>({} as ProductT)
  const token = useAppSelector(state => state.token)
  const navigate = useNavigate()
  const { language } = useContext(ProductsContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof ProductT, value: any) => {
    setProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${baseUrlBlog}/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error("Failed to update product")
      navigate(-1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getPostById(id)
      .then(setProduct)
      .catch(() => setError("Failed to load product"))
  }, [id])

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true)
      const url = await uploadImage(file, token)
      handleChange("imageUrl", url)
    } catch {
      setError("Failed to upload image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        {language === "Armenian"
          ? "Խմբագրել ապրանքը"
          : language === "Russian"
            ? "Редактировать товар"
            : "Edit Product"}
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mb-3 rounded"
              style={{ width: "100%", objectFit: "cover", maxHeight: 300 }}
            />
          )}
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
            }}
            disabled={loading}
          />
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Ապրանքի անվանում"
                : language === "Russian"
                  ? "Название товара"
                  : "Product Name"}
            </label>
            <input
              className="form-control"
              value={product.name || ""}
              onChange={e => handleChange("name", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Կատեգորիա"
                : language === "Russian"
                  ? "Категория"
                  : "Category"}
            </label>
            <select
              className="form-select"
              value={product.category || ""}
              onChange={e => handleChange("category", e.target.value)}
              disabled={loading}
            >
              <option value="">
                {language === "Armenian"
                  ? "Ընտրել կատեգորիան"
                  : language === "Russian"
                    ? "Выберите категорию"
                    : "Select category"}
              </option>
              {categories(language).map(cat => (
                <option key={cat.title} value={cat.route}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Տեսակ"
                : language === "Russian"
                  ? "Тип"
                  : "Type"}
            </label>
            <select
              className="form-select"
              value={product.type || ""}
              onChange={e => handleChange("type", e.target.value)}
              disabled={loading}
            >
              <option value="">
                {language === "Armenian"
                  ? "Ընտրել տեսակը"
                  : language === "Russian"
                    ? "Выберите тип"
                    : "Select type"}
              </option>
              {categories(language)
                .filter(cat => cat.route === product.category)
                .flatMap(cat => cat.types || [])
                .map(cat => (
                  <option key={cat.title} value={cat.route}>
                    {cat.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Քանակ"
                : language === "Russian"
                  ? "Количество"
                  : "Quantity"}
            </label>
            <input
              type="number"
              className="form-control"
              value={product.quantity || 0}
              onChange={e => handleChange("quantity", Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Գնել գնով"
                : language === "Russian"
                  ? "Цена закупки"
                  : "Buy Price"}
            </label>
            <input
              type="number"
              className="form-control"
              value={product.buy || 0}
              onChange={e => handleChange("buy", Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Վաճառել գնով"
                : language === "Russian"
                  ? "Цена продажи"
                  : "Sell Price"}
            </label>
            <input
              type="number"
              className="form-control"
              value={product.sell || 0}
              onChange={e => handleChange("sell", Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {language === "Armenian"
                ? "Նկարագրություն"
                : language === "Russian"
                  ? "Описание"
                  : "Description"}
            </label>
            <textarea
              className="form-control"
              rows={3}
              value={product.desc || ""}
              onChange={e => handleChange("desc", e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleSave}
            disabled={loading}
          >
            {loading
              ? language === "Armenian"
                ? "Պահպանում..."
                : language === "Russian"
                  ? "Сохранение..."
                  : "Saving..."
              : language === "Armenian"
                ? "Պահպանել փոփոխությունները"
                : language === "Russian"
                  ? "Сохранить изменения"
                  : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
