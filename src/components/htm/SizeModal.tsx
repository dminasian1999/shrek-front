const SizeModal: React.FC<any> = ({ product, isOpen, onClose, selectedSize, setSelectedSize, selectedVariant, setSelectedVariant, quantity, setQuantity, customSizeDetails, setCustomSizeDetails, onAdd }) => {
  if (!isOpen) return null;


  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 2000 }}>
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ maxWidth: 450 }}>
        <div className="modal-header border-bottom-0">
          <h5 className="modal-title">Select Size & Quantity</h5>
          <button type="button" className="btn-close" onClick={onClose} />
        </div>
        <div className="modal-body">Size & quantity inputs here</div>
        <div className="modal-footer d-flex justify-content-between border-top-0">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};


export default SizeModal;
