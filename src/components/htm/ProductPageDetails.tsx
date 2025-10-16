import React from "react"
import { ProductT } from "../../utils/types.ts"
import { categories } from "../../utils/constants.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { addCartList, addWishlist } from "../../features/api/accountActions.ts"

const ProductPageDetails = ({
  product,selectedSize
}: {
  product: ProductT,
  selectedSize: string
}) => {
  const token = useAppSelector(state => state.token)
  const user = useAppSelector(state => state.user.profile)
  const dispatch = useAppDispatch()

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
  const newProduct : ProductT = {
    ...product,
    sizeQuantities:
      product.sizeQuantities?.map(sq =>
        sq.size === selectedSize ? { ...sq, quantity: 1 } : sq,
      ) ?? [],
  }
  return (
    <div className="card-body">
      <h2 className="card-title fw-bold mb-3">{product.name}</h2>
      <div className="mb-3 text-success fs-4 fw-semibold">
        ${product.price?.toFixed(2)}
      </div>

      <div className="mb-3">
        <span className="badge bg-info text-white">{categoryTitle}</span>{" "}
        {product.subCategory && (
          <span className="badge bg-info text-white">
            {product.subCategory}
          </span>
        )}
      </div>

      <div className="mb-3">
        <strong>Status:</strong>{" "}
        {product.sizeQuantities[0]?.quantity > 0 ? (
          <span className="badge bg-success">In Stock</span>
        ) : (
          <span className="badge bg-danger">Out of Stock</span>
        )}
        {token && user?.roles?.includes("ADMINISTRATOR") && (
          <div className="card-footer fw-light small">
            {product.sizeQuantities[0]?.quantity}
          </div>
        )}
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
      {product.sizeQuantities[0]?.size && (
        <div className="mb-3 d-flex align-items-center gap-2">
          <strong>Size:</strong>
          <span className="text-capitalize">
            {product.sizeQuantities[0]?.size}
          </span>
        </div>
      )}

      {product.material && (
        <div className="mb-3">
          <strong>Material:</strong>
          <div className="d-flex flex-wrap gap-2 mt-1">
            <span className="badge bg-secondary">{product.material}</span>
          </div>
        </div>
      )}

      {product.weight != null && (
        <div className="mb-3">
          <strong>Weight:</strong> <span>{formatWeight(product.weight)}</span>
        </div>
      )}

      <div className="mb-3">
        <strong>Description:</strong>
        <p className="mt-1 text-break" style={{ whiteSpace: "pre-wrap" }}>
          {product.desc ?? "-"}
        </p>
      </div>

      <div className="d-flex flex-wrap gap-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="btn btn-lg btn-primary px-4"
          // onClick={() =>
          //   dispatch(
          //     addCartList({
          //       cartItemId: product.id!,
          //       product,
          //       selectedSize,
          //
          //       quantity: 1,
          //     }),
          //   )
          // }
        >
          <i className="fa fa-shopping-cart me-2" /> Add to Cart
        </button>
        <button
          className="btn btn-lg btn-outline-dark px-4"
          onClick={() => dispatch(addWishlist(product.id ?? ""))}
        >
          <i className="fa fa-heart me-2" /> Add to Wishlist
        </button>
      </div>
    </div>
  )
}

export default ProductPageDetails
