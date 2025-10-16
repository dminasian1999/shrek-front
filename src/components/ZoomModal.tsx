import React from "react"

type Props = {
  image: string
  onClose: () => void
  prevImage: () => void
  nextImage: () => void
}

const ZoomModal: React.FC<Props> = ({ image, onClose, prevImage, nextImage }) => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center" style={{ zIndex: 2001 }}>
      <button className="btn btn-light position-absolute top-0 end-0 m-3" onClick={onClose}>✕</button>
      <button className="btn btn-outline-light position-absolute start-0 m-3 fs-3" onClick={prevImage}>‹</button>
      <img src={image} alt="Zoomed" className="img-fluid" style={{ maxHeight: "90%", maxWidth: "90%", objectFit: "contain" }} />
      <button className="btn btn-outline-light position-absolute end-0 m-3 fs-3" onClick={nextImage}>›</button>
    </div>
  )
}

export default ZoomModal
