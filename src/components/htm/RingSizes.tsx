import React, { useState } from "react";
import { ringSizes } from "../../utils/constants";

const RingSizes: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleSaveChanges = () => {
    console.log("Selected Ring Size:", selectedSize, "Quantity:", quantity);
    // Add logic to actually add to cart here
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        className="btn btn-primary d-flex align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#ringSizeModal"
      >
        <i className="fa fa-shopping-cart" />
        Add to Cart
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="ringSizeModal"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-labelledby="ringSizeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fw-bold" id="ringSizeModalLabel">
                Choose Your Ring Size
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <p className="text-muted mb-3">
                Select your preferred size below.
              </p>

              {/* Ring Sizes */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                {ringSizes.map((item) => {
                  const inputId = `ringSize-${item.size.replace(".", "-")}`;
                  const isSelected = selectedSize === item.size;
                  return (
                    <label
                      key={item.size}
                      htmlFor={inputId}
                      className={`btn flex-fill text-center rounded-3 border transition ${
                        isSelected
                          ? "bg-primary text-white border-primary"
                          : "btn-outline-primary"
                      }`}
                      style={{ minWidth: "70px", cursor: "pointer" }}
                    >
                      <input
                        type="radio"
                        name="ringSize"
                        id={inputId}
                        className="d-none"
                        checked={isSelected}
                        onChange={() => setSelectedSize(item.size)}
                      />
                      {item.size}
                    </label>
                  );
                })}
              </div>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center gap-3">
                <strong>Quantity:</strong>
                <div className="input-group" style={{ width: "120px" }}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="form-control text-center fw-bold"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-secondary rounded-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-3"
                onClick={handleSaveChanges}
                disabled={!selectedSize}
                data-bs-dismiss="modal"
              >
                {selectedSize
                  ? `Confirm: Size ${selectedSize} × ${quantity}`
                  : "Select a Size"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingSizes;
