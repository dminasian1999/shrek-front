import React from 'react';


const ZoomModal: React.FC<any> = ({ selectedImage, onClose, onPrev, onNext }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center" style={{ zIndex: 2001 }}>
    <button className="btn btn-light position-absolute top-0 end-0 m-3" onClick={onClose}>✕</button>
    <img src={selectedImage} alt="Zoomed Product" className="img-fluid" style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
  </div>
);


export default ZoomModal;
