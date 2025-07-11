import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import { addCartList, addWishlist } from "../../features/api/accountActions.ts"
import { useAppDispatch } from "../../app/hooks.ts"
import { ProductsContext } from "../../utils/context.ts"
import { categories } from "../../utils/constants.ts"

const ProductPage = () => {
  const { products, setProducts ,language} = useContext(ProductsContext)

  const { id = "" } = useParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({} as ProductT)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostById(id)
        setProduct(data)
      } catch (err) {
        setErrorMessage(
          language === "Armenian"
            ? "Ապրանքի բեռնումը սխալվւմ է։"
            : language === "Russian"
              ? "Ошибка загрузки продукта."
              : "Error loading product."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, language])

  const randomStars = Math.floor(Math.random() * 3) + 3
  const randomReviews = Math.floor(Math.random() * 30 + 5)
  const itemsSold = Math.floor(Math.random() * 20 + 5)
  const hoursAgo = Math.floor(Math.random() * 12 + 12)
  const viewersNow = Math.floor(Math.random() * 20 + 10)

  if (loading) {
    return (
      <div className="text-center p-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">
            {language === "Armenian"
              ? "Բեռնում է..."
              : language === "Russian"
                ? "Загрузка..."
                : "Loading..."}
          </span>
        </div>
        <p className="mt-3">
          {language === "Armenian"
            ? "Ապրանքի մանրամասների բեռնումը..."
            : language === "Russian"
              ? "Загрузка деталей продукта..."
              : "Loading product details..."}
        </p>
      </div>
    )
  }

  if (errorMessage) {
    return <div className="text-danger text-center mt-5">{errorMessage}</div>
  }

  return (
    <div id="MainContent" className="main-content" role="main">
      <div className="product-template__container">
        <div className="product-single row">
          {/* Left Image Column */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="product-details-img">
              <div className="zoompro-wrap product-zoom-right">
                <div className="zoompro-span">
                  <img
                    className="blur-up lazyload zoompro"
                    alt={product.name}
                    src={product.imageUrl}
                  />
                </div>
                <div className="product-labels">
                  <span className="lbl on-sale">
                    {language === "Armenian"
                      ? "Զեղչ"
                      : language === "Russian"
                        ? "Распродажа"
                        : "Sale"}
                  </span>
                  {Date.now() - new Date(product.dateCreated!).getTime() <
                    14 * 864e5 && (
                      <span className="lbl pr-label1">
                      {language === "Armenian"
                        ? "Նոր"
                        : language === "Russian"
                          ? "Новинка"
                          : "New"}
                    </span>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Details Column */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 p-5">
            <div className="product-single__meta">
              <h1 className="product-single__title">{product.name}</h1>
              <div className="prInfoRow">
                <div className="product-stock">
                  {product.quantity > 0 ? (
                    <span className="instock">
                      {language === "Armenian"
                        ? "Առկա է"
                        : language === "Russian"
                          ? "В наличии"
                          : "In Stock"}
                    </span>
                  ) : (
                    <span className="outstock text-danger">
                      {language === "Armenian"
                        ? "Առկա չէ"
                        : language === "Russian"
                          ? "Нет в наличии"
                          : "Out of stock"}
                    </span>
                  )}
                </div>
                <div className="product-id text-secondary fw-light">
                  {language === "Armenian"
                    ? "Համար"
                    : language === "Russian"
                      ? "ИД"
                      : "ID"}: {product.id}
                </div>
                <div className="product-review">
                  <a className="reviewLink" href="#tab2">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`font-13 fa ${
                          i < randomStars ? "fa-star" : "fa-star-o"
                        }`}
                      />
                    ))}
                    <span className="spr-badge-caption">
                      {randomReviews}{" "}
                      {language === "Armenian"
                        ? "կարծիք"
                        : language === "Russian"
                          ? "отзывов"
                          : "reviews"}
                    </span>
                  </a>
                </div>
              </div>

              <p className="product-single__price">
                <s>
                  <span className="money">
                    ${(product.sell + product.sell / 3).toFixed(2)}
                  </span>
                </s>{" "}
                <span className="money text-success">${product.sell}</span>
              </p>


                <div className={'text-secondary mt-2 link-underline'}>{categories(language).find(c => c.route === product.category)?.title}</div>
              <div className="orderMsg mt-2">
                <img src="/src/images/order-icon.jpg" alt="" />{" "}
                <strong className="items">{itemsSold}</strong>{" "}
                {language === "Armenian"
                  ? "վաճառվել է վերջին"
                  : language === "Russian"
                    ? "продано за последние"
                    : "sold in last"}{" "}
                <strong className="time">{hoursAgo}</strong>{" "}
                {language === "Armenian"
                  ? "ժամանակ"
                  : language === "Russian"
                    ? "часов"
                    : "hours"}
              </div>

              <div
                className="product-single__description rte mt-3 text-break"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {product.desc ||
                  (language === "Armenian"
                    ? "Արտադրված է բարձրորակ նյութերից՝ երկար սպասարկման համար։"
                    : language === "Russian"
                      ? "Изготовлено из высококачественных материалов для длительного использования."
                      : "Crafted from premium materials for long-lasting durability.")}
              </div>

              {product.quantity > 0 && (
                <div className="quantity_message mt-2">
                  {language === "Armenian"
                    ? "Շտապեք! Մնացել է"
                    : language === "Russian"
                      ? "Поторопитесь! Осталось всего"
                      : "Hurry! Only"}{" "}
                  <span className="items">{product.quantity}</span>{" "}
                </div>
              )}

              <form>
                <div className="product-action d-flex gap-2">
                  <div
                    className="btn product-form__item--submit w-100 d-flex align-items-center justify-content-center"
                    onClick={() =>
                      dispatch(
                        addCartList({
                          cartItemId: product.id!,
                          product,
                          quantity: 1,
                        }),
                      )
                    }
                  >
                    {language === "Armenian"
                      ? "Ավելացնել Զամբյուղ"
                      : language === "Russian"
                        ? "Добавить в корзину"
                        : "Add to cart"}
                  </div>
                  <div className="shopify-payment-button w-100">
                    <button
                      type="button"
                      className="shopify-payment-button__button shopify-payment-button__button--unbranded w-100"
                    >
                      {language === "Armenian"
                        ? "Գնել հիմա"
                        : language === "Russian"
                          ? "Купить сейчас"
                          : "Buy it now"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="display-table shareRow mt-3">
                <div
                  className="wishlist-btn"
                  onClick={() => dispatch(addWishlist(product.id!))}
                >
                  <a
                    className="wishlist add-to-wishlist"
                    href="#"
                    title={
                      language === "Armenian"
                        ? "Ավելացնել ցանկում"
                        : language === "Russian"
                          ? "Добавить в список желаний"
                          : "Add to Wishlist"
                    }
                  >
                    <i className="icon anm anm-heart-l" aria-hidden="true"></i>{" "}
                    <span>
                      {language === "Armenian"
                        ? "Ավելացնել ցանկում"
                        : language === "Russian"
                          ? "Добавить в список желаний"
                          : "Add to Wishlist"}
                    </span>
                  </a>
                </div>
              </div>

              <div className="userViewMsg mt-2">
                <i className="fa fa-users" aria-hidden="true"></i>{" "}
                <strong className="uersView">{viewersNow}</strong>{" "}
                {language === "Armenian"
                  ? "մարդիկ դիտում են այս ապրանքը"
                  : language === "Russian"
                    ? "человек смотрят этот товар"
                    : "PEOPLE ARE LOOKING FOR THIS PRODUCT"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
