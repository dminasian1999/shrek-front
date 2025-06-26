import React from "react"
import ProductPageSide from "./ProductPageSide.tsx"

const ProductPage = () => {
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
          <ProductPageSide />
          <div className="prSidebar sidebar-product">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="prFeatures">
                <div className="row">
                  <div className="feature">
                    <img src="src/images/credit-card.png" alt="Safe Payment" title="Safe Payment" />
                    <div className="details"><h5>Safe Payment</h5>Pay with the world's most payment methods.</div>
                  </div>
                  <div className="feature">
                    <img src="src/images/shield.png" alt="Confidence" title="Confidence" />
                    <div className="details"><h5>Confidence</h5>Protection covers your purchase and personal data.</div>
                  </div>
                  <div className="feature">
                    <img src="src/images/worldwide.png" alt="Worldwide Delivery" title="Worldwide Delivery" />
                    <div className="details"><h5>Worldwide Delivery</h5>FREE &amp; fast shipping to over 200+
                      countries &amp; regions.
                    </div>
                  </div>
                  <div className="feature">
                    <img src="src/images/phone-call.png" alt="Hotline" title="Hotline" />
                    <div className="details"><h5>Hotline</h5>Talk to help line for your question on 4141 456 789, 4125
                      666 888
                    </div>
                  </div>
                </div>
              </div>
              <div className="related-product grid-products">
                <header className="section-header">
                  <h2 className="section-header__title text-center h2"><span>Related Products</span></h2>
                  <p className="sub-heading">You can stop autoplay, increase/decrease aniamtion speed and number of grid
                    to show and products from store admin.</p>
                </header>
                <div className="grid">
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img className="grid-view-item__image" src="src/images/product-images/product-image21.jpg"
                               alt="" />
                        </a>
                      </div>
                      <div className="details">
                        <a className="grid-view-item__title" href="#">Cena Skirt</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$173.60</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image18.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Block Button Up</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$378.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image22.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Balda Button Pant</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$278.60</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image23.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Border Dress in
                        Black/Silver</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$228.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image24.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Buttercup Dress</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$199.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image25.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Lima Shirt</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$698.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="related-product grid-products">
                <header className="section-header">
                  <h2 className="section-header__title text-center h2"><span>Recently Viewed Product</span></h2>
                  <p className="sub-heading">You can manage this section from store admin as describe in above
                    section</p>
                </header>
                <div className="grid">
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img className="grid-view-item__image" src="src/images/product-images/product-image1.jpg"
                               alt="" />
                        </a>
                      </div>
                      <div className="details">
                        <a className="grid-view-item__title" href="#">Camelia Reversible Jacket</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$199.60</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image42.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Cape Dress</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$378.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image40.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Raglan Maniche Coat in
                        Olive</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$278.60</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image46.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Riga Jacket in Tar</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$228.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image45.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Reversible Quilted Coat</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$199.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star-o"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image"><a className="grid-view-item__link" href="#"><img
                        className="grid-view-item__image" src="src/images/product-images/product-image44.jpg"
                        alt="" /></a></div>
                      <div className="details"><a className="grid-view-item__title" href="#">Reversible Quilted Coat</a>
                        <div className="grid-view-item__meta"><span className="product-price__price"><span
                          className="money">$698.00</span></span></div>
                        <div className="product-review">
                          <i className="font-13 fa fa-star-o"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                          <i className="font-13 fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductPage
