import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { baseUrlBlog } from "../../utils/constants"
import { responseError } from "../../utils/http"
import type { ProductT } from "../../utils/types"
import ProductEditor from "./ProductEditor"

export default function EditProduct() {
  const { id = "" } = useParams()
  const [product, setProduct] = useState<ProductT | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setLoading(true)
    setError("")
    const load = async () => {
      try {
        const response = await fetch(
          `${baseUrlBlog}/post/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        )
        if (!response.ok)
          throw await responseError(
            response,
            "The product could not be loaded.",
          )
        const data = (await response.json()) as ProductT
        if (active) setProduct(data)
      } catch (cause: unknown) {
        if (active && !controller.signal.aborted)
          setError(
            cause instanceof Error
              ? cause.message
              : "The product could not be loaded.",
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
  }, [id, retry])

  if (loading)
    return (
      <section className="container py-5" role="status">
        <h1>Edit product</h1>
        <p>Loading product details…</p>
      </section>
    )
  if (error || !product)
    return (
      <section className="container py-5">
        <h1>Edit product</h1>
        <p className="alert alert-danger" role="alert">
          {error || "Product not found."}
        </p>
        <button
          type="button"
          className="btn me-3"
          onClick={() => setRetry(value => value + 1)}
        >
          Try again
        </button>
        <Link to="/account">Back to account</Link>
      </section>
    )
  return <ProductEditor key={id} initialProduct={product} productId={id} />
}
