import React from "react"
import { ProductT } from "../../utils/types.ts"
import { categories } from "../../utils/constants.ts"
import { useAppDispatch } from "../../app/hooks.ts"
import { addWishlist } from "../../features/api/accountActions.ts"
import CheckOut from "../CheckOut.tsx"

const ProductPageDetails = ({ product }: { product: ProductT }) => {
  const dispatch = useAppDispatch()
  const handleBuyNow = () => {}

  const formatWeight = (grams?: number | null) => {
    if (grams == null) return "-"
    return grams >= 1000
      ? `${(grams / 1000).toFixed(2)} kg`
      : `${Math.round(grams)} g`
  }

  const categoryTitle =
    categories.find(c => c.route === product.category)?.title ??
    product.category ??
    "-"

  // --- Refactor: Removed unused 'newProduct' variable ---

  // --- Refactor: Greatly improved stock and size logic ---
  const totalQuantity =
    product.sizeQuantities?.reduce((acc, sq) => acc + (sq.quantity || 0), 0) ??
    0

  const isInStock = totalQuantity > 0
  const hasMultipleSizes =
    product.sizeQuantities && product.sizeQuantities.length > 1
  const singleSize = !hasMultipleSizes && product.sizeQuantities?.[0]?.size

  return (
    <div className="card-body d-flex flex-column h-100">
      {" "}
      {/* Fills height */}
      <h2 className="card-title fw-bold mb-3">{product.name}</h2>
      <div className="mb-3 text-success fs-4 fw-semibold">
        ${product.price?.toFixed(2)}
      </div>
      <div className="mb-3">
        <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle me-2">
          {categoryTitle}
        </span>
        {product.subCategory && (
          <span className="badge bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle">
            {product.subCategory}
          </span>
        )}
      </div>
      {/* --- Refactor: This is the new, "prettier" stock quantity part --- */}
      <div className="mb-3">
        <strong>Status:</strong>{" "}
        {isInStock ? (
          <span className="badge bg-success-subtle text-success-emphasis border border-success-subtle">
            In Stock
          </span>
        ) : (
          <span className="badge bg-danger-subtle text-danger-emphasis border border-danger-subtle">
            Out of Stock
          </span>
        )}
        <div className="fw-light small mt-1 text-muted">
          {isInStock ? (
            hasMultipleSizes ? (
              <span>
                <strong>{totalQuantity}</strong> available across{" "}
                {product.sizeQuantities.length} sizes.
              </span>
            ) : (
              <span>
                <strong>{totalQuantity}</strong> available.
              </span>
            )
          ) : (
            "Currently unavailable."
          )}
        </div>
      </div>
      {product.color && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <strong>Color:</strong>
          <span
            title={product.color}
            style={{
              width: 20,
              height: 20,
              backgroundColor: product.color,
              borderRadius: "50%",
              border: "1px solid #ccc",
            }}
          />
          <span className="text-capitalize">{product.color}</span>
        </div>
      )}
      {/* --- Refactor: Improved size display --- */}
      {hasMultipleSizes && (
        <div className="mb-3">
          <strong>Size:</strong>
          <span className="ms-2 badge bg-light text-dark border">
            Multiple sizes available
          </span>
          <div className="fw-light small mt-1 text-muted">
            (Select size when adding to cart)
          </div>
        </div>
      )}
      {singleSize && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <strong>Size:</strong>
          <span className="text-capitalize">{singleSize}</span>
        </div>
      )}
      {product.material && (
        <div className="mb-3">
          <strong>Material:</strong>
          <div className="d-flex flex-wrap gap-2 mt-1">
            <span className="badge bg-light text-dark border">
              {product.material}
            </span>
          </div>
        </div>
      )}
      {product.weight != null && (
        <div className="mb-3">
          <strong>Weight:</strong> <span>{formatWeight(product.weight)}</span>
        </div>
      )}
      <div className="mb-4 flex-grow-1">
        {" "}
        {/* Pushes buttons to bottom */}
        <strong>Description:</strong>
        <p
          className="mt-1 text-break text-muted"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {product.desc?.trim() || "No description provided."}
        </p>
      </div>
      {/* --- Refactor: Buttons are now at the bottom --- */}
      <div className="d-flex flex-wrap gap-3 mt-auto">
        {" "}
        {/* mt-auto */}
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="btn btn-lg btn-primary px-4 flex-grow-1" // --- Refactor: flex-grow-1
          disabled={!isInStock} // --- Refactor: Disable if out of stock
        >
          <i className="fa fa-shopping-cart me-2" />
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <CheckOut />
        {/*<Checkout3 product={product}/>*/}
        <button
          className="btn btn-lg btn-outline-dark px-4"
          onClick={() => dispatch(addWishlist(product.id ?? ""))}
        >
          <i className="fa fa-heart" />
        </button>
      </div>
    </div>
  )
}

export default ProductPageDetails
