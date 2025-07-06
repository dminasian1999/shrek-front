import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductsContext } from "../../utils/context.ts"
import { ProductT } from "../../utils/types.ts"
import { getPostById } from "../../features/api/postActions.tsx"
import ProductPageSideBar from "./ProductPageSideBar.tsx"
import ProductPageFetures from "./ProductPageFetures.tsx"

const ProductPage = () => {
  const { id = "" } = useParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { products, setProducts } = useContext(ProductsContext)
  const [product, setProduct] = useState({} as ProductT)
  // const product = (products.find(p => p.id === id))

  useEffect(() => {
    getPostById(id).then(setProduct)
  }, [id])
  return (
    <div id="MainContent" className="main-content" role="main">
      <div className="bredcrumbWrap">
        <div className="container-fluid breadcrumbs">
          <a href="index.html" title="Back to the home page">
            Home
          </a>
          <span aria-hidden="true">›</span>
          <span>Product Layout Style3</span>
        </div>
      </div>
      <div
        id="ProductSection-product-template"
        className="product-template__container prstyle3 container-fluid"
      >
        <div className="product-single product-single-1">
          <div className="left-content-product">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-details-img product-single__photos bottom">
                  <div className="zoompro-wrap product-zoom-right pl-20">
                    <div className="zoompro-span">
                      <img
                        className="blur-up lazyload zoompro "
                        data-zoom-image="src/images/product-detail-page/camelia-reversible-big1.jpg"
                        alt=""
                        src={product.imageUrl}
                      />
                    </div>
                    <div className="product-labels">
                      <span className="lbl on-sale">Sale</span>
                      <span className="lbl pr-label1">new</span>
                    </div>
                    <div className="product-buttons">
                      <a
                        href="https://www.youtube.com/watch?v=93A2jOW5Mog"
                        className="btn popup-video"
                        title="View Video"
                      >
                        <i
                          className="icon anm anm-play-r"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a href="#" className="btn prlightbox" title="Zoom">
                        <i
                          className="icon anm anm-expand-l-arrows"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-single__meta">
                  <h1 className="product-single__title">{product.name}</h1>
                  <div className="product-nav clearfix">
                    <a href="#" className="next" title="Next">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                  </div>
                  <div className="prInfoRow">
                    <div className="product-stock">
                      <span className="instock ">In Stock</span>{" "}
                      <span className="outstock hide">Unavailable</span>
                    </div>
                    <div className="product-sku">
                      SKU: <span className="variant-sku">{product.id}</span>
                    </div>
                    <div className="product-review">
                    </div>
                  </div>
                  <p className="product-single__price product-single__price-product-template">
                    <span className="visually-hidden">Regular price</span>
                    <s id="ComparePrice-product-template">
                      <span className="money">${(product.sell + product.sell / 3).toFixed(2)}</span>
                    </s>
                    <span
                      className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                      <span id="ProductPrice-product-template">
                        <span className="money">${product.sell}</span>
                      </span>
                    </span>
                  </p>
                  <div id="quantity_message">
                    <span className="items"> {product.category}</span>
                  </div>
                  <form
                    method="post"
                    action="http://annimexweb.com/cart/add"
                    id="product_form_10508262282"
                    accept-charset="UTF-8"
                    className="product-form product-form-product-template hidedropdown"
                    encType="multipart/form-data"
                  >
                    <div className="product-action clearfix">
                      <div className="product-form__item--quantity">
                        <div className="wrapQtyBtn">
                          <div className="qtyField">
                            <a
                              className="qtyBtn minus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-minus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <input
                              type="text"
                              id="Quantity"
                              name="quantity"
                              value="1"
                              className="product-form__input qty"
                            />
                            <a
                              className="qtyBtn plus"
                              href="javascript:void(0);"
                            >
                              <i
                                className="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-form__item--submit">
                        <button
                          type="button"
                          name="add"
                          className="btn product-form__cart-submit"
                        >
                          <span>Add to cart</span>
                        </button>
                      </div>
                      <div
                        className="shopify-payment-button"
                        data-shopify="payment-button"
                      >
                        <button
                          type="button"
                          className="shopify-payment-button__button shopify-payment-button__button--unbranded"
                        >
                          Buy it now
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="display-table shareRow">
                    <div className="display-table-cell medium-up--one-third">
                      <div className="wishlist-btn">
                        <a
                          className="wishlist add-to-wishlist"
                          href="#"
                          title="Add to Wishlist"
                        >
                          <i
                            className="icon anm anm-heart-l"
                            aria-hidden="true"
                          ></i>{" "}
                          <span>Add to Wishlist</span>
                        </a>
                      </div>
                    </div>
                    <div className="display-table-cell text-right">
                      <div className="social-sharing">
                        <a
                          target="_blank"
                          href="#"
                          className="btn btn--small btn--secondary btn--share share-facebook"
                          title="Share on Facebook"
                        >
                          <i
                            className="fa fa-facebook-square"
                            aria-hidden="true"
                          ></i>{" "}
                          <span className="share-title" aria-hidden="true">
                            Share
                          </span>
                        </a>
                        <a
                          target="_blank"
                          href="#"
                          className="btn btn--small btn--secondary btn--share share-twitter"
                          title="Tweet on Twitter"
                        >
                          <i className="fa fa-twitter" aria-hidden="true"></i>{" "}
                          <span className="share-title" aria-hidden="true">
                            Tweet
                          </span>
                        </a>
                        <a
                          href="#"
                          title="Share on google+"
                          className="btn btn--small btn--secondary btn--share"
                        >
                          <i
                            className="fa fa-google-plus"
                            aria-hidden="true"
                          ></i>{" "}
                          <span className="share-title" aria-hidden="true">
                            Google+
                          </span>
                        </a>
                        <a
                          target="_blank"
                          href="#"
                          className="btn btn--small btn--secondary btn--share share-pinterest"
                          title="Pin on Pinterest"
                        >
                          <i className="fa fa-pinterest" aria-hidden="true"></i>{" "}
                          <span className="share-title" aria-hidden="true">
                            Pin it
                          </span>
                        </a>
                        <a
                          href="#"
                          className="btn btn--small btn--secondary btn--share share-pinterest"
                          title="Share by Email"
                          target="_blank"
                        >
                          <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                          <span className="share-title" aria-hidden="true">
                            Email
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                  </div>
                </div>
              </div>
            </div>
            <ProductPageFetures/>

          </div>


        </div>
        <ProductPageSideBar />

      </div>
    </div>
  )
}

export default ProductPage
