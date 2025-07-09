import React, { useContext, useEffect, useState } from "react"
import { banner3Img, baseUrlBlog, categories } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import ProductItem from "./ProductItem.tsx"
import { motion } from "framer-motion"
import moment from "moment"
import { addWishlist } from "../../features/api/accountActions.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"

const Shop = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { id } = useParams()
  const { type } = useParams()
  const category = type ? type : id
  const [sort, setSort] = useState("dateCreated")
  const [asc, setAsc] = useState(false) // Default: date descending
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const categoryTypes = categories.find(c => c.route === id)?.types || []
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()
const  nav = useNavigate()
  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-")
    setSort(field)
    setAsc(direction === "asc")
  }

  const searchPosts = async (criteria: string, sort: string, asc: boolean) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${baseUrlBlog}/posts/${type ? "type" : "criteria"}/${criteria}/sort/${sort}/asc/${asc}`,
      )
      if (!response.ok) throw new Error("Failed to fetch products")
      const data: ProductT[] = await response.json()
      setProducts(data)
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchPosts(category!, sort, asc)
  }, [category, sort, asc, type])

  return (
    <motion.div
      id="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Banner */}
      <div className="collection-header mb-4">
        <div className="collection-hero position-relative">
          <img
            className="img-fluid w-100"
            src={banner3Img}
            alt="Shop banner"
            style={{ objectFit: "cover", maxHeight: "200px" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <motion.div
            className="col-12 col-md-3 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close Button (Mobile) */}
            <div className="d-block d-md-none mb-3 text-end">
              <button type="button" className="btn btn-outline-dark btn-sm">
                &times;
              </button>
            </div>

            {/* Categories Accordion */}
            <div
              className="accordion mb-4 shadow-sm rounded"
              id="categoryAccordion"
            >
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
                    <i className="bi bi-tags me-2"></i>
                    Categories
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
                      {categoryTypes.map((category, idx) => (
                        <motion.li
                          key={idx}
                          className="list-group-item px-3 py-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <Link
                            to={`/category/${id}/${category.route}`}
                            className="d-block text-decoration-none rounded fw-medium text-dark hover-transition"
                          >
                            <i className="bi bi-chevron-right me-2 text-muted small"></i>
                            {category.title}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Filter */}
            <motion.div
              className="mb-4 p-3 border rounded shadow-sm bg-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h6 className="fw-semibold mb-3">
                <i className="bi bi-cash-coin me-2"></i>
                Filter by Price
              </h6>
              <form>
                <input
                  type="range"
                  className="form-range"
                  id="priceRange"
                  min="0"
                  max="1000"
                />
                <div className="d-flex justify-content-between mb-3 text-muted small">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
                <div className="input-group input-group-sm">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                  />
                  <span className="input-group-text">-</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                  />
                </div>
                <button className="btn btn-dark btn-sm w-100 mt-3">
                  Apply Filter
                </button>
              </form>
            </motion.div>

            {/* Static Banner */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="src/images/side-banner-2.jpg"
                alt="Promo banner"
                className="img-fluid rounded shadow-sm"
                style={{
                  objectFit: "cover",
                  maxHeight: "220px",
                  width: "100%",
                }}
              />
            </motion.div>
          </motion.div>
          <div className="col-sm-12 col-md-9 col-lg-9 main-col">
            {/* Search Bar */}
            <motion.div
              className="mb-3 input-group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-dark">
                <i className="fa fa-search" />
              </button>
            </motion.div>

            <hr />

            {/* Toolbar + Product Grid */}
            <div className="productList product-load-more">
              <button
                type="button"
                className="btn btn-filter d-block d-md-none d-lg-none"
              >
                Product Filters
              </button>

              {/* Sort Dropdown */}
              <div className="toolbar">
                <select
                  onChange={e => handleSortChange(e.target.value)}
                  className="filters-toolbar__input filters-toolbar__input--sort"
                  defaultValue="date-desc"
                >
                  <option value="name-asc">Alphabetically, A–Z</option>
                  <option value="name-desc">Alphabetically, Z–A</option>
                  <option value="sell-asc">Price, low to high</option>
                  <option value="sell-desc">Price, high to low</option>
                  <option value="dateCreated-desc">Date, new to old</option>
                  <option value="dateCreated-asc">Date, old to new</option>
                </select>
              </div>

              {/* Loading / Error / Grid */}
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
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {products
                      .filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map(p => (
                        <motion.div
                          key={p.id}
                          className="col "
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="card rounded border shadow  h-100"
                          onClick={()=>nav(`/product/${p.id}`)}
                          >
                            <img
                              src={p.imageUrl}
                              className="card-img-top h-100 w-100 object-fit-cove"
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

                                {token &&
                                  user.roles.includes("ADMINISTRATOR") && (
                                    <div className="edit-btn">
                                      <Link
                                        className="edit add-to-compare"
                                        to={`/product/edit/${p.id}`}
                                        title="Add to Compare"
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

                                <s className="old-price ">
                                  ${(p.sell + p.sell / 3).toFixed(2)}
                                </s>

                                <span className="price text-danger"> ${p.sell}</span>
                              </p>
                            </div>
                            <div className="card-footer fw-light small" >
                              {moment(p.dateCreated).format("MMMM DD, YYYY")}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Load More Button */}
            <div className="infinitpaginOuter text-center mt-4">
              <motion.button
                className="btn btn-outline-dark btn-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Shop
