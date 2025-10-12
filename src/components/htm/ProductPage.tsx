import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ProductT } from "../../utils/types.ts";
import { getPostById } from "../../features/api/postActions.tsx";
import { addCartList, addWishlist } from "../../features/api/accountActions.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { categories } from "../../utils/constants.ts";
const PRODUCT_VARIANTS = [
  { size: "5", price: 168.64, sku: "sor1004-5", stock: 10 },
  { size: "5.5", price: 168.64, sku: "sor1004-5.5", stock: 5 },
  { size: "6", price: 168.64, sku: "sor1004-6", stock: 0 }, // Out of stock example
  { size: "6.5", price: 168.64, sku: "sor1004-6.5", stock: 15 },
  { size: "7", price: 168.64, sku: "sor1004-7", stock: 20 },
  { size: "Custom", price: 168.64, sku: "sor1004-custom", stock: 99 },
]
const ProductPage = () => {
  const { id = "" } = useParams();
  const [selectedVariant, setSelectedVariant] = useState<
    (typeof PRODUCT_VARIANTS)[0] | null
  >(null)
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductT | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const displayPrice = selectedVariant?.price

  // Quantity
  const [quantity, setQuantity] = useState(1);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const currentStock = selectedVariant
    ? selectedVariant.size === "Custom"
      ? selectedVariant.stock // Use the mocked '99' for custom
      : selectedVariant.stock
    : 0

  // Custom Size Modal
  const [isCustomSizeModalOpen, setIsCustomSizeModalOpen] = useState(false);
  const [customSizeDetails, setCustomSizeDetails] = useState("");

  // Zoom Modal
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleVariantSelect = (variant: (typeof PRODUCT_VARIANTS)[0]) => {
    setSelectedVariant(variant)
    setQuantity(variant.stock > 0 ? 1 : 0)
    setCustomSizeDetails("") // Clear custom details on new selection

    if (variant.size === "Custom") {
      // **CRITICAL FIX**: Do NOT open the modal automatically.
      // We want the user to click "Add to Cart" to trigger the flow,
      // or open the modal, then allow "Add to Cart".

      // **Modified Logic**: Select the variant, then let the `handleAddToCart`
      // logic decide when to open the modal/check for details.
      // For now, let's keep the current behavior but fix the cart logic.
      // openCustomSizeModal()
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getPostById(id);
        setProduct(data);
        setSelectedImage(data.imageUrls?.[0] || null);
        setCurrentIndex(0);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Error loading product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Keyboard navigation in zoom
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomOpen) return;
      if (e.key === "Escape") setIsZoomOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    },
    [isZoomOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
        <p className="mt-3 fs-5 text-muted">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container text-center mt-5 text-danger">
        <h4>{errorMessage || "Product not found."}</h4>
      </main>
    );
  }

  const categoryTitle =
    categories.find((c) => c.route === product.category)?.title ||
    product.category ||
    "-";

  const displaySize =
    product.size === "custom"
      ? "Custom"
      : product.size || "-";

  const formatWeight = (grams?: number | null) => {
    if (grams == null) return "-";
    return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
  };

  // ---- Image Navigation ----
  const nextImage = () => {
    if (!product?.imageUrls) return;
    const next = (currentIndex + 1) % product.imageUrls.length;
    setCurrentIndex(next);
    setSelectedImage(product.imageUrls[next]);
  };

  const prevImage = () => {
    if (!product?.imageUrls) return;
    const prev = (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length;
    setCurrentIndex(prev);
    setSelectedImage(product.imageUrls[prev]);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.quantity)));
  };

  const handleSaveCustomSize = () => {
    console.log("Custom size saved:", customSizeDetails);
    setIsCustomSizeModalOpen(false);
  };

  const closeCustomSizeModal = () => {
    setCustomSizeDetails("");
    setIsCustomSizeModalOpen(false);
  };

  return (
    <div className="container-fluid px-2">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6">
          {/* Main Image */}
          <div
            className="rounded shadow-sm mb-3 overflow-hidden position-relative"
            onClick={() => setIsZoomOpen(true)}
            style={{ cursor: "zoom-in" }}
          >
            <img
              src={selectedImage || ""}
              alt="Selected Product"
              className="img-fluid w-100"
              style={{
                objectFit: "cover",
                height: 400,
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          {/* Thumbnails */}
          <div className="d-flex gap-2 overflow-auto pb-2">
            {product.imageUrls?.map((url, idx) => (
              <button
                key={idx}
                className={`border p-1 rounded-2 bg-white shadow-sm ${
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
                  transition: "all 0.2s ease-in-out",
                }}
                onClick={() => {
                  setSelectedImage(url);
                  setCurrentIndex(idx);
                }}
                aria-label={`Select image ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="col-md-6 card shadow-sm border-0">
          <div className="card-body">
            <h2 className="card-title fw-bold mb-3">{product.name}</h2>

            <div className="mb-3">
              <span className="text-success fs-4 fw-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-3">
              <span className="badge bg-info text-white">{product.category}</span>
              <span className="badge bg-info text-white">{product.subCategory}</span>
            </div>

            <div className="mb-3">
              <strong>Status:</strong>{" "}
              {product.quantity > 0 ? (
                <span className="badge bg-success">In Stock</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
            </div>

            {product.color && (
              <div className="mb-3 d-flex align-items-center gap-2">
                <strong>Color:</strong>
                <span
                  title={product.color}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: product.color,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                  }}
                />
                <span className="text-capitalize">{product.color}</span>
              </div>
            )}

            <div className="mb-3">
              <strong>Material:</strong>
              <div className="d-flex flex-wrap gap-2 mt-1">
                <span className="badge bg-secondary">{product.material}</span>
              </div>
            </div>

            {product.size && (
              <div className="mb-3">
                <strong>Size:</strong>{" "}
                <span className="badge bg-light text-dark ms-1">{displaySize}</span>
              </div>
            )}

            {product.weight != null && (
              <div className="mb-3">
                <strong>Weight:</strong>{" "}
                <span className="ms-1">{formatWeight(product.weight)}</span>
              </div>
            )}

            <div className="mb-3">
              <strong>Description:</strong>
              <p className="mt-1 text-break" style={{ whiteSpace: "pre-wrap" }}>
                {product.desc || "-"}
              </p>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-lg btn-primary px-4"
                onClick={() => setIsQuantityModalOpen(true)}
              >
                <i className="fa fa-shopping-cart me-2" /> Add to Cart
              </button>
              <button
                className="btn btn-lg btn-outline-dark px-4"
                onClick={() => dispatch(addWishlist(product.id!))}
              >
                <i className="fa fa-heart me-2" /> Add to Wishlist
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

      {/* Custom Size Modal */}
      {isCustomSizeModalOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2001 }}
        >
          <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ maxWidth: 400 }}>
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Enter Custom Size Details</h5>
              <button type="button" className="btn-close" onClick={closeCustomSizeModal} />
            </div>
            <div className="modal-body">
              <p>Please enter the specific measurements for your custom order.</p>
              <textarea
                className="form-control"
                rows={4}
                placeholder="e.g., Chest: 40in, Waist: 32in..."
                value={customSizeDetails}
                onChange={(e) => setCustomSizeDetails(e.target.value)}
              />
            </div>
            <div className="card-body">
              <h2 className="card-title fw-bold mb-3">{product.name}</h2>

              <div className="mb-3">
              <span className="text-success fs-4 fw-semibold">
                ${displayPrice.toFixed(2)}
              </span>
              </div>

              {selectedVariant?.size === "Custom" && customSizeDetails.trim() && (
                <div className="alert alert-info py-2" role="alert">
                  <strong>Custom Details Entered:</strong>
                  <p className="mb-0 small text-break">{customSizeDetails}</p>
                </div>
              )}


              <div className="mb-3">
                <span className="badge bg-info text-white">{product.category}</span>
                <span className="badge bg-info text-white">{product.subCategory}</span>
              </div>

              {/* Other details */}
              {product.color && (
                <div className="mb-3 d-flex align-items-center gap-2">
                  <strong>Color:</strong>
                  <span
                    title={product.color}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: product.color,
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                    }}
                  />
                  <span className="text-capitalize">{product.color}</span>
                </div>
              )}
              {product.size && (
                <div className="mb-3">
                  <strong>Size:</strong>{" "}
                  <span className="badge bg-light text-dark ms-1">{product.size}</span>
                </div>
              )}
              <div className="mb-3">
                <strong>Material:</strong>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  <span className="badge bg-secondary">{product.material}</span>
                </div>
              </div>

              {product.weight != null && (
                <div className="mb-3">
                  <strong>Weight:</strong>{" "}
                  <span className="ms-1">{formatWeight(product.weight)}</span>
                </div>
              )}

              <div className="mb-3">
                <strong>Description:</strong>
                <p className="mt-1 text-break" style={{ whiteSpace: "pre-wrap" }}>
                  {product.desc || "-"}
                </p>
              </div>


              {selectedVariant && currentStock > 0 && (
                <div className="w-50 mb-4 d-flex align-items-center gap-3">
                  <strong>Quantity:</strong>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
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
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= currentStock}
                    >
                      +
                    </button>
                  </div>
                  <small className="text-muted">
                    ({selectedVariant.size === "Custom" ? "Made to Order" : `${currentStock} in stock`})
                  </small>
                </div>
              )}
              <div className="d-flex flex-wrap gap-3 mt-4">
                <div
                  className="btn btn-lg btn-primary "
                  onClick={() => {
                    // dispatch(
                    //   addCartList({
                    //     cartItemId: product.id!,
                    //     product,
                    //     quantity,
                    //   })
                    // );
                    setProduct({...product,size:selectedVariant!.size});
                    dispatch(
                      addCartList({
                        cartItemId: product.id!,
                        product,
                        quantity,
                      })
                    );

                    setIsQuantityModalOpen(false);
                  }}
                >
                  <i className="fa fa-shopping-cart me-2" /> Confirm Add to Cart
                </div>
                <button
                  className="btn btn-lg btn-primary px-4"
                  onClick={() => {
                    dispatch(
                      addCartList({
                        cartItemId: product.id!,
                        product,
                        quantity,
                      })
                    );
                    setIsQuantityModalOpen(false);
                  }}                  disabled={
                    !selectedVariant ||
                    quantity < 1 ||
                    (selectedVariant.size !== "Custom" && selectedVariant.stock === 0)
                  }
                >
                  <i className="fa fa-shopping-cart me-2" />
                  Add  to Cart

                </button>
                <button
                  className="btn btn-lg btn-outline-dark px-4"
                  onClick={() => dispatch(addWishlist(product.id!))}
                >
                  <i className="fa fa-heart me-2" /> Add to Wishlist
                </button>
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <button type="button" className="btn btn-secondary" onClick={closeCustomSizeModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveCustomSize}>
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Modal */}
      {isQuantityModalOpen && product && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2002 }}
        >
          <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ maxWidth: 450}}>
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Select Quantity</h5>
              <button type="button" className="btn-close" onClick={() => setIsQuantityModalOpen(false)} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <p className="mb-1"><strong>Item:</strong> {product.name}</p>
                <p className="mb-1 text-muted"><strong>Size:</strong> {product.size}</p>
              </div>
              {product.subCategory === "rings" && (
                <div className="mb-4">
                  <strong>Available Sizes:</strong>
                  <div className="mt-2 list-group">
                    {PRODUCT_VARIANTS.map(variant => {
                      const isSelected = selectedVariant?.size === variant.size
                      const isOutOfStock = variant.stock === 0 && variant.size !== "Custom"

                      return (
                        <button
                          key={variant.sku}
                          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                            isSelected
                              ? "active bg-primary border-primary text-white"
                              : ""
                          } ${isOutOfStock ? "disabled list-group-item-light" : ""}`}
                          onClick={() => handleVariantSelect(variant)}
                          disabled={isOutOfStock}
                        >
                          <div className="d-flex flex-column align-items-start">
                          <span
                            className={`fw-bold ${isSelected ? "text-white" : "text-dark"}`}
                          >
                            {variant.size}
                          </span>
                            <small
                              className={`text-muted ${isSelected ? "text-white-50" : ""}`}
                            >
                              {variant.sku}
                            </small>
                          </div>

                          <span
                            className={`fw-semibold ${isSelected ? "text-white" : "text-success"}`}
                          >
                          ${variant.price.toFixed(2)}
                        </span>

                          {isOutOfStock && (
                            <span className="badge bg-danger ms-2">
                            Out of Stock
                          </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              <div className="d-flex align-items-center gap-3">
                <strong>Quantity:</strong>
                <div className="input-group w-50">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input type="text" className="form-control text-center" value={quantity} readOnly />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <small className="d-block mt-2 text-muted">
                ({product.size === "Custom" ? "Made to Order" : `${product.quantity} available in stock`})
              </small>
            </div>

            <div className="modal-footer d-flex justify-content-between border-top-0">
              <div  className="btn btn-secondary me-2" onClick={() => setIsQuantityModalOpen(false)}>
                Cancel
              </div>
              <div
                className="btn btn-lg btn-primary "
                onClick={() => {
                  dispatch(
                    addCartList({
                      cartItemId: product.id!,
                      product,
                      quantity,
                    })
                  );
                  setIsQuantityModalOpen(false);
                }}
              >
                <i className="fa fa-shopping-cart me-2" /> Confirm Add to Cart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
