import { useEffect, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import { baseUrlBlog, collections } from "../../utils/constants.ts"
import type { ProductT } from "../../utils/types.ts"
import ProductItem from "./ProductItem.tsx"
import "./catalog.css"

const emptyFilters = {
  minPrice: "",
  maxPrice: "",
  material: "",
  color: "",
  dateFrom: "",
  dateTo: "",
}
const pageSize = 12

const Shop = () => {
  const { category, id, type } = useParams()
  const activeCategory = category || id
  const [products, setProducts] = useState<ProductT[]>([])
  const [sort, setSort] = useState("dateCreated-desc")
  const [search, setSearch] = useState("")
  const [draftFilters, setDraftFilters] = useState(emptyFilters)
  const [filters, setFilters] = useState(emptyFilters)
  const [validation, setValidation] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setLoading(true)
    setError("")
    setPage(1)
    const timer = window.setTimeout(async () => {
      const [sortField, direction] = sort.split("-")
      try {
        const response = await fetch(`${baseUrlBlog}/posts/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            sortField,
            asc: direction === "asc",
            category: activeCategory || undefined,
            subCategory: type || undefined,
            name: search.trim() || undefined,
            minPrice:
              filters.minPrice === "" ? undefined : Number(filters.minPrice),
            maxPrice:
              filters.maxPrice === "" ? undefined : Number(filters.maxPrice),
            material: filters.material.trim() || undefined,
            color: filters.color.trim() || undefined,
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
          }),
        })
        if (!response.ok)
          throw new Error("We couldn't load the products. Please try again.")
        const data: unknown = await response.json()
        if (!Array.isArray(data))
          throw new Error("The product list is temporarily unavailable.")
        if (active) setProducts(data)
      } catch (failure: unknown) {
        if (active && !controller.signal.aborted) {
          setError(
            failure instanceof Error
              ? failure.message
              : "We couldn't load the products. Please try again.",
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }, 250)
    return () => {
      active = false
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [activeCategory, type, sort, search, filters, retry])

  const applyFilters = (event: FormEvent) => {
    event.preventDefault()
    if (
      draftFilters.minPrice !== "" &&
      draftFilters.maxPrice !== "" &&
      Number(draftFilters.minPrice) > Number(draftFilters.maxPrice)
    ) {
      setValidation(
        "Minimum price must be less than or equal to maximum price.",
      )
      return
    }
    if (
      draftFilters.dateFrom &&
      draftFilters.dateTo &&
      draftFilters.dateFrom > draftFilters.dateTo
    ) {
      setValidation("The start date must be on or before the end date.")
      return
    }
    setValidation("")
    setFilters({ ...draftFilters })
  }
  const resetFilters = () => {
    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setSearch("")
    setValidation("")
  }
  const title =
    collections.find(item => item.route === activeCategory)?.title ||
    activeCategory?.replace(/-/g, " ") ||
    "Shop all gifts"
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visibleProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  return (
    <section className="catalog-page container" aria-labelledby="catalog-title">
      <header className="catalog-intro">
        <p className="catalog-eyebrow">A little piece of Jerusalem</p>
        <h1 id="catalog-title">{type ? type.replace(/-/g, " ") : title}</h1>
        <p>Explore ceramics, jewelry and meaningful gifts, chosen with care.</p>
      </header>
      <div className="catalog-layout">
        <aside className="catalog-sidebar" aria-label="Product filters">
          <details className="catalog-filters">
            <summary>Categories &amp; filters</summary>
            <div className="catalog-filter-content">
              <nav aria-label="Shop categories">
                <h2>Collections</h2>
                <Link
                  to="/shop"
                  aria-current={!activeCategory ? "page" : undefined}
                >
                  All gifts
                </Link>
                {collections.map(item => (
                  <Link
                    key={item.route}
                    to={`/shop/${item.route}`}
                    aria-current={
                      activeCategory === item.route ? "page" : undefined
                    }
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <form onSubmit={applyFilters} className="catalog-filter-form">
                <h2>Refine your search</h2>
                <div className="catalog-price-inputs">
                  <label htmlFor="catalog-min-price">
                    Min price ($)
                    <input
                      id="catalog-min-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={draftFilters.minPrice}
                      onChange={event =>
                        setDraftFilters({
                          ...draftFilters,
                          minPrice: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label htmlFor="catalog-max-price">
                    Max price ($)
                    <input
                      id="catalog-max-price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={draftFilters.maxPrice}
                      onChange={event =>
                        setDraftFilters({
                          ...draftFilters,
                          maxPrice: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <label htmlFor="catalog-material">
                  Material
                  <input
                    id="catalog-material"
                    type="text"
                    maxLength={100}
                    value={draftFilters.material}
                    onChange={event =>
                      setDraftFilters({
                        ...draftFilters,
                        material: event.target.value,
                      })
                    }
                  />
                </label>
                <label htmlFor="catalog-color">
                  Color
                  <input
                    id="catalog-color"
                    type="text"
                    maxLength={100}
                    value={draftFilters.color}
                    onChange={event =>
                      setDraftFilters({
                        ...draftFilters,
                        color: event.target.value,
                      })
                    }
                  />
                </label>
                <details className="catalog-date-filter">
                  <summary>Date added</summary>
                  <label htmlFor="catalog-date-from">
                    From
                    <input
                      id="catalog-date-from"
                      type="date"
                      value={draftFilters.dateFrom}
                      onChange={event =>
                        setDraftFilters({
                          ...draftFilters,
                          dateFrom: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label htmlFor="catalog-date-to">
                    To
                    <input
                      id="catalog-date-to"
                      type="date"
                      value={draftFilters.dateTo}
                      onChange={event =>
                        setDraftFilters({
                          ...draftFilters,
                          dateTo: event.target.value,
                        })
                      }
                    />
                  </label>
                </details>
                {validation && (
                  <p role="alert" className="text-danger">
                    {validation}
                  </p>
                )}
                <button type="submit" className="btn btn-dark">
                  Apply filters
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
              </form>
            </div>
          </details>
        </aside>
        <div className="catalog-results" aria-busy={loading}>
          <div className="catalog-toolbar">
            <label className="catalog-search" htmlFor="catalog-search">
              Search gifts
              <input
                id="catalog-search"
                type="search"
                placeholder="Search by name"
                maxLength={100}
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
            </label>
            <label htmlFor="catalog-sort">
              Sort by
              <select
                id="catalog-sort"
                value={sort}
                onChange={event => setSort(event.target.value)}
              >
                <option value="dateCreated-desc">Newest</option>
                <option value="dateCreated-asc">Oldest</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
              </select>
            </label>
          </div>
          {loading ? (
            <div className="catalog-state" role="status">
              <span className="spinner-border" aria-hidden="true" />
              <p>Finding your next favorite gift…</p>
            </div>
          ) : error ? (
            <div className="catalog-state" role="alert">
              <h2>Products are unavailable</h2>
              <p>{error}</p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setRetry(value => value + 1)}
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="catalog-state">
              <h2>No gifts found</h2>
              <p>
                Try a different search or clear your filters to explore more.
              </p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={resetFilters}
              >
                Clear filters
              </button>
              <Link to="/shop">Browse all gifts</Link>
            </div>
          ) : (
            <>
              <p className="catalog-count" role="status">
                {products.length} {products.length === 1 ? "gift" : "gifts"}{" "}
                found
              </p>
              <div className="catalog-grid">
                {visibleProducts.map(product => (
                  <ProductItem key={product.id} p={product} />
                ))}
              </div>
              {pageCount > 1 && (
                <nav className="catalog-pagination" aria-label="Product pages">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={currentPage <= 1}
                    onClick={() => setPage(value => Math.max(1, value - 1))}
                  >
                    Previous
                  </button>
                  <span aria-live="polite">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={currentPage >= pageCount}
                    onClick={() =>
                      setPage(value => Math.min(pageCount, value + 1))
                    }
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Shop
