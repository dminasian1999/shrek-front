import React, { ChangeEvent, useContext, useState } from "react"
import { useAppSelector } from "../../app/hooks.ts"
import { baseUrlBlog, categories } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

interface ProductRow {
  name: string
  imageUrl: string
  quantity: number
  sell: number
  buy: number
  profit: number
  amount: number
  imageFile: File | null
  category: string
  type: string
  desc: string
}

const emptyRow = (): ProductRow => ({
  name: "",
  quantity: 0,
  buy: 0,
  sell: 0,
  profit: 0,
  amount: 0,
  imageFile: null,
  imageUrl: "",
  category: "",
  type: "",
  desc: "",
})

const AddProduct: React.FC = () => {
  const [rows, setRows] = useState<ProductRow[]>([])
  const [saving, setSaving] = useState(false)
  const { language } = useContext(ProductsContext)
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)

  // Localization labels
  const labels = {
    addProduct:
      language === "Armenian"
        ? "Ավելացնել ապրանք"
        : language === "Russian"
          ? "Добавить продукт"
          : "Add Product",
    addRow:
      language === "Armenian"
        ? "Ավելացնել տող"
        : language === "Russian"
          ? "Добавить строку"
          : "Add New Row",
    cancel:
      language === "Armenian"
        ? "Չեղարկել"
        : language === "Russian"
          ? "Отмена"
          : "Cancel",
    saving:
      language === "Armenian"
        ? "Պահպանում..."
        : language === "Russian"
          ? "Сохранение..."
          : "Saving...",
    save:
      language === "Armenian"
        ? "Ավելացնել և պահպանել"
        : language === "Russian"
          ? "Добавить и сохранить"
          : "Add and Save",
    noProducts:
      language === "Armenian"
        ? "Ապրանքներ ավելացված չեն"
        : language === "Russian"
          ? "Нет добавленных продуктов"
          : "No products added yet.",
    totalCost:
      language === "Armenian"
        ? "Ընդհանուր ծախս"
        : language === "Russian"
          ? "Общая стоимость"
          : "Total Cost",
    totalSell:
      language === "Armenian"
        ? "Ընդհանուր վաճառք"
        : language === "Russian"
          ? "Общая выручка"
          : "Total Sell",
    income:
      language === "Armenian"
        ? "Եկամուտ"
        : language === "Russian"
          ? "Доход"
          : "Income",
  }

  const fieldLabels = {
    name:
      language === "Armenian"
        ? "Անուն"
        : language === "Russian"
          ? "Название"
          : "Name",
    desc:
      language === "Armenian"
        ? "Նկարագրություն"
        : language === "Russian"
          ? "Описание"
          : "Desc",
    category:
      language === "Armenian"
        ? "Կատեգորիա"
        : language === "Russian"
          ? "Категория"
          : "Category",
    type:
      language === "Armenian"
        ? "Տեսակ"
        : language === "Russian"
          ? "Тип"
          : "Type",
    quantity:
      language === "Armenian"
        ? "Քանակ"
        : language === "Russian"
          ? "Количество"
          : "Quantity",
    buy:
      language === "Armenian"
        ? "Գնման արժեք (֏)"
        : language === "Russian"
          ? "Закупочная цена (֏)"
          : "Buy (֏)",
    sell:
      language === "Armenian"
        ? "Վաճառքի արժեք (֏)"
        : language === "Russian"
          ? "Цена продажи (֏)"
          : "Sell (֏)",
    profit:
      language === "Armenian"
        ? "Շահույթ (%)"
        : language === "Russian"
          ? "Прибыль (%)"
          : "Profit (%)",
    amount:
      language === "Armenian"
        ? "Գումար (֏)"
        : language === "Russian"
          ? "Сумма (֏)"
          : "Amount (֏)",
  }

  // Upload image to backend, return image URL
  const uploadImage = async (file: File, token: string): Promise<string> => {
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
      method: "POST",
      headers: { Authorization: token },
      body: fd,
    })
    if (!res.ok) throw new Error("Image upload failed")
    const text = await res.text()
    try {
      return JSON.parse(text).url
    } catch {
      return text.trim()
    }
  }

  // Post product to backend
  const postProduct = async (
    product: Omit<ProductRow, "profit" | "amount" | "imageFile">,
    userLogin: string,
    token: string,
  ) => {
    const res = await fetch(`${baseUrlBlog}/post/${userLogin}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error(`Save failed: ${product.name}`)
  }

  // Handle change for inputs except image and category/type select
  const handleChange =
    (field: keyof Omit<ProductRow, "imageFile" | "imageUrl">, idx: number) =>
      (e: any) => {
        const value =
          e.target.type === "number"
            ? Number(e.target.value || "0")
            : e.target.value
        setRows(prev =>
          prev.map((r, i) => {
            if (i !== idx) return r
            const updated = { ...r, [field]: value }
            updated.amount = updated.quantity * updated.buy
            updated.profit =
              updated.buy > 0
                ? ((updated.sell - updated.buy) / updated.buy) * 100
                : 0
            return updated
          }),
        )
      }

  // Category select change handler
  const handleCategoryChange = (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setRows(prev =>
      prev.map((r, i) => (i === idx ? { ...r, category: value, type: "" } : r)),
    )
  }

  // Type select change handler
  const handleTypeChange = (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setRows(prev =>
      prev.map((r, i) => (i === idx ? { ...r, type: value } : r)),
    )
  }

  // Image input change handler
  const handleImageChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    const url = file ? URL.createObjectURL(file) : ""
    setRows(prev =>
      prev.map((r, i) =>
        i === idx ? { ...r, imageFile: file, imageUrl: url } : r,
      ),
    )
  }

  // Add new empty row
  const addRow = () => setRows(prev => [...prev, emptyRow()])

  // Delete row by index
  const deleteRow = (idx: number) => setRows(prev => prev.filter((_, i) => i !== idx))

  // Totals for cost, sell, income
  const totalCost = rows.reduce((sum, r) => sum + r.buy * r.quantity, 0)
  const totalSells = rows.reduce((sum, r) => sum + r.sell * r.quantity, 0)
  const totalIncome = totalSells - totalCost

  // Validation: check if any row is invalid
  const hasInvalid = rows.some(
    r =>
      !r.name ||
      !r.category ||
      r.buy <= 0 ||
      r.quantity <= 0,
  )

  // Save all rows to backend
  const handleSave = async () => {
    if (rows.length === 0) {
      alert(labels.noProducts)
      return
    }
    if (hasInvalid) {
      alert("Please fill all required fields correctly in every product.")
      return
    }
    setSaving(true)
    try {
      for (const row of rows) {
        let image = row.imageUrl
        if (row.imageFile) {
          image = await uploadImage(row.imageFile, token)
        }
        const toPost = {
          name: row.name,
          imageUrl: image,
          quantity: row.quantity,
          sell: row.sell,
          buy: row.buy,
          category: row.category,
          type: row.type,
          desc: row.desc,
        }
        await postProduct(toPost, user.login, token)
      }
      alert("All products saved!")
      setRows([emptyRow()])
    } catch (e) {
      console.error(e)
      alert("Error saving products.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="accordion mb-2" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAddProduct">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseAddProduct"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseAddProduct"
            >
              {labels.addProduct}
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseAddProduct"
            className="accordion-collapse collapse"
            aria-labelledby="headingAddProduct"
          >
            <div className="accordion-body">
              {/* DESKTOP TABLE */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>{fieldLabels.name}</th>
                    <th>{fieldLabels.category}</th>
                    <th>{fieldLabels.type}</th>
                    <th>{fieldLabels.desc}</th>
                    <th>{fieldLabels.quantity}</th>
                    <th>{fieldLabels.buy}</th>
                    <th>{fieldLabels.sell}</th>
                    <th className="text-danger">{fieldLabels.profit}</th>
                    <th className="text-danger">{fieldLabels.amount}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-4 text-muted"
                      >
                        <i className="fa fa-box-open fa-2x mb-2 d-block" />
                        {labels.noProducts}
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="text-center">
                          {row.imageUrl && (
                            <img
                              src={row.imageUrl}
                              alt="preview"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                              className="mb-1 rounded"
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange(idx)}
                            className="form-control form-control-sm mt-1"
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.name}
                            onChange={handleChange("name", idx)}
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.category}
                            onChange={handleCategoryChange(idx)}
                            disabled={saving}
                          >
                            <option value="" disabled>
                              {fieldLabels.category}
                            </option>
                            {categories(language).map(cat => (
                              <option key={cat.title} value={cat.route}>
                                {cat.title}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.type}
                            onChange={handleTypeChange(idx)}
                            disabled={saving || !row.category}
                          >
                            <option value="" disabled>
                              {fieldLabels.type}
                            </option>
                            {categories(language)
                              .filter(cat => cat.route === row.category)
                              .flatMap(cat => cat.types)
                              .map(type => (
                                <option key={type.title} value={type.route}>
                                  {type.title}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.desc}
                            onChange={handleChange("desc", idx)}
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={row.quantity}
                            min={0}
                            onChange={handleChange("quantity", idx)}
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={row.buy}
                            min={0}
                            onChange={handleChange("buy", idx)}
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={row.sell}
                            min={0}
                            onChange={handleChange("sell", idx)}
                            disabled={saving}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            value={row.profit.toFixed(2)}
                            readOnly
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <input
                              type="text"
                              className="form-control bg-transparent"
                              value={row.amount.toFixed(2)}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteRow(idx)}
                              disabled={saving}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  {/* ADD ROW BUTTON ALWAYS VISIBLE ON DESKTOP */}
                  <tr>
                    <td colSpan={10} className="text-center">
                      <button
                        className="btn btn-outline-success mt-2"
                        onClick={addRow}
                        disabled={saving}
                      >
                        <i className="fa fa-plus-circle me-2" />
                        {labels.addRow}
                      </button>
                    </td>
                  </tr>
                  {rows.length > 0 && (
                    <tr className="table-light">
                      <td colSpan={8}></td>
                      <td>
                        <small className="text-muted d-block">
                          {labels.totalCost}
                        </small>
                        <small className="text-muted d-block">
                          {labels.totalSell}
                        </small>
                        <strong className="d-block text-primary">
                          {labels.income}
                        </strong>
                      </td>
                      <td>
                        <small className="d-block">
                          ֏{totalCost.toFixed(2)}
                        </small>
                        <small className="d-block">
                          ֏{totalSells.toFixed(2)}
                        </small>
                        <strong className="d-block text-primary">
                          ֏{totalIncome.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="d-md-none">
                {rows.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <i className="fa fa-box-open fa-2x mb-2 d-block" />
                    {labels.noProducts}
                  </div>
                ) : (
                  rows.map((row, idx) => (
                    <div key={idx} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <div className="text-center mb-3">
                          {row.imageUrl && (
                            <img
                              src={row.imageUrl}
                              alt="preview"
                              className="rounded mb-2"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange(idx)}
                            className="form-control form-control-sm"
                            disabled={saving}
                          />
                        </div>

                        <div className="mb-2">
                          <label className="form-label" htmlFor={`name-${idx}`}>
                            {fieldLabels.name}
                          </label>
                          <input
                            id={`name-${idx}`}
                            type="text"
                            className="form-control"
                            value={row.name}
                            onChange={handleChange("name", idx)}
                            disabled={saving}
                          />
                        </div>

                        <div className="mb-2">
                          <label className="form-label" htmlFor={`category-${idx}`}>
                            {fieldLabels.category}
                          </label>
                          <select
                            id={`category-${idx}`}
                            className="form-select"
                            value={row.category}
                            onChange={handleCategoryChange(idx)}
                            disabled={saving}
                          >
                            <option value="" disabled>
                              — {fieldLabels.category} —
                            </option>
                            {categories(language).map(cat => (
                              <option key={cat.title} value={cat.route}>
                                {cat.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-2">
                          <label className="form-label" htmlFor={`type-${idx}`}>
                            {fieldLabels.type}
                          </label>
                          <select
                            id={`type-${idx}`}
                            className="form-select"
                            value={row.type}
                            onChange={handleTypeChange(idx)}
                            disabled={saving || !row.category}
                          >
                            <option value="" disabled>
                              — {fieldLabels.type} —
                            </option>
                            {categories(language)
                              .filter(cat => cat.route === row.category)
                              .flatMap(cat => cat.types)
                              .map(type => (
                                <option key={type.title} value={type.route}>
                                  {type.title}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="mb-2">
                          <label className="form-label" htmlFor={`desc-${idx}`}>
                            {fieldLabels.desc}
                          </label>
                          <textarea
                            id={`desc-${idx}`}
                            className="form-control"
                            value={row.desc}
                            onChange={handleChange("desc", idx)}
                            disabled={saving}
                          />
                        </div>

                        <div className="mb-2">
                          <label className="form-label" htmlFor={`quantity-${idx}`}>
                            {fieldLabels.quantity}
                          </label>
                          <input
                            id={`quantity-${idx}`}
                            type="number"
                            className="form-control"
                            min={0}
                            value={row.quantity}
                            onChange={handleChange("quantity", idx)}
                            disabled={saving}
                          />
                        </div>

                        <div className="mb-2 row">
                          <div className="col-6">
                            <label className="form-label" htmlFor={`buy-${idx}`}>
                              {fieldLabels.buy}
                            </label>
                            <input
                              id={`buy-${idx}`}
                              type="number"
                              step="0.01"
                              className="form-control"
                              min={0}
                              value={row.buy}
                              onChange={handleChange("buy", idx)}
                              disabled={saving}
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label" htmlFor={`sell-${idx}`}>
                              {fieldLabels.sell}
                            </label>
                            <input
                              id={`sell-${idx}`}
                              type="number"
                              step="0.01"
                              className="form-control"
                              min={0}
                              value={row.sell}
                              onChange={handleChange("sell", idx)}
                              disabled={saving}
                            />
                          </div>
                        </div>

                        <div className="mb-2 row">
                          <div className="col-6">
                            <label className="form-label">{fieldLabels.profit}</label>
                            <input
                              type="text"
                              className="form-control bg-transparent"
                              value={row.profit.toFixed(2)}
                              readOnly
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label">{fieldLabels.amount}</label>
                            <input
                              type="text"
                              className="form-control bg-transparent"
                              value={row.amount.toFixed(2)}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteRow(idx)}
                            disabled={saving}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <button
                  className="btn btn-outline-success w-100 mb-3"
                  onClick={addRow}
                  disabled={saving}
                >
                  <i className="fa fa-plus-circle me-2" />
                  {labels.addRow}
                </button>

                {rows.length > 0 && (
                  <div className="bg-light p-3 rounded text-end">
                    <div>
                      {labels.totalCost}: <strong>{`֏${totalCost.toFixed(2)}`}</strong>
                    </div>
                    <div>
                      {labels.totalSell}: <strong>{`֏${totalSells.toFixed(2)}`}</strong>
                    </div>
                    <div>
                      {labels.income}:{" "}
                      <strong className="text-primary">{`֏${totalIncome.toFixed(2)}`}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM BUTTONS */}
              <div className="d-grid d-md-flex justify-content-md-end mt-4 gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => window.history.back()}
                  disabled={saving}
                >
                  {labels.cancel}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving || rows.length === 0}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      {labels.saving}
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
        </div>
      </div>
    </>
  )
}

export default AddProduct
