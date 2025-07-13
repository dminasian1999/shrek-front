import React from "react"
import type { ProductT } from "../../utils/types.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { addCartList, addWishlist } from "../../features/api/accountActions.ts"
import { Link } from "react-router-dom"

const ProductItem = ({ p }: { p: ProductT }) => {
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()

  return (
    // <div className="col-6 col-sm-6 col-md-4 col-lg-3 item">
    <div className="card p-0 m-0 clearfix"    >

      {/*<div className="product-image">*/}
      <div className="">
        <div
          style={{ height: "200px" }}
          // href="#"
        >
          <img
            className="primary blur-up w-100 h-100"
            src={p.imageUrls[0]}
            alt="image"
            title="product"
          />
          {/*<img*/}
          {/*  className="hover blur-up  w-100 h-100"*/}
          {/*  src={p.imageUrl}*/}
          {/*  alt="image"*/}
          {/*  title="product"*/}
          {/*/>*/}
          <div className="product-labels rectangular">
            <span className="lbl on-sale">-16%</span>{" "}
            <span className="lbl pr-label1">new</span>
          </div>
        </div>
      </div>

      <div className="product-image " style={{ height: "250px", }}>
        <a href={`/product/${p.id}`}>
          <img
            className="primary blur-up lazyload h-100 w-100  object-fit-cover"
            data-src={p.imageUrls}
            src={p.imageUrls[0]}
            alt={p.name}
            title={p.name}
          />
          <img
            className="hover blur-up lazyload h-100 w-100 object-fit-cover"
            data-src={p.imageUrls}
            src={p.imageUrls[0]}
            alt={p.name}
            title={p.name}
          />
          <div className="product-labels rectangular">
            <span className="lbl on-sale">-16%</span>
            <span className="lbl pr-label1">new</span>
          </div>
        </a>

        <div className="saleTime desktop" data-countdown="2025/12/31"></div>

        <form className="variants add" action="#" method="post">
          <button
            onClick={() =>
              dispatch(
                addCartList({
                  cartItemId: p.id!,
                  product: p,
                  quantity: 1,
                }),
              )
            }
            className="btn btn-addto-cart"
            type="button"
          >
            Add To Cart
          </button>
        </form>

        <div className="button-set">
          <a
            // href="#"
            title="Quick View"
            className="quick-view-popup quick-view"
            data-toggle="modal"
            data-target="#content_quickview"
            onClick={e => e.preventDefault()}
          >
            <i className="icon anm anm-search-plus-r"></i>
          </a>

          <div
            // onClick={()=>(addWishlist(token,user.login,p.id!))}
            onClick={() => dispatch(addWishlist(p.id!))}
            className="wishlist-btn"
          >
            <a
              className="wishlist add-to-wishlist"
              href="#"
              title="Add to Wishlist"

            >
              <i className="icon anm anm-heart-l"></i>
            </a>
          </div>

          {token && user.roles.includes("ADMINISTRATOR") && <div className="edit-btn">
            <Link
              className="edit add-to-compare"
              to={`/product/edit/${p.id}`}
              title="Add to Compare"
            >
              <i className="icon anm anm-edit-l"></i>
            </Link>
          </div>}
        </div>
      </div>

      <div className="product-details text-center">
        <div className="product-name">
          <a href="#">{p.name}</a>
        </div>
        <div className="product-price">
          <span className="old-price">${(p.price + p.price / 3).toFixed(2)}</span>

          {/*<span className="old-price">$500.00</span>*/}
          <span className="price">${p.price}</span>
        </div>
        {/*<div className="product-review">*/}
        {/*  <i className="font-13 fa fa-star"></i>*/}
        {/*  <i className="font-13 fa fa-star"></i>*/}
        {/*  <i className="font-13 fa fa-star"></i>*/}
        {/*  <i className="font-13 fa fa-star-o"></i>*/}
        {/*  <i className="font-13 fa fa-star-o"></i>*/}
        {/*</div>*/}
        {/*<ul className="swatches">*/}
        {/*  {[1, 2, 3, 4, 5, 6].map((n) => (*/}
        {/*    <li className="swatch medium rounded" key={n}>*/}
        {/*      <img*/}
        {/*        src={`src/images/product-images/variant${n}.jpg`}*/}
        {/*        alt={`variant ${n}`}*/}
        {/*      />*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </div>

      <div className="timermobile">
        <div className="saleTime mobile" data-countdown="2025/12/31"></div>
      </div>
    </div>
  )
}

export default ProductItem
