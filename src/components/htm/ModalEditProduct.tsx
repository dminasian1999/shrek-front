const ModalEditProduct = () => {
  return (
    <div/>
    // <div>
    //   <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    //     Launch static backdrop modal
    //   </button>
    //
    //   <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //
    //           <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Product</h1>
    //           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="mb-3 text-center">
    //             {product.imageUrl && (
    //               <img
    //                 src={product.imageUrl}
    //                 alt={product.name}
    //                 className="rounded mb-2"
    //                 style={{ width: 80, height: 80, objectFit: "cover" }}
    //               />
    //             )}
    //             <label className="form-label d-block">
    //               Product Image
    //               <input
    //                 type="file"
    //                 accept="image/*"
    //                 onChange={handleImageChange}
    //                 className="form-control form-control-sm mt-1"
    //               />
    //             </label>
    //           </div>
    //
    //           <div className="mb-2">
    //             <label className="form-label">
    //               Product Name
    //               <input
    //                 className="form-control mt-1"
    //                 placeholder="Product Name"
    //                 value={product.name}
    //                 onChange={(e) => handleChange("name", e.target.value)}
    //               />
    //             </label>
    //           </div>
    //           <div className="mb-2">
    //             <label className="form-label">
    //               Category
    //               <select
    //                 className="form-select mt-1"
    //                 value={product.category}
    //                 onChange={(e) => handleChange("category", e.target.value)}
    //               >
    //                 <option value="">Select category</option>
    //                 {categories.map((cat) => (
    //                   <option key={cat.title} value={cat.route}>
    //                     {cat.title}
    //                   </option>
    //                 ))}
    //               </select>
    //             </label>
    //           </div>
    //           <div className="row g-2">
    //             <div className="col">
    //               <label className="form-label w-100">
    //                 Quantity
    //                 <input
    //                   type="number"
    //                   className="form-control mt-1"
    //                   placeholder="Quantity"
    //                   value={product.quantity}
    //                   onChange={(e) => handleChange("quantity", Number(e.target.value))}
    //                 />
    //               </label>
    //             </div>
    //             <div className="col">
    //               <label className="form-label w-100">
    //                 Buy Price
    //                 <input
    //                   type="number"
    //                   className="form-control mt-1"
    //                   placeholder="Buy Price"
    //                   value={product.buy}
    //                   onChange={(e) => handleChange("buy", Number(e.target.value))}
    //                 />
    //               </label>
    //             </div>
    //             <div className="col">
    //               <label className="form-label w-100">
    //                 Sell Price
    //                 <input
    //                   type="number"
    //                   className="form-control mt-1"
    //                   placeholder="Sell Price"
    //                   value={product.sell}
    //                   onChange={(e) => handleChange("sell", Number(e.target.value))}
    //                 />
    //               </label>
    //             </div>
    //           </div>
    //         </div>
    //
    //         <div className="modal-footer">
    //           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //           <button type="button" className="btn btn-primary">Understood</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ModalEditProduct
