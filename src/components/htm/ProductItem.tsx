import type { ProductT } from "../../utils/types.ts"

const ProductItem = ({ p}:{p:ProductT}) => {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 item ">
      <div className="product-image">
        <a href={'/product/'+p.id}
        >

          <img
            className="primary blur-up lazyload h-100 w-100 object-fit-cover"
            data-src="src/images/product-images/product-image1.jpg"
            src={p.imageUrl}
            alt="image"
            title="product"
          />
          {/*src="src/images/product-images/product-image1.jpg" alt="image" title="product" />*/}
          <img
            className="hover blur-up lazyload h-100 w-100 object-fit-cover"
            data-src="src/images/product-images/product-image1-1.jpg"
            src={p.imageUrl}
            alt="image"
            title="product"
          />
          <div className="product-labels rectangular">
            <span className="lbl on-sale">-16%</span>
            <span className="lbl pr-label1">new</span>
          </div>
        </a>

        <div
          className="saleTime desktop"
          data-countdown="2022/03/01"
        ></div>
        <form
          className="variants add"
          action="#"
          // onclick="window.location.href='cart.html'"
          method="post"
        >
          <button className="btn btn-addto-cart" type="button">
            Add To Cart
          </button>
        </form>
        <div className="button-set">
          <a
            href="javascript:void(0)"
            title="Quick View"
            className="quick-view-popup quick-view"
            data-toggle="modal"
            data-target="#content_quickview"
          >
            <i className="icon anm anm-search-plus-r"></i>
          </a>
          <div className="wishlist-btn">
            <a
              className="wishlist add-to-wishlist"
              href="#"
              title="Add to Wishlist"
            >
              <i className="icon anm anm-heart-l"></i>
            </a>
          </div>
          <div className="compare-btn">
            <a
              className="compare add-to-compare"
              href="compare.html"
              title="Add to Compare"
            >
              <i className="icon anm anm-random-r"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="product-details text-center">
        <div className="product-name">
          <a href="#">{p.name}</a>
        </div>
        <div className="product-price">
          <span className="old-price">$500.00</span>
          <span className="price">{p.sell}</span>
        </div>

        <div className="product-review">
          <i className="font-13 fa fa-star"></i>
          <i className="font-13 fa fa-star"></i>
          <i className="font-13 fa fa-star"></i>
          <i className="font-13 fa fa-star-o"></i>
          <i className="font-13 fa fa-star-o"></i>
        </div>
        <ul className="swatches">
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant1.jpg"
              alt="image"
            />
          </li>
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant2.jpg"
              alt="image"
            />
          </li>
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant3.jpg"
              alt="image"
            />
          </li>
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant4.jpg"
              alt="image"
            />
          </li>
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant5.jpg"
              alt="image"
            />
          </li>
          <li className="swatch medium rounded">
            <img
              src="src/images/product-images/variant6.jpg"
              alt="image"
            />
          </li>
        </ul>
      </div>
      <div className="timermobile">
        <div
          className="saleTime desktop"
          data-countdown="2022/03/01"
        ></div>
      </div>
    </div>

  );

};
export default ProductItem;
