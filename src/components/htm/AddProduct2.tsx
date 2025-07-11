// import React, { ChangeEvent, useState } from "react"
// import { useAppSelector } from "../../app/hooks.ts"
// import { baseUrlBlog, categories } from "../../utils/constants.ts"
//
// interface ProductRow {
//   name: string
//   imageUrl: string
//   quantity: number
//   sell: number
//   buy: number
//   profit: number
//   amount: number
//   imageFile: File | null
//   category: string
//   type: string
//   desc: string
// }
//
// const emptyRow = (): ProductRow => ({
//   name: "",
//   quantity: 0,
//   buy: 0,
//   sell: 0,
//   profit: 0,
//   amount: 0,
//   imageFile: null,
//   imageUrl: "",
//   category: "",
//   type: "",
//   desc: "",
// })
//
// const AddProduct2: React.FC = () => {
//   const [rows, setRows] = useState<ProductRow[]>([])
//   const [saving, setSaving] = useState(false)
//
//   const user = useAppSelector(state => state.user.profile)
//   const token = useAppSelector(state => state.token)
//
//   const uploadImage = async (file: File, token: string): Promise<string> => {
//     const fd = new FormData()
//     fd.append("file", file)
//     const res = await fetch(`${baseUrlBlog}/post/file/upload`, {
//       method: "POST",
//       headers: { Authorization: token },
//       body: fd,
//     })
//     if (!res.ok) throw new Error("Image upload failed")
//     const text = await res.text()
//     try {
//       return JSON.parse(text).url
//     } catch {
//       return text.trim()
//     }
//   }
//
//   const postProduct = async (
//     product: Omit<ProductRow, "profit" | "amount" | "imageFile">,
//     userLogin: string,
//     token: string,
//   ) => {
//     const res = await fetch(`${baseUrlBlog}/post/${userLogin}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: token },
//       body: JSON.stringify(product),
//     })
//     if (!res.ok) throw new Error(`Save failed: ${product.name}`)
//   }
//
//   const handleChange =
//     (field: keyof Omit<ProductRow, "imageFile" | "imageUrl">, idx: number) =>
//     (e: ChangeEvent<HTMLInputElement>) => {
//       const value =
//         e.target.type === "number"
//           ? Number(e.target.value || "null")
//           : e.target.value
//       setRows(prev =>
//         prev.map((r, i) => {
//           if (i !== idx) return r
//           const updated = { ...r, [field]: value }
//           updated.amount = updated.quantity * updated.buy
//           updated.profit =
//             updated.buy > 0
//               ? ((updated.sell - updated.buy) / updated.buy) * 100
//               : 0
//           return updated
//         }),
//       )
//     }
//
//   const handleCategoryChange = (idx: number) => (e:any) => {
//     const value = e.target.value
//     setRows(prev =>
//       prev.map((r, i) => (i === idx ? { ...r, category: value } : r)),
//     )
//   }
//   const handleTypeChange =
//     (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
//       const value = e.target.value
//       setRows(prev =>
//         prev.map((r, i) => (i === idx ? { ...r, type: value } : r)),
//       )
//     }
//
//   const handleImageChange =
//     (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0] || null
//       const url = file ? URL.createObjectURL(file) : ""
//       setRows(prev =>
//         prev.map((r, i) =>
//           i === idx ? { ...r, imageFile: file, imageUrl: url } : r,
//         ),
//       )
//     }
//
//   const addRow = () => setRows(prev => [...prev, emptyRow()])
//   const deleteRow = (idx: number) =>
//     setRows(prev => prev.filter((_, i) => i !== idx))
//
//   const totalCost = rows.reduce((sum, r) => sum + r.buy * r.quantity, 0)
//   const totalSells = rows.reduce((sum, r) => sum + r.sell * r.quantity, 0)
//   const totalIncome = totalSells - totalCost
//
//   const handleSave = async () => {
//     if (rows.length === 0) {
//       alert("No products to save.")
//       return
//     }
//     setSaving(true)
//     try {
//       for (const row of rows) {
//         let image = row.imageUrl
//         if (row.imageFile) {
//           image = await uploadImage(row.imageFile, token)
//         }
//         const toPost = {
//           name: row.name,
//           imageUrl: image,
//           quantity: row.quantity,
//           sell: row.sell,
//           buy: row.buy,
//           category: row.category,
//           type: row.type,
//           desc: row.desc,
//         }
//         await postProduct(toPost, user.login, token)
//       }
//       alert("All products saved!")
//       setRows([emptyRow()])
//     } catch (e) {
//       console.error(e)
//       alert("Error saving products.")
//     } finally {
//       setSaving(false)
//     }
//   }
//
//   return (
//     <>
//       <div className="accordion mb-2" id="accordionPanelsStayOpenExample">
//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingAddProduct">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#panelsStayOpen-collapseAddProduct"
//               aria-expanded="false"
//               aria-controls="panelsStayOpen-collapseAddProduct"
//             >
//               Add Product
//             </button>
//           </h2>
//           <div
//             id="panelsStayOpen-collapseAddProduct"
//             className="accordion-collapse collapse"
//             aria-labelledby="headingAddProduct"
//           >
//             <div className="accordion-body">
//               {/* DESKTOP TABLE */}
//               <div className="table-responsive d-none d-md-block">
//                 <table className="table table-hover align-middle">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Category</th>
//                       <th>Type</th>
//                       <th>Desc</th>
//                       <th>Qty</th>
//                       <th>Buy (₪)</th>
//                       <th>Sell (₪)</th>
//                       <th className="text-danger">Profit %</th>
//                       <th className="text-danger">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={10}
//                           className="text-center py-4 text-muted"
//                         >
//                           <i className="fa fa-box-open fa-2x mb-2 d-block" />
//                           No products added yet.
//                         </td>
//                       </tr>
//                     ) : (
//                       rows.map((row, idx) => (
//                         <tr key={idx}>
//                           <td className="text-center">
//                             {row.imageUrl && (
//                               <img
//                                 src={row.imageUrl}
//                                 alt="preview"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   objectFit: "cover",
//                                 }}
//                                 className="mb-1 rounded"
//                               />
//                             )}
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={handleImageChange(idx)}
//                               className="form-control form-control-sm mt-1"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={row.name}
//                               onChange={handleChange("name", idx)}
//                             />
//                           </td>
//                           <td>
//                             <select
//                               className="form-select "
//                               value={row.category}
//                               onChange={handleCategoryChange(idx)}
//                               disabled={saving}
//                             >
//                               <option value="" disabled>
//                                 category
//                               </option>
//                               {categories.map(cat => (
//                                 <option key={cat.title} value={cat.route}>
//                                   {cat.title}
//                                 </option>
//                               ))}
//                             </select>
//                           </td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={row.type}
//                               onChange={handleTypeChange(idx)}
//                               disabled={saving}
//                             >
//                               <option value="" disabled>
//                                 type
//                               </option>
//                               {categories
//                                 .filter(cat => cat.route === row.category)
//                                 .flatMap(cat=>cat.types)
//                                 .map(cat => (
//                                   <option key={cat.title} value={cat.route}>
//                                     {cat.title}
//                                   </option>
//                                 ))}
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={row.desc}
//                               onChange={handleChange("desc", idx)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.quantity}
//                               onChange={handleChange("quantity", idx)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.buy}
//                               onChange={handleChange("buy", idx)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.sell}
//                               onChange={handleChange("sell", idx)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control bg-transparent"
//                               value={row.profit.toFixed(2)}
//                               readOnly
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex gap-2 align-items-center">
//                               <input
//                                 type="text"
//                                 className="form-control bg-transparent"
//                                 value={row.amount.toFixed(2)}
//                                 readOnly
//                               />
//                               <button
//                                 className="btn btn-outline-danger"
//                                 onClick={() => deleteRow(idx)}
//                               >
//                                 <i className="fa fa-trash" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                     {/* ADD ROW BUTTON ALWAYS VISIBLE ON DESKTOP */}
//                     <tr>
//                       <td colSpan={10} className="text-center">
//                         <button
//                           className="btn btn-outline-success mt-2"
//                           onClick={addRow}
//                         >
//                           <i className="fa fa-plus-circle me-2" /> Add New Row
//                         </button>
//                       </td>
//                     </tr>
//                     {rows.length > 0 && (
//                       <tr className="table-light">
//                         <td colSpan={8}></td>
//                         <td>
//                           <small className="text-muted d-block">
//                             Total Cost
//                           </small>
//                           <small className="text-muted d-block">
//                             Total Sell
//                           </small>
//                           <strong className="d-block text-primary">
//                             Income
//                           </strong>
//                         </td>
//                         <td>
//                           <small className="d-block">
//                             ${totalCost.toFixed(2)}
//                           </small>
//                           <small className="d-block">
//                             ${totalSells.toFixed(2)}
//                           </small>
//                           <strong className="d-block text-primary">
//                             ${totalIncome.toFixed(2)}
//                           </strong>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//
//               {/* MOBILE CARD VIEW */}
//               <div className="d-md-none">
//                 {rows.length === 0 ? (
//                   <div className="text-center py-4 text-muted">
//                     <i className="fa fa-box-open fa-2x mb-2 d-block" />
//                     No products added yet.
//                   </div>
//                 ) : (
//                   rows.map((row, idx) => (
//                     <div key={idx} className="card mb-3 shadow-sm">
//                       <div className="card-body">
//                         <div className="text-center mb-3">
//                           {row.imageUrl && (
//                             <img
//                               src={row.imageUrl}
//                               alt="preview"
//                               className="rounded mb-2"
//                               style={{
//                                 width: "80px",
//                                 height: "80px",
//                                 objectFit: "cover",
//                               }}
//                             />
//                           )}
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange(idx)}
//                             className="form-control form-control-sm"
//                           />
//                         </div>
//
//                         <div className="mb-2">
//                           <label className="form-label">Name</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             value={row.name}
//                             onChange={handleChange("name", idx)}
//                           />
//                         </div>
//
//                         <div className="mb-2">
//                           <label className="form-label">Category</label>
//                           <select
//                             className="form-select"
//                             value={row.category}
//                             // onChange={e => setRows([...rows, rows[idx]: { ...rows[idx], category: e.target.value }])}
//                             onChange={handleCategoryChange(idx)}
//                             disabled={saving}
//                           >
//                             <option value="" disabled>
//                               — Select —
//                             </option>
//                             {categories.map(cat => (
//                               <option key={cat.title} value={cat.route}>
//                                 {cat.title}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="mb-2">
//                           <label className="form-label">Type</label>
//                           <select
//                             className="form-select"
//                             value={row.type}
//                             onChange={handleTypeChange(idx)}
//                             disabled={saving}
//                           >
//                             <option value="" disabled>
//                               — Select —
//                             </option>
//                             {categories
//                               .filter(cat => cat.route === row.category)
//                               .flatMap(cat=>cat.types)
//                               .map(cat => (
//                                 <option key={cat.title} value={cat.route}>
//                                   {cat.title}
//                                 </option>
//                               ))}
//                           </select>
//                         </div>
//
//                         <div className="mb-2">
//                           <label className="form-label">Name</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             value={row.name}
//                             onChange={handleChange("name", idx)}
//                           />
//                         </div>
//
//                         <div className="mb-2">
//                           <label className="form-label">Quantity</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             value={row.quantity}
//                             onChange={handleChange("quantity", idx)}
//                           />
//                         </div>
//
//                         <div className="mb-2 row">
//                           <div className="col-6">
//                             <label className="form-label">Buy (₪)</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.buy}
//                               onChange={handleChange("buy", idx)}
//                             />
//                           </div>
//                           <div className="col-6">
//                             <label className="form-label">Sell (₪)</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.sell}
//                               onChange={handleChange("sell", idx)}
//                             />
//                           </div>
//                         </div>
//
//                         <div className="mb-2 row">
//                           <div className="col-6">
//                             <label className="form-label">Profit (%)</label>
//                             <input
//                               type="text"
//                               className="form-control bg-transparent"
//                               value={row.profit.toFixed(2)}
//                               readOnly
//                             />
//                           </div>
//                           <div className="col-6">
//                             <label className="form-label">Amount (₪)</label>
//                             <input
//                               type="text"
//                               className="form-control bg-transparent"
//                               value={row.amount.toFixed(2)}
//                               readOnly
//                             />
//                           </div>
//                         </div>
//
//                         <div className="text-end">
//                           <button
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => deleteRow(idx)}
//                           >
//                             <i className="fa fa-trash" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//
//                 <button
//                   className="btn btn-outline-success w-100 mb-3"
//                   onClick={addRow}
//                 >
//                   <i className="fa fa-plus-circle me-2" /> Add New Row
//                 </button>
//
//                 {rows.length > 0 && (
//                   <div className="bg-light p-3 rounded text-end">
//                     <div>
//                       Total Cost: <strong>{`₪${totalCost.toFixed(2)}`}</strong>
//                     </div>
//                     <div>
//                       Total Sell: <strong>{`₪${totalSells.toFixed(2)}`}</strong>
//                     </div>
//                     <div>
//                       Income:{" "}
//                       <strong className="text-primary">{`₪${totalIncome.toFixed(2)}`}</strong>
//                     </div>
//                   </div>
//                 )}
//               </div>
//
//               {/* BOTTOM BUTTONS */}
//               <div className="d-grid d-md-flex justify-content-md-end mt-4 gap-2">
//                 <button
//                   className="btn btn-outline-secondary"
//                   onClick={() => window.history.back()}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSave}
//                   disabled={saving}
//                 >
//                   {saving ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <i className="fa fa-save me-2" />
//                       Add and Save
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
//
// export default AddProduct2
