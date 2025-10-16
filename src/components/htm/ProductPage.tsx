import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import { useAppDispatch } from "../../app/hooks.ts"
import { categories, ringSizes } from "../../utils/constants.ts"
import ProductPageImg from "./ProductPageImg.tsx"
import ProductPageDetails from "./ProductPageDetails.tsx"
import { addCartList } from "../../features/api/accountActions.ts"

const ProductPage = () => {
  const { id = "" } = useParams()
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [product, setProduct] = useState({} as ProductT)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await getPostById(id)
        setProduct(data)
        setSelectedImage(data.imageUrls?.[0] || null)
        setCurrentIndex(0)
        setErrorMessage(null)
      } catch {
        setErrorMessage("Error loading product.")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  // Keyboard navigation for zoom
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomOpen) return
      if (e.key === "Escape") setIsZoomOpen(false)
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    },
    [isZoomOpen],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (loading) {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
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

  const categoryTitle =
    categories.find(c => c.route === product.category)?.title ||
    product.category ||
    "-"

  const nextImage = () => {
    if (!product?.imageUrls) return
    const next = (currentIndex + 1) % product.imageUrls.length
    setCurrentIndex(next)
    setSelectedImage(product.imageUrls[next])
  }

  const prevImage = () => {
    if (!product?.imageUrls) return
    const prev = (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length
    setCurrentIndex(prev)
    setSelectedImage(product.imageUrls[prev])
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
          />
        </div>

        <div className="col-md-6 card shadow-sm border-0">
          <ProductPageDetails product={product} selectedSize={selectedSize} />
        </div>
      </div>

      {/* Show size modal ONLY if subCategory === "rings" */}
      {/*{product.subCategory === "rings" && (*/}
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
                {product.subCategory === "rings" ? "Select Size" : "Add to Cart ?"}
              </h1>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              <div className="d-flex flex-wrap gap-2 mb-3">
                {ringSizes
                  .filter(r => product.sizeQuantities?.some(sq => sq.size === r.size))
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
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={() =>
                  dispatch(
                    addCartList({
                      cartItemId: product.id!+selectedSize,
                      product,
                      selectedSize,

                      quantity: 1,
                    }),
                  )
                }
                type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Continue
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2000 }}
        >
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3"
            onClick={() => setIsZoomOpen(false)}
          >
            ✕
          </button>
          <button
            className="btn btn-outline-light position-absolute start-0 m-3 fs-3"
            style={{ height: 60, width: 60 }}
            onClick={prevImage}
          >
            ‹
          </button>
          <img
            src={product.imageUrls?.[currentIndex] || ""}
            alt="Zoomed Product"
            className="img-fluid"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              objectFit: "contain",
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <button
            className="btn btn-outline-light position-absolute end-0 m-3 fs-3"
            style={{ height: 60, width: 60 }}
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
