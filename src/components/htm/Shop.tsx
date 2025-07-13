import React, { useContext, useEffect, useState } from "react"
import { banner3Img, baseUrlBlog, categories, collections } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import ProductItem from "./ProductItem.tsx"
import { motion } from "framer-motion"
import moment from "moment"
import { addWishlist } from "../../features/api/accountActions.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"

const Shop = () => {
  const { products, setProducts ,language} = useContext(ProductsContext)

  const { category } = useParams()
  const [sort, setSort] = useState("dateCreated")
  const [asc, setAsc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-")
    setSort(field)
    setAsc(direction === "asc")
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseUrlBlog}/posts`)
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
      const data: ProductT[] = await res.json()
      setProducts(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  const searchPosts = async (criteria: string, sort: string, asc: boolean) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${baseUrlBlog}/posts/criteria/${criteria}/sort/${sort}/asc/${asc}`,
      )
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

  useEffect(() => {
    if (category){
      searchPosts(category!, sort, asc)
    }else {
      fetchProducts()
    }

  }, [category, sort, asc])
  useEffect(() => {
    window.scroll(0, 0)
  }, [setCurrentPage,currentPage])

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
                    {language === "Armenian"
                      ? "Կատեգորիաներ"
                      : language === "Russian"
                        ? "Категории"
                        : "Categories"}
                  </button>
                </h2>
                <div
                  id="collapseCategories"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingCategories"
                  data-bs-parent="#categoryAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="list-group list-group-flush">
                      {collections.map((category, idx) => (
                        <motion.li
                          key={idx}
                          className="list-group-item px-3 py-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <Link
                            to={`/shop/${category.route}`}
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

            <div
              className="accordion mb-4 shadow-sm rounded"
              id="priceAccordion"
            >
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
                    <i className="bi bi-tags me-2"></i>
                    {language === "Armenian"
                      ? "Գնային ֆիլտր"
                      : language === "Russian"
                        ? "Фильтр по цене"
                        : "Filter by Price"}
                  </button>
                </h2>
                <div
                  id="collapsePrice"
                  className="accordion-collapse collapse"
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
                        <i className="bi bi-cash-coin me-2"></i>
                        {language === "Armenian"
                          ? "Գնային ֆիլտր"
                          : language === "Russian"
                            ? "Фильтр по цене"
                            : "Filter by Price"}
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
                            placeholder={
                              language === "Armenian"
                                ? "Նվազագույն"
                                : language === "Russian"
                                  ? "Минимум"
                                  : "Min"
                            }
                          />
                          <span className="input-group-text">-</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder={
                              language === "Armenian"
                                ? "Առավելագույն"
                                : language === "Russian"
                                  ? "Максимум"
                                  : "Max"
                            }
                          />
                        </div>
                        <button className="btn btn-dark btn-sm w-100 mt-3" type="submit">
                          {language === "Armenian"
                            ? "Կիրառել ֆիլտրը"
                            : language === "Russian"
                              ? "Применить фильтр"
                              : "Apply Filter"}
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
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === "Armenian"
                    ? "Փնտրել ապրանքներ..."
                    : language === "Russian"
                      ? "Поиск товаров..."
                      : "Search products..."
                }
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />

              <button className="btn btn-outline-dark">
                <i className="fa fa-search" />
              </button>
            </motion.div>

            <hr />

            <div className="productList product-load-more">
              <div className="toolbar">
                <select
                  onChange={e => handleSortChange(e.target.value)}
                  className="filters-toolbar__input filters-toolbar__input--sort"
                  defaultValue="dateCreated-desc"
                >
                  <option value="name-asc">
                    {language === "Armenian"
                      ? "Ալֆավիտային, Ա–Զ"
                      : language === "Russian"
                        ? "По алфавиту, А–Я"
                        : "Alphabetically, A–Z"}
                  </option>
                  <option value="name-desc">
                    {language === "Armenian"
                      ? "Ալֆավիտային, Զ–Ա"
                      : language === "Russian"
                        ? "По алфавиту, Я–А"
                        : "Alphabetically, Z–A"}
                  </option>
                  <option value="sell-asc">
                    {language === "Armenian"
                      ? "Գին, ցածրից բարձր"
                      : language === "Russian"
                        ? "Цена, по возрастанию"
                        : "Price, low to high"}
                  </option>
                  <option value="sell-desc">
                    {language === "Armenian"
                      ? "Գին, բարձրից ցածր"
                      : language === "Russian"
                        ? "Цена, по убыванию"
                        : "Price, high to low"}
                  </option>
                  <option value="dateCreated-desc">
                    {language === "Armenian"
                      ? "Ամսաթիվ, նորից հին"
                      : language === "Russian"
                        ? "Дата, новые сначала"
                        : "Date, new to old"}
                  </option>
                  <option value="dateCreated-asc">
                    {language === "Armenian"
                      ? "Ամսաթիվ, հինից նոր"
                      : language === "Russian"
                        ? "Дата, старые сначала"
                        : "Date, old to new"}
                  </option>
                </select>
              </div>

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
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
                  >
                    {paginatedProducts.map(p => (
                      <motion.div
                        key={p.id}
                        className="col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <a
                          className="card rounded border shadow  h-100"
                          href={`/product/${p.id}`}
                        >
                          <img
                            src={p.imageUrls[0]}
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
                                ${(p.price + p.price / 3).toFixed(2)}
                              </s>

                              <span className="price text-danger">
                                {" "}
                                ${p.price}
                              </span>
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
                {language === "Armenian"
                  ? "Նախորդ"
                  : language === "Russian"
                    ? "Предыдущая"
                    : "Previous"}
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
                {language === "Armenian"
                  ? "Հաջորդ"
                  : language === "Russian"
                    ? "Следующая"
                    : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Shop
