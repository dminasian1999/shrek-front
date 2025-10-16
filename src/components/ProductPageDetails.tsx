import React from "react"
import { ringSizes } from "../utils/constants.ts"
// File: src/components/ProductPage/ProductPageDetails.tsx
import React from "react"
import { ProductT } from "../../utils/types"
import { ringSizes } from "../../utils/constants"

type Props = {
  product: ProductT
  onAddToCart: () => void
  onVariantSelect?: (v?: { size: string; price: number; sku: string; stock: number }) => void
  selectedSize?: string
}

const ProductPageDetails: React.FC<Props> = ({ product, onAddToCart, onVariantSelect, selectedSize }) => {
  return (
    <div className="p-3">
      <h3>{product.title}</h3>
      <p className="h4">{product.price ? `${product.price} USD` : "Contact for price"}</p>
      <p className="text-muted">{product.content}</p>

      {product.subCategory === "rings" ? (
        <div className="mb-3">
          <label className="form-label">Select size</label>
          <div className="d-flex flex-wrap gap-2">
            {ringSizes.map(r => (
              <button
                key={r.size}
                className={`btn btn-sm ${selectedSize === r.size ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => onVariantSelect?.(r)}
              >
                {r.size}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={onAddToCart}>Add to cart</button>
        <button className="btn btn-outline-secondary">Add to wishlist</button>
      </div>
    </div>
  )
}

export default ProductPageDetails
