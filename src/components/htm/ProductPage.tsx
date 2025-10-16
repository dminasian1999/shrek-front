import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import { addCartList } from "../../features/api/accountActions.ts"
import { useAppDispatch } from "../../app/hooks.ts"
import { ringSizes } from "../../utils/constants.ts"
import ProductPageImg from "./ProductPageImg.tsx"

const ProductPage: React.FC = () => {
  const { id = "" } = useParams()
  const dispatch = useAppDispatch()

  const [product, setProduct] = useState<ProductT | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // image state
  const [currentIndex, setCurrentIndex] = useState(0)
  const selectedImage = product?.imageUrls?.[currentIndex] ?? null

  // size/modal state for rings
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getPostById(id)
      .then(data => {
        if (!mounted) return
        setProduct(data)
        setCurrentIndex(0)
        setError(null)
      })
      .catch(() => {
        if (mounted) setError("Error loading product.")
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return <div className="text-center mt-5">Loading...</div>
  if (!product)
    return (
      <div className="text-center mt-5 text-danger">
        {error ?? "Product not found."}
      </div>
    )

  // move to next / prev image (wrap)
  const nextImage = () => {
    if (!product?.imageUrls?.length) return
    setCurrentIndex(i => (i + 1) % product.imageUrls.length)
  }
  const prevImage = () => {
    if (!product?.imageUrls?.length) return
    setCurrentIndex(
      i => (i - 1 + product.imageUrls.length) % product.imageUrls.length,
    )
  }

  // when user clicks main 'Add to cart' button
  const handleAddToCartRequest = () => {
    if (product.subCategory === "rings") {
      setIsSizeModalOpen(true)
      return
    }
    // non-ring: add directly
    dispatch(
      addCartList({
        cartItemId: product.id ?? "",
        product,
        quantity: 1,
      }),
    )
  }

  // user confirms size in modal -> add to cart (always qty = 1)
  const handleAddToCartConfirm = () => {
    if (!selectedSize) {
      setError("Please select a size.")
      return
    }

    // try find sku from ringSizes, else undefined
    const found = ringSizes.find(r => r.size === selectedSize)
    const sku = found?.sku

    // keep product mostly as-is but mark chosen size quantity = 1 if present
    const newProduct = {
      ...product,
      sizeQuantities:
        product.sizeQuantities?.map(sq =>
          sq.size === selectedSize ? { ...sq, quantity: 1 } : sq,
        ) ?? [],
      sku,
    }

    dispatch(
      addCartList({
        cartItemId: product.id ?? "",
        product: newProduct,
        quantity: 1,
      }),
    )
    setIsSizeModalOpen(false)
    setSelectedSize("")
    setError(null)
  }

  return (
    <div className="container-fluid px-2">
      <div className="row">
        <div className="col-md-6 card shadow-sm border-0">
          <ProductPageImg
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={src => {
              const idx = product.imageUrls.findIndex(u => u === src)
              if (idx >= 0) setCurrentIndex(idx)
            }}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setIsZoomOpen={() => {}}
            // keep next/prev available if the child needs them
          />
        </div>

        <div className="col-md-6 card shadow-sm border-0">
          {/*<ProductPageDetails product={product} onAddToCart={handleAddToCartRequest} />*/}
        </div>
      </div>

      {/* Size modal for rings */}
      {product.subCategory === "rings" && isSizeModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2000 }}
        >
          <div
            className="modal-content bg-white p-4 rounded shadow-lg"
            style={{ maxWidth: 450 }}
          >
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Select Size</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsSizeModalOpen(false)}
              />
            </div>

            <div className="modal-body">
              <div className="d-flex flex-wrap gap-2 mb-3">
                {ringSizes
                  .filter(r =>
                    product.sizeQuantities?.some(sq => sq.size === r.size),
                  )
                  .map(r => (
                    <button
                      key={r.size}
                      className={`btn flex-fill text-center rounded-3 ${
                        selectedSize === r.size
                          ? "bg-primary text-white"
                          : "btn-outline-secondary"
                      }`}
                      style={{ minWidth: 70 }}
                      onClick={() => setSelectedSize(r.size)}
                    >
                      {r.size}
                    </button>
                  ))}

                <button
                  className={`btn flex-fill text-center rounded-3 ${
                    selectedSize === "Custom"
                      ? "bg-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                  style={{ minWidth: 70 }}
                  onClick={() => setSelectedSize("Custom")}
                >
                  Custom
                </button>
              </div>

              {error && <div className="text-danger mt-2">{error}</div>}
            </div>

            <div className="modal-footer d-flex justify-content-between border-top-0">
              <button
                className="btn btn-secondary"
                onClick={() => setIsSizeModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddToCartConfirm}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple zoom overlay (uses current selectedImage) */}
      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-none"
          style={{ zIndex: 2001 }}
        >
          {/* if you want a zoom overlay, re-enable and wire the isZoomOpen flag */}
          <button className="btn btn-light position-absolute top-0 end-0 m-3">
            ✕
          </button>
          <button
            className="btn btn-outline-light position-absolute start-0 m-3 fs-3"
            onClick={prevImage}
          >
            ‹
          </button>
          <img
            src={selectedImage}
            alt="Zoomed"
            className="img-fluid"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
          <button
            className="btn btn-outline-light position-absolute end-0 m-3 fs-3"
            onClick={nextImage}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductPage
