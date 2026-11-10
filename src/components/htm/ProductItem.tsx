import { Link } from "react-router-dom"
import type { ProductT } from "../../utils/types.ts"
import "./catalog.css"

const ProductItem = ({ p }: { p: ProductT }) => (
  <article className="catalog-card">
    <Link
      className="catalog-card-link"
      to={`/product/${encodeURIComponent(p.id || "")}`}
    >
      <div className="catalog-card-image">
        <img
          src={p.imageUrls?.[0] || "/product-placeholder.svg"}
          onError={event => {
            event.currentTarget.onerror = null
            event.currentTarget.src = "/product-placeholder.svg"
          }}
          alt={p.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
        />
      </div>
      <div className="catalog-card-body">
        <p className="catalog-card-category">
          {p.category?.replace(/-/g, " ")}
        </p>
        <h2>{p.name}</h2>
        {p.desc && <p className="catalog-card-description">{p.desc}</p>}
        <div className="catalog-card-meta">
          <strong>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(p.price)}
          </strong>
          <span
            className={
              p.quantity > 0 ? "catalog-in-stock" : "catalog-out-stock"
            }
          >
            {p.quantity > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  </article>
)

export default ProductItem
