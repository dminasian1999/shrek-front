import { ProductT } from "../../utils/types.ts"
import React from "react"

interface ProductPageImgProps {
  product: ProductT
  selectedImage: string | null
  setSelectedImage: (url: string) => void // --- Refactor: Simplified type
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  setIsZoomOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductPageImg: React.FC<ProductPageImgProps> = ({
                                                         product,
                                                         selectedImage,
                                                         setSelectedImage,
                                                         setCurrentIndex,
                                                         setIsZoomOpen,
                                                       }) => {
  return (
    <div className="d-flex flex-column h-100">
      {" "}
      {/* Ensure it fills parent */}
      <div
        className="rounded-3 shadow-sm mb-3 overflow-hidden position-relative flex-grow-1" // --- Refactor: flex-grow-1
        onClick={() => setIsZoomOpen(true)}
        style={{ cursor: "zoom-in", minHeight: 400 }} // --- Refactor: Set min-height
        role="button"
        aria-label="Open image zoom"
        tabIndex={0} // --- Refactor: Make it focusable
        onKeyDown={e => e.key === "Enter" && setIsZoomOpen(true)}
      >
        <img
          src={selectedImage ?? product.imageUrls?.[0] ?? ""}
          alt={product.name}
          className="img-fluid w-100 h-100" // --- Refactor: Added h-100
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease", // --- Refactor: Added 'ease'
          }}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <div className="d-flex gap-2 overflow-auto pb-2">
        {product.imageUrls?.map((url, idx) => (
          <button
            key={idx}
            aria-label={`Select image ${idx + 1}`}
            className={`border p-1 rounded-2 ${
              selectedImage === url ? "border-primary border-3" : "border-light"
            }`}
            style={{
              width: 80,
              height: 80,
              flex: "0 0 auto", // Prevent shrinking
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              opacity: selectedImage === url ? 1 : 0.7, // --- Refactor: Add opacity
              transition: "opacity 0.2s, border 0.2s",
            }}
            onClick={() => {
              setSelectedImage(url)
              setCurrentIndex(idx)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductPageImg
