const QuickViewPopup = () => {
  return (
    <div className="modal fade quick-view-popup" id="content_quickview">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <div className="product-template__container prstyle1">
              <div className="product-single">
                <a href="#" data-dismiss="modal" className="model-close-btn pull-right">
                  <span className="text-xl">×</span>
                </a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="product-details-img">
                      <img src="https://via.placeholder.com/300" alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="product-single__meta">
                      <h2 className="product-single__title text-2xl font-bold">Product Quick View Popup</h2>
                      <div className="prInfoRow flex space-x-4">
                        <div className="product-stock">
                          <span className="instock">In Stock</span>
                        </div>
                        <div className="product-sku">SKU: <span className="variant-sku">19115-rdxs</span></div>
                      </div>
                      <p className="product-single__price">
                        <s className="mr-2">$600.00</s>
                        <span className="product-price__price">$500.00</span>
                      </p>
                      <div className="product-single__description">
                        Belle Multipurpose Bootstrap 4 Html Template that will give you and your customers a smooth shopping experience...
                      </div>
                      <div className="swatch clearfix swatch-0 option1">
                        <div className="product-form__item">
                          <label className="header">Color: <span className="slVariant">Red</span></label>
                          <div className="flex space-x-2">
                            {['Red', 'Blue', 'Green', 'Gray'].map((color, idx) => (
                              <div key={idx} className="swatch-element color available">
                                <input className="swatchInput" id={`swatch-0-${color.toLowerCase()}`} type="radio" name="option-0" value={color} />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor={`swatch-0-${color.toLowerCase()}`}
                                  style={{ backgroundColor: color.toLowerCase() }}
                                  title={color}
                                ></label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="swatch clearfix swatch-1 option2">
                        <div className="product-form__item">
                          <label className="header">Size: <span className="slVariant">XS</span></label>
                          <div className="flex space-x-2">
                            {['XS', 'S', 'M', 'L'].map((size, idx) => (
                              <div key={idx} className="swatch-element available">
                                <input className="swatchInput" id={`swatch-1-${size.toLowerCase()}`} type="radio" name="option-1" value={size} />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor={`swatch-1-${size.toLowerCase()}`}
                                  title={size}
                                >
                                  {size}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="product-action flex items-center space-x-4 mt-4">
                        <div className="wrapQtyBtn flex items-center border">
                          <a className="qtyBtn minus px-2" href="javascript:void(0);">-</a>
                          <input type="text" name="quantity" value="1" className="product-form__input qty w-12 text-center" />
                          <a className="qtyBtn plus px-2" href="javascript:void(0);">+</a>
                        </div>
                        <button type="button" className="btn product-form__cart-submit bg-black text-white px-4 py-2">
                          Add to cart
                        </button>
                      </div>
                      <div className="wishlist-btn mt-4">
                        <a className="wishlist add-to-wishlist flex items-center" href="#">
                          <i className="text-xl mr-2">❤️</i> Add to Wishlist
                        </a>
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
  );
};
export default QuickViewPopup;
