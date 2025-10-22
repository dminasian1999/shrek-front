import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import { useAppDispatch } from "../../app/hooks.ts"
import { ringSizes } from "../../utils/constants.ts"
import ProductPageImg from "./ProductPageImg.tsx"
import ProductPageDetails from "./ProductPageDetails.tsx"
import { addCartList } from "../../features/api/accountActions.ts"

const ProductPage = () => {
  const { id = "" } = useParams()
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [product, setProduct] = useState<ProductT | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setProduct(null) // --- Refactor: Clear previous product
      setErrorMessage(null)
      try {
        const data = await getPostById(id)
        setProduct(data)
        setSelectedImage(data.imageUrls?.[0] || null)
        setCurrentIndex(0)
      } catch (err) {
        setErrorMessage("Error loading product.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  // Keyboard navigation for zoom
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomOpen || !product?.imageUrls) return // --- Refactor: Added product check
      if (e.key === "Escape") setIsZoomOpen(false)
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    },
    // --- Refactor: Simplified dependencies
    [isZoomOpen, product?.imageUrls?.length, currentIndex],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const nextImage = () => {
    if (!product?.imageUrls) return
    const next = (currentIndex + 1) % product.imageUrls.length
    setCurrentIndex(next)
    setSelectedImage(product.imageUrls[next])
  }

  const prevImage = () => {
    if (!product?.imageUrls) return
    const prev =
      (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length
    setCurrentIndex(prev)
    setSelectedImage(product.imageUrls[prev])
  }

  // --- Refactor: Handle Add to Cart Click ---
  const handleAddToCart = () => {
    // For non-rings, find the 'default' size info, or just use ID
    const isRing = product?.subCategory === "rings"
    const size = isRing
      ? selectedSize
      : product?.sizeQuantities?.[0]?.size ?? "" // Use default size if it exists

    // Create a more robust and unique cartItemId
    const cartId = product?.id! + (size ? `-${size}` : "")

    dispatch(
      addCartList({
        cartItemId: cartId,
        product: product!,
        selectedSize: size,
        quantity: 1,
      }),
    )
    setSelectedSize("") // Reset size after adding
  }

  // --- Refactor: Clear selected size when modal is closed ---
  const handleModalClose = () => {
    setSelectedSize("")
  }

  if (loading) {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "4rem", height: "4rem" }}
        />
        <p className="mt-3 fs-5 text-muted">Loading...</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="container text-center mt-5 text-danger">
        <h4>{errorMessage || "Product not found."}</h4>
      </main>
    )
  }

  // --- Refactor: Moved isRing logic here for re-use ---
  const isRing = product.subCategory === "rings"
  const availableRingSizes = ringSizes.filter(r =>
    product.sizeQuantities?.some(
      sq => sq.size === r.size && sq.quantity > 0, // Only show sizes that are in stock
    ),
  )

  return (
    <div className="container-fluid px-2 py-3">
      {" "}
      {/* Added py-3 for spacing */}
      <div className="row g-3">
        {" "}
        {/* Added g-3 for gutter spacing */}
        <div className="col-lg-6">
          {" "}
          {/* Changed to lg for better breakpoint */}
          <div className="card shadow-sm border-0 p-3 h-100">
            {" "}
            {/* Added p-3 and h-100 */}
            <ProductPageImg
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={src => {
                const idx = product.imageUrls.findIndex(u => u === src)
                if (idx >= 0) {
                  setSelectedImage(src) // --- Refactor: Explicitly set image
                  setCurrentIndex(idx)
                }
              }}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setIsZoomOpen={setIsZoomOpen} // --- Refactor: Correctly pass setter
            />
          </div>
        </div>

        <div className="col-lg-6">
          {" "}
          {/* Changed to lg */}
          <div className="card shadow-sm border-0 p-3 h-100">
            {" "}
            {/* Added p-3 and h-100 */}
            <ProductPageDetails product={product} />
          </div>
        </div>
      </div>

      {/* --- Refactor: Improved Modal Logic --- */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {isRing ? "Select Size" : "Confirm Add to Cart"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalClose}
              />
            </div>

            <div className="modal-body">
              {isRing ? (
                <>
                  <p>Please select an available size:</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {availableRingSizes.length > 0 ? (
                      availableRingSizes.map(r => {
                        const stock = product.sizeQuantities?.find(
                          sq => sq.size === r.size,
                        )
                        return (
                          <button
                            key={r.size}
                            className={`btn flex-fill text-center rounded-3 ${
                              selectedSize === r.size
                                ? "btn-primary text-white"
                                : "btn-outline-secondary"
                            }`}
                            style={{ minWidth: 90 }} // Increased min-width
                            onClick={() => setSelectedSize(r.size)}
                          >
                            <div>{r.size}</div>
                            <small className="opacity-75">
                              ({stock?.quantity} left)
                            </small>
                          </button>
                        )
                      })
                    ) : (
                      <p className="text-muted">
                        This ring is currently out of stock in all sizes.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p>
                  Add <strong>{product.name}</strong> to your cart?
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                onClick={handleAddToCart}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                // --- Refactor: Disable if size is required but not selected ---
                disabled={
                  isRing && (!selectedSize || availableRingSizes.length === 0)
                }
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2000, backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={() => setIsZoomOpen(false)} // --- Refactor: Click backdrop to close
        >
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3"
            style={{ zIndex: 2001 }}
            onClick={() => setIsZoomOpen(false)}
          >
            ✕
          </button>
          <button
            className="btn btn-outline-light position-absolute start-0 top-50 translate-middle-y m-3 fs-3"
            style={{ height: 60, width: 60, zIndex: 2001 }}
            onClick={e => {
              e.stopPropagation() // Prevent backdrop click
              prevImage()
            }}
          >
            ‹
          </button>
          <img
            src={product.imageUrls?.[currentIndex] || ""}
            alt="Zoomed Product"
            className="img-fluid"
            style={{
              maxHeight: "90vh", // Use vh/vw for better responsiveness
              maxWidth: "90vw",
              objectFit: "contain",
              cursor: "default", // Stop propagation
            }}
            onClick={e => e.stopPropagation()} // Prevent backdrop click
          />
          <button
            className="btn btn-outline-light position-absolute end-0 top-50 translate-middle-y m-3 fs-3"
            style={{ height: 60, width: 60, zIndex: 2001 }}
            onClick={e => {
              e.stopPropagation() // Prevent backdrop click
              nextImage()
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductPage
