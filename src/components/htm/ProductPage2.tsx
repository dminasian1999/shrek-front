// import { useContext, useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { ProductsContext } from "../../utils/context.ts"
// import { ProductT } from "../../utils/types.ts"
// import { getPostById } from "../../features/api/postActions.tsx"
//
// const ProductPage2 = () => {
//   const { id = "" } = useParams()
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [product, setProduct] = useState({} as ProductT)
//   // const product = (products.find(p => p.id === id))
//
//   useEffect(() => {
//     getPostById(id).then(setProduct)
//   }, [id])
//   return (
//     <div id="MainContent" className="main-content" role="main">
//       <div className="bredcrumbWrap">
//         <div className="container breadcrumbs">
//           <a href="index.html" title="Back to the home page">
//             Home
//           </a>
//           <span aria-hidden="true">›</span>
//           <span>Product Layout Style1</span>
//         </div>
//       </div>
//       <div id="ProductSection-product-template" className="product-template__container prstyle1 container">
//         <div className="product-single">
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="product-details-img">
//                 <div className="product-thumb">
//                   <div id="gallery" className="product-dec-slider-2 product-tab-left">
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big1.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big1.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="-4" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            src="/src/images/product-detail-page/camelia-reversible0.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big2.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big2.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big3.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big3.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible6.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible6.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible7-big.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible7-big.jpg"
//                        className="slick-slide slick-cloned" data-slick-index={-1} aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible7.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible7.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big4.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big4.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="0" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible8.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible8.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big5.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big5.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="1" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible9.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible9.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big6.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big6.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="2" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible1.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible1.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big7.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big7.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="3" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible2.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible2.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big8.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big8.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="4" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible3.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible3.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big9.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big9.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="5" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible4.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible4.jpg" alt="" />
//                     </a>
//                     <a data-image="/src/images/product-detail-page/camelia-reversible-big10.jpg"
//                        data-zoom-image="/src/images/product-detail-page/camelia-reversible-big10.jpg"
//                        className="slick-slide slick-cloned" data-slick-index="6" aria-hidden="true" tabIndex={-1}>
//                       <img className="blur-up lazyload"
//                            data-src="/src/images/product-detail-page/camelia-reversible5.jpg"
//                            src="/src/images/product-detail-page/camelia-reversible5.jpg" alt="" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="zoompro-wrap product-zoom-right pl-20">
//                   <div className="zoompro-span">
//                     <img className="blur-up lazyload zoompro"
//                          data-zoom-image="/src/images/product-detail-page/camelia-reversible-big1.jpg" alt=""
//                          src="/src/images/product-detail-page/camelia-reversible-big1.jpg" />
//                   </div>
//                   <div className="product-labels"><span className="lbl on-sale">Sale</span><span
//                     className="lbl pr-label1">new</span></div>
//                   <div className="product-buttons">
//                     <a href="https://www.youtube.com/watch?v=93A2jOW5Mog" className="btn popup-video"
//                        title="View Video"><i className="icon anm anm-play-r" aria-hidden="true"></i></a>
//                     <a href="#" className="btn prlightbox" title="Zoom"><i className="icon anm anm-expand-l-arrows"
//                                                                            aria-hidden="true"></i></a>
//                   </div>
//                 </div>
//                 {/*<div className="lightboximages">*/}
//                 {/*  <img src="/src/images/product-detail-page/camelia-reversible-big1.jpg" data-size="1462x2048"></img>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big2.jpg" data-size="1462x2048"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big3.jpg" data-size="1462x2048"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible7-big.jpg" data-size="1462x2048"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big4.jpg" data-size="1462x2048"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big5.jpg" data-size="1462x2048"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big6.jpg" data-size="731x1024"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big7.jpg" data-size="731x1024"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big8.jpg" data-size="731x1024"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big9.jpg" data-size="731x1024"></a>*/}
//                 {/*  <a href="/src/images/product-detail-page/camelia-reversible-big10.jpg" data-size="731x1024"></a>*/}
//                 {/*</div>*/}
//
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="product-single__meta">
//                 <h1 className="product-single__title">Product Layout Style1</h1>
//                 <div className="product-nav clearfix">
//                   <a href="#" className="next" title="Next"><i className="fa fa-angle-right"
//                                                                aria-hidden="true"></i></a>
//                 </div>
//                 <div className="prInfoRow">
//                   <div className="product-stock"><span className="instock ">In Stock</span> <span
//                     className="outstock hide">Unavailable</span></div>
//                   <div className="product-sku">SKU: <span className="variant-sku">19115-rdxs</span></div>
//                   <div className="product-review"><a className="reviewLink" href="#tab2"><i
//                     className="font-13 fa fa-star"></i><i className="font-13 fa fa-star"></i><i
//                     className="font-13 fa fa-star"></i><i className="font-13 fa fa-star-o"></i><i
//                     className="font-13 fa fa-star-o"></i><span className="spr-badge-caption">6 reviews</span></a>
//                   </div>
//                 </div>
//                 <p className="product-single__price product-single__price-product-template">
//                   <span className="visually-hidden">Regular price</span>
//                   <s id="ComparePrice-product-template"><span className="money">$600.00</span></s>
//                   <span
//                     className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
//                                                 <span id="ProductPrice-product-template"><span
//                                                   className="money">$500.00</span></span>
//                                             </span>
//                   <span className="discount-badge"> <span className="devider">|</span>&nbsp;
//                     <span>You Save</span>
//                                                 <span id="SaveAmount-product-template"
//                                                       className="product-single__save-amount">
//                                                 <span className="money">$100.00</span>
//                                                 </span>
//                                                 <span className="off">(<span>16</span>%)</span>
//                                             </span>
//                 </p>
//                 <div className="orderMsg" data-user="23" data-time="24">
//                   <img src="/src/images/order-icon.jpg" alt="" /> <strong className="items">5</strong> sold in
//                   last <strong className="time">26</strong> hours
//                 </div>
//               </div>
//               <div className="product-single__description rte">
//                 <ul>
//                   <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
//                   <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
//                   <li>Neque porro quisquam est qui dolorem ipsum quia dolor</li>
//                   <li>Lorem Ipsum is not simply random text.</li>
//                 </ul>
//               </div>
//               <div id="quantity_message">Hurry! Only <span className="items">4</span> left in stock.</div>
//               <form method="post" action="http://annimexweb.com/cart/add" id="product_form_10508262282"
//                     accept-charset="UTF-8" className="product-form product-form-product-template hidedropdown"
//                     encType="multipart/form-data">
//                 <div className="swatch clearfix swatch-0 option1" data-option-index="0">
//                   <div className="product-form__item">
//                     <label className="header">Color: <span className="slVariant">Red</span></label>
//                     <div data-value="Red" className="swatch-element color red available">
//                       <input className="swatchInput" id="swatch-0-red" type="radio" name="option-0" value="Red" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-red"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-1.jpg)'}}
//                              title="Red"></label>
//                     </div>
//                     <div data-value="Blue" className="swatch-element color blue available">
//                       <input className="swatchInput" id="swatch-0-blue" type="radio" name="option-0" value="Blue" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-blue"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-2.jpg)'}}
//
//                              title="Blue"></label>
//                     </div>
//                     <div data-value="Green" className="swatch-element color green available">
//                       <input className="swatchInput" id="swatch-0-green" type="radio" name="option-0" value="Green" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-green"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-3.jpg)'}}
//
//                              title="Green"></label>
//                     </div>
//                     <div data-value="Gray" className="swatch-element color gray available">
//                       <input className="swatchInput" id="swatch-0-gray" type="radio" name="option-0" value="Gray" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-gray"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-4.jpg)'}}
//
//                              title="Gray"></label>
//                     </div>
//                     <div data-value="aqua" className="swatch-element color aqua available">
//                       <input className="swatchInput" id="swatch-0-aqua" type="radio" name="option-0" value="aqua" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-aqua"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-5.jpg)'}}
//                              title="aqua"></label>
//                     </div>
//                     <div data-value="Orange" className="swatch-element color orange available">
//                       <input className="swatchInput" id="swatch-0-orange" type="radio" name="option-0"
//                              value="Orange" />
//                       <label className="swatchLbl color medium rectangle" htmlFor="swatch-0-orange"
//                              style={{backgroundImage: 'url(/src/images/product-detail-page/variant1-5.jpg)'}}
//                              title="Orange"></label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="swatch clearfix swatch-1 option2" data-option-index="1">
//                   <div className="product-form__item">
//                     <label className="header">Size: <span className="slVariant">XS</span></label>
//                     <div data-value="XS" className="swatch-element xs available">
//                       <input className="swatchInput" id="swatch-1-xs" type="radio" name="option-1" value="XS" />
//                       <label className="swatchLbl medium rectangle" htmlFor="swatch-1-xs" title="XS">XS</label>
//                     </div>
//                     <div data-value="S" className="swatch-element s available">
//                       <input className="swatchInput" id="swatch-1-s" type="radio" name="option-1" value="S" />
//                       <label className="swatchLbl medium rectangle" htmlFor="swatch-1-s" title="S">S</label>
//                     </div>
//                     <div data-value="M" className="swatch-element m available">
//                       <input className="swatchInput" id="swatch-1-m" type="radio" name="option-1" value="M" />
//                       <label className="swatchLbl medium rectangle" htmlFor="swatch-1-m" title="M">M</label>
//                     </div>
//                     <div data-value="L" className="swatch-element l available">
//                       <input className="swatchInput" id="swatch-1-l" type="radio" name="option-1" value="L" />
//                       <label className="swatchLbl medium rectangle" htmlFor="swatch-1-l" title="L">L</label>
//                     </div>
//                     <div data-value="XL" className="swatch-element xl available">
//                       <input className="swatchInput" id="swatch-1-xl" type="radio" name="option-1" value="XL" />
//                       <label className="swatchLbl medium rectangle" htmlFor="swatch-1-xl" title="XL">XL</label>
//                     </div>
//                   </div>
//                 </div>
//                 {/*<p className="infolinks"><a href="#sizechart" className="sizelink btn"> Size Guide</a> <a*/}
//                 {/*  href="#productInquiry" className="emaillink btn"> Ask About this Product</a></p>*/}
//                 <div className="product-action clearfix">
//                   <div className="product-form__item--quantity">
//                     <div className="wrapQtyBtn">
//                       <div className="qtyField">
//                         <a className="qtyBtn minus" href="javascript:void(0);"><i className="fa anm anm-minus-r"
//                                                                                   aria-hidden="true"></i></a>
//                         <input type="text" id="Quantity" name="quantity" value="1"
//                                className="product-form__input qty" />
//                         <a className="qtyBtn plus" href="javascript:void(0);"><i className="fa anm anm-plus-r"
//                                                                                  aria-hidden="true"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="product-form__item--submit">
//                     <button type="button" name="add" className="btn product-form__cart-submit">
//                       <span>Add to cart</span>
//                     </button>
//                   </div>
//                   <div className="shopify-payment-button" data-shopify="payment-button">
//                     <button type="button"
//                             className="shopify-payment-button__button shopify-payment-button__button--unbranded">Buy
//                       it now
//                     </button>
//                   </div>
//                 </div>
//               </form>
//               <div className="display-table shareRow">
//                 <div className="display-table-cell medium-up--one-third">
//                   <div className="wishlist-btn">
//                     <a className="wishlist add-to-wishlist" href="#" title="Add to Wishlist"><i
//                       className="icon anm anm-heart-l" aria-hidden="true"></i> <span>Add to Wishlist</span></a>
//                   </div>
//                 </div>
//                 <div className="display-table-cell text-right">
//                   <div className="social-sharing">
//                     <a target="_blank" href="#" className="btn btn--small btn--secondary btn--share share-facebook"
//                        title="Share on Facebook">
//                       <i className="fa fa-facebook-square" aria-hidden="true"></i> <span className="share-title"
//                                                                                          aria-hidden="true">Share</span>
//                     </a>
//                     <a target="_blank" href="#" className="btn btn--small btn--secondary btn--share share-twitter"
//                        title="Tweet on Twitter">
//                       <i className="fa fa-twitter" aria-hidden="true"></i> <span className="share-title"
//                                                                                  aria-hidden="true">Tweet</span>
//                     </a>
//                     <a href="#" title="Share on google+" className="btn btn--small btn--secondary btn--share">
//                       <i className="fa fa-google-plus" aria-hidden="true"></i> <span className="share-title"
//                                                                                      aria-hidden="true">Google+</span>
//                     </a>
//                     <a target="_blank" href="#" className="btn btn--small btn--secondary btn--share share-pinterest"
//                        title="Pin on Pinterest">
//                       <i className="fa fa-pinterest" aria-hidden="true"></i> <span className="share-title"
//                                                                                    aria-hidden="true">Pin it</span>
//                     </a>
//                     <a href="#" className="btn btn--small btn--secondary btn--share share-pinterest"
//                        title="Share by Email" target="_blank">
//                       <i className="fa fa-envelope" aria-hidden="true"></i> <span className="share-title"
//                                                                                   aria-hidden="true">Email</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//
//               <p id="freeShipMsg" className="freeShipMsg" data-price="199"><i className="fa fa-truck"
//                                                                               aria-hidden="true"></i> GETTING CLOSER!
//                 ONLY <b className="freeShip"><span className="money" data-currency-usd="$199.00"
//                                                    data-currency="USD">$199.00</span></b> AWAY FROM <b>FREE
//                   SHIPPING!</b></p>
//               <p className="shippingMsg"><i className="fa fa-clock-o" aria-hidden="true"></i> ESTIMATED DELIVERY
//                 BETWEEN <b id="fromDate">Wed. May 1</b> and <b id="toDate">Tue. May 7</b>.</p>
//               <div className="userViewMsg" data-user="20" data-time="11000"><i className="fa fa-users"
//                                                                                aria-hidden="true"></i> <strong
//                 className="uersView">14</strong> PEOPLE ARE LOOKING FOR THIS PRODUCT
//               </div>
//             </div>
//           </div>
//         </div>
//
//
//       </div>
//
//     </div>
//   )
// }
// export default ProductPage2
