import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductT } from "../../utils/types.ts";
import { getPostById } from "../../features/api/postActions.tsx";
import { addCartList, addWishlist } from "../../features/api/accountActions.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { categories } from "../../utils/constants.ts";

const ProductPage = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductT | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getPostById(id);
        setProduct(data);
        setSelectedImage(data.imageUrls?.[0] || null);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Error loading product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  // ---- Size & Weight helpers ----
  const displaySize =
    product.size === "custom"
      ? product.size || "Custom"
      : product.size || "-";

  const formatWeight = (grams?: number | null) => {
    if (grams == null) return "-";
    return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
  };

  return (
    <main className="container-fluid p-0">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6">
          {/* Main Image */}
          <div className="rounded shadow-sm mb-3 overflow-hidden position-relative">
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
                onClick={() => setSelectedImage(url)}
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
              <span className="text-muted me-2 text-decoration-line-through">
               ₪{(product.price * 1.3).toFixed(2)}
              </span>
              <span className="text-success fs-4 fw-semibold">
             ₪{product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-3">
              <span className="badge bg-light text-dark me-2">ID: {product.id}</span>
              <span className="badge bg-info text-white">{categoryTitle}</span>
            </div>

            <div className="mb-3">
              <strong>Status:</strong>{" "}
              {product.quantity > 0 ? (
                <span className="badge bg-success">In Stock</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
            </div>

            {/* Color */}
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

            {/* Material */}
            <div className="mb-3">
              <strong>Material:</strong>
              <div className="d-flex flex-wrap gap-2 mt-1">
                <span className="badge bg-secondary">{product.material}</span>
              </div>
            </div>

            {/* Size */}
            {product.size && (
              <div className="mb-3">
                <strong>Size:</strong>{" "}
                <span className="badge bg-light text-dark ms-1">{displaySize}</span>
              </div>
            )}

            {/* Weight */}
            {product.weight != null && (
              <div className="mb-3">
                <strong>Weight:</strong>{" "}
                <span className="ms-1">{formatWeight(product.weight)}</span>
              </div>
            )}

            {/* Description */}
            <div className="mb-3">
              <strong>Description:</strong>
              <p className="mt-1 text-break" style={{ whiteSpace: "pre-wrap" }}>
                {product.desc || "-"}
              </p>
            </div>

            <div className="mb-4">
              <strong>Created:</strong>{" "}
              {product.dateCreated
                ? new Date(product.dateCreated).toLocaleDateString()
                : "-"}
            </div>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-lg btn-primary px-4"
                onClick={() =>
                  dispatch(
                    addCartList({
                      cartItemId: product.id!,
                      product,
                      quantity: 1,
                    })
                  )
                }
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
    </main>
  );
};

export default ProductPage;
