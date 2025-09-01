import React, { useContext, useEffect, useState } from "react"
import { banner3Img, baseUrlBlog, collections } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductT, QueryT } from "../../utils/types.ts"
import { motion } from "framer-motion"
import moment from "moment"
import { addWishlist } from "../../features/api/accountActions.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"

const Shop = () => {
  const { products, setProducts, language } = useContext(ProductsContext)

  const { category } = useParams()
  const [sort, setSort] = useState("dateCreated")
  const [asc, setAsc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // New filters
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()
  const [material, setMaterial] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [dateFrom, setDateFrom] = useState<string>("") // yyyy-mm-dd string for input[type=date]
  const [dateTo, setDateTo] = useState<string>("")

  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-")
    setSort(field)
    setAsc(direction === "asc")
  }

  const fetchProducts = async (query: QueryT) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrlBlog}/posts/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(query),
      })
      if (!response.ok) throw new Error("Failed to fetch products")
      const data: ProductT[] = await response.json()
      setProducts(data)
      setCurrentPage(1)
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const refetchWithQuery = () => {
    const query: QueryT = {
      sortField: sort,
      asc,
      category: category || undefined,
      name: searchTerm || undefined,
      minPrice,
      maxPrice,
      material: material || undefined,
      color: color || undefined,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
    }
    fetchProducts(query)
  }

  useEffect(() => {
    refetchWithQuery()
  }, [category, sort, asc])

  // You may want to refetch when filters change
  useEffect(() => {
    refetchWithQuery()
  }, [minPrice, maxPrice, material, color, dateFrom, dateTo])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  return (
    <motion.div
      id="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="collection-header mb-4">
        <div className="collection-hero position-relative">
          <img
            className="img-fluid w-100"
            src={banner3Img}
            alt="Shop banner"
            style={{ objectFit: "cover", maxHeight: "200px" }}
          />
          <h1 className="position-absolute top-50 start-50 translate-middle text-white text-center text-uppercase">
            {category}
          </h1>
        </div>
      </div>

      <div className="container p-1">
        <div className="row">
          <motion.div
            className="col-12 col-md-3 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Categories Accordion */}
            <div className="accordion mb-4 shadow-sm rounded" id="categoryAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id="headingCategories">
                  <button
                    className="accordion-button fw-bold bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCategories"
                    aria-expanded="true"
                    aria-controls="collapseCategories"
                  >
                    <i className="bi bi-tags me-2"></i>Categories
                  </button>
                </h2>
                <div
                  id="collapseCategories"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingCategories"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="list-group list-group-flush">
                      {collections.map((cat, idx) => (
                        <motion.li
                          key={idx}
                          className="list-group-item px-3 py-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <Link
                            to={`/shop/${cat.route}`}
                            className="d-block text-decoration-none rounded fw-medium text-dark hover-transition"
                          >
                            <i className="bi bi-chevron-right me-2 text-muted small"></i>
                            {cat.title}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Filter Accordion */}
            <div className="accordion mb-4 shadow-sm rounded" id="priceAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id="headingPrice">
                  <button
                    className="accordion-button fw-bold bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePrice"
                    aria-expanded="true"
                    aria-controls="collapsePrice"
                  >
                    <i className="bi bi-tags me-2"></i>Filter by Price
                  </button>
                </h2>
                <div
                  id="collapsePrice"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingPrice"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <motion.div
                      className="mb-4 p-3 border rounded shadow-sm bg-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h6 className="fw-semibold mb-3">
                        <i className="bi bi-cash-coin me-2"></i>Filter by Price
                      </h6>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          refetchWithQuery()
                        }}
                      >
                        <div className="input-group input-group-sm">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Min"
                            value={minPrice ?? ""}
                            onChange={e =>
                              setMinPrice(e.target.value ? +e.target.value : undefined)
                            }
                            min={0}
                          />
                          <span className="input-group-text">-</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Max"
                            value={maxPrice ?? ""}
                            onChange={e =>
                              setMaxPrice(e.target.value ? +e.target.value : undefined)
                            }
                            min={0}
                          />
                        </div>
                        <button className="btn btn-dark btn-sm w-100 mt-3" type="submit">
                          Apply Filter
                        </button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Material Filter */}
            <div className="accordion mb-4 shadow-sm rounded" id="materialAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id="headingMaterial">
                  <button
                    className="accordion-button fw-bold bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseMaterial"
                    aria-expanded="true"
                    aria-controls="collapseMaterial"
                  >
                    <i className="bi bi-tags me-2"></i>Filter by Material
                  </button>
                </h2>
                <div
                  id="collapseMaterial"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingMaterial"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <motion.div
                      className="mb-4 p-3 border rounded shadow-sm bg-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h6 className="fw-semibold mb-3">
                        <i className="bi bi-tag me-2"></i>Material
                      </h6>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          refetchWithQuery()
                        }}
                      >
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Material"
                          value={material}
                          onChange={e => setMaterial(e.target.value)}
                        />
                        <button className="btn btn-dark btn-sm w-100 mt-3" type="submit">
                          Apply Filter
                        </button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div className="accordion mb-4 shadow-sm rounded" id="colorAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id="headingColor">
                  <button
                    className="accordion-button fw-bold bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseColor"
                    aria-expanded="true"
                    aria-controls="collapseColor"
                  >
                    <i className="bi bi-palette me-2"></i>Filter by Color
                  </button>
                </h2>
                <div
                  id="collapseColor"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingColor"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <motion.div
                      className="mb-4 p-3 border rounded shadow-sm bg-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h6 className="fw-semibold mb-3">
                        <i className="bi bi-droplet me-2"></i>Color
                      </h6>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          refetchWithQuery()
                        }}
                      >
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Color"
                          value={color}
                          onChange={e => setColor(e.target.value)}
                        />
                        <button className="btn btn-dark btn-sm w-100 mt-3" type="submit">
                          Apply Filter
                        </button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="accordion mb-4 shadow-sm rounded" id="dateAccordion">
              <div className="accordion-item border-0">
                <h2 className="accordion-header" id="headingDate">
                  <button
                    className="accordion-button fw-bold bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseDate"
                    aria-expanded="true"
                    aria-controls="collapseDate"
                  >
                    <i className="bi bi-calendar-event me-2"></i>Filter by Date
                  </button>
                </h2>
                <div
                  id="collapseDate"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingDate"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <motion.div
                      className="mb-4 p-3 border rounded shadow-sm bg-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h6 className="fw-semibold mb-3">
                        <i className="bi bi-calendar-range me-2"></i>Date Range
                      </h6>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          refetchWithQuery()
                        }}
                      >
                        <div className="mb-2">
                          <label htmlFor="dateFrom" className="form-label">
                            From
                          </label>
                          <input
                            type="date"
                            id="dateFrom"
                            className="form-control form-control-sm"
                            value={dateFrom}
                            onChange={e => setDateFrom(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="dateTo" className="form-label">
                            To
                          </label>
                          <input
                            type="date"
                            id="dateTo"
                            className="form-control form-control-sm"
                            value={dateTo}
                            onChange={e => setDateTo(e.target.value)}
                          />
                        </div>
                        <button className="btn btn-dark btn-sm w-100 mt-3" type="submit">
                          Apply Filter
                        </button>
                      </form>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="col-sm-12 col-md-9 col-lg-9 main-col">
            <motion.div
              className="mb-3 input-group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button className="btn btn-outline-dark">
                <i className="fa fa-search" />
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  refetchWithQuery()
                }}
              />

              <div className="toolbar border-1">
                <select
                  onChange={e => handleSortChange(e.target.value)}
                  className="form-select w-auto"
                  defaultValue="dateCreated-desc"
                >
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                  <option value="price-asc">Price low to high</option>
                  <option value="price-desc">Price high to low</option>
                  <option value="dateCreated-desc">Newest</option>
                  <option value="dateCreated-asc">Oldest</option>
                </select>
              </div>
            </motion.div>

            <hr />

            <div className="productList product-load-more">
              {loading ? (
                <div className="text-center my-5">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <p className="text-danger">Error: {error}</p>
              ) : (
                <motion.div
                  className="grid-products grid--view-items"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                >
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {paginatedProducts.map(p => (
                      <motion.div
                        key={p.id}
                        className="col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <a className="card rounded border shadow h-100" href={`/product/${p.id}`}>
                          <img
                            src={p.imageUrls[0]}
                            className="card-img-top h-100 w-100 object-fit-cover"
                            alt={p.name}
                          />
                          <div className="card-img-overlay p-0 btn-group d-flex flex-column align-items-end ">
                            <div className="">
                              <a
                                onClick={() => dispatch(addWishlist(p.id!))}
                                className="wishlist add-to-wishlist"
                                href="#"
                                title="Add to Wishlist"
                              >
                                <i className="icon anm anm-heart-l"></i>
                              </a>
                              {token && user.roles.includes("ADMINISTRATOR") && (
                                <div className="edit-btn">
                                  <Link
                                    className="edit add-to-compare"
                                    to={`/product/edit/${p.id}`}
                                    title="Edit"
                                  >
                                    <i className="icon anm anm-edit-l"></i>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text ">
                              <p className={"text-truncate"}>{p.desc}</p>
                              <s className="old-price">₪{(p.price + p.price / 3).toFixed(2)}</s>
                              <span className="price text-danger"> ₪{p.price}</span>
                            </p>
                          </div>
                          <div className="card-footer fw-light small">
                            {moment(p.dateCreated).format("MMMM DD, YYYY")}
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Pagination */}
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Previous
              </button>
              <span className="mx-2">
                {currentPage} / {totalPages}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm ms-2"
                disabled={currentPage === totalPages}
                onClick={() => {
                  window.scrollTo(0, 0)
                  setCurrentPage(p => p + 1)
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Shop
