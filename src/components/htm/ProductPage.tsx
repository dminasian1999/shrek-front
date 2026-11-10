import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { ProductT } from "../../utils/types"
import { getPostById } from "../../features/api/postActions"
import { addCartList, addWishlist } from "../../features/api/accountActions"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { money, productStock, commerceError } from "../../utils/commerce"

const ProductPage = () => {
  const { id = "" } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(state => state.token)
  const busy = useAppSelector(state => state.user.loading)
  const [product, setProduct] = useState<ProductT | null>(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError("")
    setProduct(null)
    getPostById(id)
      .then(data => {
        if (active) {
          setProduct(data)
          setSelectedSize(
            data.sizeQuantities?.find(variant => variant.quantity > 0)?.size ||
              "",
          )
          setSelectedImage(data.imageUrls?.[0] || "/product-placeholder.svg")
        }
      })
      .catch(() => {
        if (active)
          setError(
            "This product could not be loaded. It may no longer be available.",
          )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id, retry])

  const add = async (wishlist: boolean) => {
    if (!token) {
      navigate("/login", {
        state: { from: `/product/${encodeURIComponent(id)}` },
      })
      return
    }
    if (!product?.id) return
    setMessage("")
    setError("")
    try {
      if (wishlist) await dispatch(addWishlist(product.id)).unwrap()
      else
        await dispatch(
          addCartList({
            cartItemId: `${product.id}:${encodeURIComponent(selectedSize)}`,
            product,
            selectedSize,
            quantity: 1,
          }),
        ).unwrap()
      setMessage(wishlist ? "Saved to your wishlist." : "Added to your cart.")
    } catch (cause) {
      setError(
        commerceError(cause, "Unable to save this item. Please try again."),
      )
    }
  }

  if (loading)
    return (
      <div className="container py-5" role="status">
        Loading product…
      </div>
    )
  if (!product)
    return (
      <div className="container py-5">
        <h1>Product unavailable</h1>
        <p role="alert">{error}</p>
        <button className="btn" onClick={() => setRetry(value => value + 1)}>
          Try again
        </button>{" "}
        <Link to="/shop">Browse the shop</Link>
      </div>
    )

  return (
    <div className="container py-4 py-md-5">
      <nav aria-label="Breadcrumb" className="mb-4">
        <Link to="/shop">Shop</Link> <span aria-hidden="true">/</span>{" "}
        <span>{product.name}</span>
      </nav>
      <div className="row g-4 g-lg-5">
        <div className="col-md-6">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-100 rounded"
            style={{
              aspectRatio: "1",
              objectFit: "contain",
              background: "#f5f2ee",
            }}
            onError={event => {
              event.currentTarget.src = "/product-placeholder.svg"
            }}
          />
          {product.imageUrls?.length > 1 && (
            <div className="d-flex gap-2 overflow-auto py-3">
              {product.imageUrls.map((url, index) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setSelectedImage(url)}
                  aria-label={`View ${product.name}, image ${index + 1}`}
                  aria-pressed={selectedImage === url}
                  className="p-1 bg-white rounded"
                  style={{
                    flex: "0 0 72px",
                    border:
                      selectedImage === url
                        ? "2px solid #8f392a"
                        : "1px solid #ddd",
                  }}
                >
                  <img
                    src={url}
                    alt=""
                    width={64}
                    height={64}
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <p className="text-uppercase text-muted small">
            {product.category?.replace(/-/g, " ")}
          </p>
          <h1 className="mb-3">{product.name}</h1>
          <p className="fs-3 fw-semibold">{money(product.price)}</p>
          <p>
            {productStock(product, selectedSize) > 0
              ? "In stock"
              : "Currently out of stock"}
          </p>
          {Boolean(product.sizeQuantities?.length) && (
            <div className="mb-4">
              <label htmlFor="product-size" className="form-label">
                Size / option
              </label>
              <select
                id="product-size"
                className="form-select"
                value={selectedSize}
                onChange={event => setSelectedSize(event.target.value)}
              >
                {product.sizeQuantities!.map(variant => (
                  <option
                    value={variant.size}
                    key={variant.size}
                    disabled={variant.quantity <= 0}
                  >
                    {variant.size}
                    {variant.quantity <= 0 ? " — out of stock" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          <p style={{ whiteSpace: "pre-wrap" }}>{product.desc}</p>
          {(product.material || product.color) && (
            <dl className="row border-top border-bottom py-3 my-4">
              {product.material && (
                <>
                  <dt className="col-4">Material</dt>
                  <dd className="col-8">{product.material}</dd>
                </>
              )}
              {product.color && (
                <>
                  <dt className="col-4">Color</dt>
                  <dd className="col-8">{product.color}</dd>
                </>
              )}
            </dl>
          )}
          {error && (
            <p role="alert" className="text-danger">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="text-success">
              {message}{" "}
              {!message.includes("wishlist") && (
                <Link to="/cart">View cart</Link>
              )}
            </p>
          )}
          <div className="d-flex flex-wrap gap-3">
            <button
              type="button"
              className="btn flex-grow-1"
              disabled={busy || productStock(product, selectedSize) <= 0}
              onClick={() => void add(false)}
            >
              {productStock(product, selectedSize) <= 0
                ? "Out of stock"
                : busy
                  ? "Saving…"
                  : "Add to cart"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={busy}
              onClick={() => void add(true)}
            >
              Save to wishlist
            </button>
          </div>
          {!token && (
            <p className="small text-muted mt-3">
              Sign in to save items and check out.
            </p>
          )}
          <p className="small text-muted mt-4">
            Shipping is calculated from your delivery address at checkout.
          </p>
        </div>
      </div>
    </div>
  )
}
export default ProductPage
