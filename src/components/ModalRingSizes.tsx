import React from "react"
import { ringSizes } from "../utils/constants.ts"

const ModalRingSizes = () => {
  const handleQuantityChange = (delta: number) => {
    const maxQty = selectedVariant
      ? selectedVariant.stock
      : (product?.quantity ?? 1)
    setQuantity(prev => Math.max(1, Math.min(prev + delta, maxQty || 1)))
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2000 }}
    >
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ maxWidth: 450 }}>
        <div className="modal-header border-bottom-0">
          <h5 className="modal-title">Select Size & Quantity</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsSizeModalOpen(false)}
          />
        </div>
        <div className="modal-body">
          <div className="d-flex flex-wrap gap-2 mb-3">
            {ringSizes.map(item => {
              const isSelected = selectedSize === item.size
              return (
                <label
                  key={item.size}
                  className={`btn flex-fill text-center rounded-3 border ${
                    isSelected ? "bg-primary text-white border-primary" : "btn-outline-primary"
                  }`}
                  style={{ minWidth: "70px", cursor: "pointer" }}
                  onClick={() => handleVariantSelect(item)}
                >
                  {item.size}
                </label>
              )
            })}
            <label
              className={`btn flex-fill text-center rounded-3 border ${
                selectedSize === "Custom"
                  ? "bg-primary text-white border-primary"
                  : "btn-outline-primary"
              }`}
              style={{ minWidth: "70px", cursor: "pointer" }}
              onClick={() =>
                handleVariantSelect(
                  ringSizes.find(v => v.size === "Custom")
                )
              }
            >
              Custom
            </label>
          </div>

          {selectedSize === "Custom" && (
            <textarea
              className="form-control mb-3"
              placeholder="Enter custom size details"
              value={customSizeDetails}
              onChange={e => setCustomSizeDetails(e.target.value)}
            />
          )}

          <div className="d-flex align-items-center gap-3 mb-2">
            <strong>Quantity:</strong>
            <div className="input-group w-50">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
          {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
        </div>
        <div className="modal-footer d-flex justify-content-between border-top-0">
          <button className="btn btn-secondary" onClick={() => setIsSizeModalOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalRingSizes
