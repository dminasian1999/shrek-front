import React from "react"
import { ringSizes } from "../utils/constants.ts"
type Props = {
  isOpen: boolean
  onClose: () => void
  product: ProductT
  selectedSize: string
  setSelectedSize: (s: string) => void
  quantity: number
  setQuantity: (n: number) => void
  customSizeDetails: string
  setCustomSizeDetails: (s: string) => void
  onConfirm: () => void
  onVariantSelect: (v: any) => void
}

const SizeModal: React.FC<Props> = ({ isOpen, onClose, product, selectedSize, setSelectedSize, quantity, setQuantity, customSizeDetails, setCustomSizeDetails, onConfirm, onVariantSelect }) => {
  if (!isOpen) return null
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 2002 }}>
      <div className="bg-white p-4 rounded shadow" style={{ width: 520 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Select size for {product.title}</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}>✕</button>
        </div>

        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2">
            {ringSizes.map(r => (
              <button key={r.size} className={`btn btn-sm ${selectedSize === r.size ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => { setSelectedSize(r.size); onVariantSelect(r) }}>{r.size}</button>
            ))}
            <button className={`btn btn-sm ${selectedSize === "Custom" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setSelectedSize("Custom")}>Custom</button>
          </div>
        </div>

        {selectedSize === "Custom" && (
          <div className="mb-3">
            <label className="form-label">Custom size details</label>
            <input className="form-control" value={customSizeDetails} onChange={e => setCustomSizeDetails(e.target.value)} placeholder="e.g. inner diameter, notes" />
          </div>
        )}

        <div className="d-flex align-items-center gap-2 mb-3">
          <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <div>{quantity}</div>
          <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default SizeModal
