import { ProductT } from "../utils/types.ts"
import React from "react"
import { ringSizes } from "../utils/constants.ts"

type Props = {
  product: ProductT
  selectedImage: string | null
  setSelectedImage: (s: string | null) => void
  currentIndex: number
  setCurrentIndex: (i: number) => void
  setIsZoomOpen: (b: boolean) => void
  nextImage: () => void
  prevImage: () => void
}

const ProductPageImg: React.FC<Props> = ({
                                           product,
                                           selectedImage,
                                           setSelectedImage,
                                           currentIndex,
                                           setCurrentIndex,
                                           setIsZoomOpen,
                                           nextImage,
                                           prevImage,
                                         }) => {
  return (
    <div className="p-3">
      <div className="d-flex justify-content-center align-items-center position-relative">
        <button className="btn btn-outline-secondary position-absolute start-0" onClick={prevImage}>‹</button>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: 520, objectFit: "contain", cursor: "zoom-in" }}
            onClick={() => setIsZoomOpen(true)}
          />
        ) : (
          <div className="text-muted">No image</div>
        )}
        <button className="btn btn-outline-secondary position-absolute end-0" onClick={nextImage}>›</button>
      </div>

      <div className="d-flex gap-2 mt-3 overflow-auto">
        {product.imageUrls?.map((url, idx) => (
          <img
            key={url + idx}
            src={url}
            alt={`thumb-${idx}`}
            className={`border ${idx === currentIndex ? "border-primary" : "border-light"}`}
            style={{ width: 80, height: 80, objectFit: "cover", cursor: "pointer" }}
            onClick={() => {
              setCurrentIndex(idx)
              setSelectedImage(url)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductPageImg
