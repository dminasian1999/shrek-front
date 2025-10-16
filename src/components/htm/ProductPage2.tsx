import ModalRingSizes from "../ModalRingSizes.tsx"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import { addCartList } from "../../features/api/accountActions.ts"
import { useAppDispatch } from "../../app/hooks.ts"
import { ringSizes } from "../../utils/constants.ts"
import ProductPageImg from "./ProductPageImg.tsx"
import ProductPageDetails from "./ProductPageDetails.tsx"

// type Variant = { size: string; price: number; sku: string; stock: number }

const ProductPage: React.FC = () => {
  const { id = "" } = useParams()
  const dispatch = useAppDispatch()

  const [product, setProduct] = useState<ProductT | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [customSizeDetails, setCustomSizeDetails] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const data = await getPostById(id)
        if (!mounted) return
        setProduct(data)
        setSelectedImage(data?.imageUrls?.[0] ?? null)
        setCurrentIndex(0)
      } catch {
        if (mounted) setErrorMessage("Error loading product.")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchProduct()
    return () => {
      mounted = false
    }
  }, [id])

  const handleVariantSelect = useCallback((variant?: Variant) => {
    if (!variant) return
    setSelectedVariant(variant)
    setSelectedSize(variant.size)
    setQuantity(variant.stock > 0 ? 1 : 0)
    setCustomSizeDetails("")
    if (variant.size === "Custom") setIsSizeModalOpen(true)
  }, [])

  // ✅ Add-to-cart handler: only opens modal if it's a ring
  const handleAddToCartRequest = useCallback(() => {
    if (!product) return
    if (product.subCategory === "rings") {
      setIsSizeModalOpen(true)
    } else {
      // Directly add to cart for non-ring items
      dispatch(
        addCartList({
          cartItemId: product.id ?? "",
          product,
          quantity: 1,
        }),
      )
    }
  }, [product, dispatch])

  const handleAddToCart = useCallback(() => {
    if (!product) return setErrorMessage("Product not loaded.")
    if (!selectedSize) return setErrorMessage("Please select a size.")

    const variant =
      selectedVariant ?? ringSizes.find(v => v.size === selectedSize) ?? null
    const maxQty = variant ? variant.stock : (product.sizeQuantities[0].quantity ?? 1)
    const safeQty = Math.max(1, Math.min(quantity, maxQty || 1))

    dispatch(
      addCartList({
        cartItemId: product.id ?? "",
        product: {
          ...product,
          size: selectedSize,
          customDetails: customSizeDetails,
          sku: variant?.sku,
        },
        quantity: safeQty,
      }),
    )
    setIsSizeModalOpen(false)
    setErrorMessage(null)
  }, [product, selectedSize, selectedVariant, quantity, customSizeDetails, dispatch])

  const handleQuantityChange = (delta: number) => {
    const maxQty = selectedVariant
      ? selectedVariant.stock
      : (product?.sizeQuantities[0].quantity ?? 1)
    setQuantity(prev => Math.max(1, Math.min(prev + delta, maxQty || 1)))
  }

  const nextImage = useCallback(() => {
    if (!product?.imageUrls?.length) return
    const next = (currentIndex + 1) % product.imageUrls.length
    setCurrentIndex(next)
    setSelectedImage(product.imageUrls[next])
  }, [product?.imageUrls, currentIndex])

  const prevImage = useCallback(() => {
    if (!product?.imageUrls?.length) return
    const prev =
      (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length
    setCurrentIndex(prev)
    setSelectedImage(product.imageUrls[prev])
  }, [product?.imageUrls, currentIndex])

  if (loading) return <div className="text-center mt-5">Loading...</div>
  if (!product)
    return (
      <div className="text-center mt-5 text-danger">
        {errorMessage || "Product not found."}
      </div>
    )

  return (
    <div className="container-fluid px-2">
      <div className="row">
        <div className="col-md-6 card shadow-sm border-0">
          <ProductPageImg
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setIsZoomOpen={setIsZoomOpen}
          />
        </div>
        <div className="col-md-6 card shadow-sm border-0">
          <ProductPageDetails product={product} onAddToCart={handleAddToCartRequest} />
        </div>
      </div>

      {product.subCategory === "rings" && isSizeModalOpen && (
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
      )}

      {isZoomOpen && selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2001 }}
        >
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3"
            onClick={() => setIsZoomOpen(false)}
          >
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
            alt="Zoomed Product"
            className="img-fluid"
            style={{ maxHeight: "90%", maxWidth: "90%", objectFit: "contain" }}
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
