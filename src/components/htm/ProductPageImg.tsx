import { ProductT } from "../../utils/types.ts"
import React from "react"

interface ProductPageImgProps {
  product: ProductT
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
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
    <div>
      <div
        className="rounded shadow-sm mb-3 overflow-hidden position-relative"
        onClick={() => setIsZoomOpen(true)}
        style={{ cursor: "zoom-in" }}
        role="button"
        aria-label="Open image zoom"
      >
        <img
          src={selectedImage ?? product.imageUrls?.[0] ?? ""}
          alt={product.name}
          className="img-fluid w-100"
          style={{
            objectFit: "cover",
            height: 400,
            transition: "transform 0.3s",
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
              flex: "0 0 auto",
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
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
