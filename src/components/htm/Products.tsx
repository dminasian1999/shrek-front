import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { baseUrlBlog } from "../../utils/constants"
import { money, productStock } from "../../utils/commerce"
import { responseError } from "../../utils/http"
import type { ProductT } from "../../utils/types"

export default function Products() {
  const token = useAppSelector(state => state.token)
  const [products, setProducts] = useState<ProductT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [retry, setRetry] = useState(0)
  const [removing, setRemoving] = useState("")
  const [confirmation, setConfirmation] = useState<ProductT | null>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (confirmation) confirmationRef.current?.focus()
  }, [confirmation])

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setLoading(true)
    setError("")
    const load = async () => {
      try {
        const response = await fetch(`${baseUrlBlog}/posts`, {
          signal: controller.signal,
        })
        if (!response.ok)
          throw await responseError(
            response,
            "The product list could not be loaded.",
          )
        const data = (await response.json()) as ProductT[]
        if (active) setProducts(data)
      } catch (cause: unknown) {
        if (active && !controller.signal.aborted)
          setError(
            cause instanceof Error
              ? cause.message
              : "The product list could not be loaded.",
          )
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
      controller.abort()
    }
  }, [retry])

  const remove = async (product: ProductT) => {
    if (!product.id || removing) return
    setRemoving(product.id)
    setError("")
    setMessage("")
    try {
      const response = await fetch(
        `${baseUrlBlog}/post/${encodeURIComponent(product.id)}`,
        { method: "DELETE", headers: { Authorization: token } },
      )
      if (!response.ok)
        throw await responseError(
          response,
          "The product could not be deleted. Please try again.",
        )
      setProducts(previous => previous.filter(item => item.id !== product.id))
      setConfirmation(null)
      setMessage(`${product.name} was deleted.`)
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The product could not be deleted.",
      )
    } finally {
      setRemoving("")
    }
  }

  return (
    <section
      className="border-top pt-4 mt-4"
      aria-labelledby="manage-products-title"
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <h2 id="manage-products-title" className="mb-0">
          Manage products
        </h2>
        <Link className="btn" to="/new">
          Add product
        </Link>
      </div>
      {error && (
        <p className="alert alert-danger" role="alert">
          {error}{" "}
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={() => setRetry(value => value + 1)}
          >
            Reload list
          </button>
        </p>
      )}
      {message && (
        <p className="alert alert-success" role="status">
          {message}
        </p>
      )}
      {confirmation && (
        <div
          ref={confirmationRef}
          className="alert alert-warning"
          role="alert"
          tabIndex={-1}
        >
          <p>
            Delete <strong>{confirmation.name}</strong>? This removes the
            product from the shop.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-danger"
              disabled={Boolean(removing)}
              onClick={() => void remove(confirmation)}
            >
              {removing ? "Deleting…" : "Confirm deletion"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={Boolean(removing)}
              onClick={() => setConfirmation(null)}
            >
              Cancel deletion
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <p role="status">Loading products…</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <caption className="visually-hidden">
              Store products and available inventory
            </caption>
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                <th scope="col">Weight</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img
                      height={70}
                      width={70}
                      className="object-fit-contain rounded border"
                      src={product.imageUrls?.[0] || "/product-placeholder.svg"}
                      alt=""
                      onError={event => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = "/product-placeholder.svg"
                      }}
                    />
                  </td>
                  <th scope="row">
                    <Link
                      to={`/product/${encodeURIComponent(product.id || "")}`}
                    >
                      {product.name}
                    </Link>
                  </th>
                  <td>{product.category}</td>
                  <td>{productStock(product)}</td>
                  <td>
                    {product.weight ? `${product.weight} g` : "Needs weight"}
                  </td>
                  <td>{money(product.price)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        className="btn btn-outline-secondary"
                        to={`/product/edit/${encodeURIComponent(product.id || "")}`}
                        aria-label={`Edit ${product.name}`}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        disabled={Boolean(removing)}
                        onClick={() => {
                          setConfirmation(product)
                          setMessage("")
                        }}
                        aria-label={`Delete ${product.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !error && (
                <tr>
                  <td colSpan={7} className="py-4 text-center">
                    No products yet. Add your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
