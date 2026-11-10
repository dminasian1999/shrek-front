import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { ProductT } from "../../utils/types"
import { getPostByIds } from "../../features/api/postActions"
import { removeWishlist } from "../../features/api/accountActions"
import { money, productStock } from "../../utils/commerce"

const WishList = () => {
  const {
    profile,
    loading: saving,
    errorMessage,
  } = useAppSelector(state => state.user)
  const token = useAppSelector(state => state.token)
  const [products, setProducts] = useState<ProductT[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [retry, setRetry] = useState(0)
  const dispatch = useAppDispatch()
  useEffect(() => {
    let active = true
    setProducts([])
    setError("")
    if (!token || !profile.wishList?.length) {
      setLoading(false)
      return
    }
    setLoading(true)
    getPostByIds(profile.wishList, token)
      .then(data => {
        if (active) setProducts(data)
      })
      .catch(() => {
        if (active)
          setError("Your wishlist could not be loaded. Please try again.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [token, profile.wishList, retry])
  return (
    <div className="container py-4 py-md-5">
      <h1 className="mb-4">Your wishlist</h1>
      {!token ? (
        <>
          <p>Sign in to save and view your favorite pieces.</p>
          <Link className="btn" to="/login">
            Sign in
          </Link>
        </>
      ) : loading ? (
        <p role="status">Loading your wishlist…</p>
      ) : error ? (
        <div>
          <p role="alert">{error}</p>
          <button className="btn" onClick={() => setRetry(value => value + 1)}>
            Try again
          </button>
        </div>
      ) : !products.length ? (
        <>
          <p>Your wishlist is empty. Save pieces you love while you browse.</p>
          <Link className="btn" to="/shop">
            Explore the shop
          </Link>
        </>
      ) : (
        <>
          {errorMessage && (
            <p role="alert" className="text-danger">
              {errorMessage}
            </p>
          )}
          <div className="row g-4">
            {products.map(product => (
              <article className="col-6 col-md-4 col-lg-3" key={product.id}>
                <div className="border rounded h-100 overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.imageUrls?.[0] || "/product-placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="w-100"
                      style={{ aspectRatio: "1", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="p-3">
                    <h2 className="h6">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h2>
                    <p>{money(product.price)}</p>
                    <p className="small text-muted">
                      {productStock(product) > 0 ? "In stock" : "Out of stock"}
                    </p>
                    <Link
                      className="btn w-100 mb-2"
                      to={`/product/${product.id}`}
                    >
                      View item
                    </Link>
                    <button
                      className="btn btn-outline-secondary w-100"
                      disabled={saving}
                      onClick={() => void dispatch(removeWishlist(product.id!))}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default WishList
