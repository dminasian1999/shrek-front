import React, { memo } from 'react';


const ImageGallery: React.FC<any> = memo(({ imageUrls, selectedImage, setSelectedImage,  setCurrentIndex, openZoom }) => (
  <div>
    <div className="rounded shadow-sm mb-3 overflow-hidden position-relative" onClick={openZoom} style={{ cursor: 'zoom-in' }}>
      <img src={selectedImage ?? ''} alt="product" className="img-fluid w-100" style={{ objectFit: 'cover', height: 400 }} />
    </div>
    <div className="d-flex gap-2 overflow-auto pb-2">
      {imageUrls?.map((url: string, idx: number) => (
        <button
          key={idx}
          className={`border p-1 rounded-2 ${selectedImage === url ? 'border-primary border-3' : 'border-light'}`}
          style={{ width: 80, height: 80, flex: '0 0 auto', backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}
          onClick={() => {
            setSelectedImage(url);
            setCurrentIndex(idx);
          }}
        />
      ))}
    </div>
  </div>
));


export default ImageGallery;
