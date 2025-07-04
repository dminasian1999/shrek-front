import React, { useEffect, useState } from "react"
import type { ProductT } from "../../utils/types.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { addCartList, addWishlist } from "../../features/api/accountActions.ts"
import { baseUrlBlog, categories } from "../../utils/constants.ts"
import { uploadImage } from "../../features/api/postActions.tsx"

const ProductItem = ({ p }: { p: ProductT }) => {
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const dispatch = useAppDispatch()
  const [editProduct, setEditProduct] = useState({} as ProductT)
  const handleChange = (field:string, value:any) => {
    setEditProduct(editProduct => ({ ...editProduct, [field]: value }))
  }

  const handleSave = (id: string) => {
    fetch(`${baseUrlBlog}/post/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(editProduct)
    })
  }
  useEffect(() => {
    setEditProduct(p)
    return () => setEditProduct({} as ProductT)
  },[p, ])

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 item">
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 text-center">
                {editProduct.imageUrl && (
                  <img
                    src={editProduct.imageUrl}
                    alt={editProduct.name}
                    className="rounded mb-2 "
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                )}
                <label className="form-label d-block">
                  Product Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleChange("name", uploadImage(e.target.files![0], token))

                    }}
                    className="form-control form-control-sm mt-1"
                  />
                </label>
              </div>

              <div className="mb-2">
                <label className="form-label">
                  Product Name
                  <input
                    className="form-control mt-1"
                    placeholder="Product Name"
                    value={editProduct.name}
                    onChange={e => handleChange("name", e.target.value)}
                  />
                </label>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Category
                  <select
                    className="form-select mt-1"
                    value={editProduct.category}
                    onChange={e => handleChange("category", e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.title} value={cat.route}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="row g-2">
                <div className="col">
                  <label className="form-label w-100">
                    Quantity
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="Quantity"
                      value={editProduct.quantity}
                      onChange={e =>
                        handleChange("quantity", Number(e.target.value))
                      }
                    />
                  </label>
                </div>
                <div className="col">
                  <label className="form-label w-100">
                    Buy Price
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="Buy Price"
                      value={editProduct.buy}
                      onChange={e =>
                        handleChange("buy", Number(e.target.value))
                      }
                    />
                  </label>
                </div>
                <div className="col">
                  <label className="form-label w-100">
                    Sell Price
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="Sell Price"
                      value={editProduct.sell}
                      onChange={e =>
                        handleChange("sell", Number(e.target.value))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={()=>handleSave(editProduct.id!)}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-image ">
        <a className="product-image-wrapper "
          style={{height:"250px"}}
          href={`/product/${p.id}`}
          >
          <img

            className="primary   h-100 w-100 object-fit-fill"
            data-src={p.imageUrl}
            src={p.imageUrl}
            alt={p.name}
            title={p.name}
          />
          <img
            className="hover   h-100 w-100 object-fit-cover"
            data-src={p.imageUrl}
            src={p.imageUrl}
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
                  quantity: 1
                })
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

          <div className="edit-btn">
            <a
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="edit"
              href="#"
              title="Edit"
              onClick={e => e.preventDefault()}
            >
              <i className="icon anm anm-edit"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="product-details text-center">
        <div className="product-name">
          <a href="#">{p.name}</a>
        </div>
        <div className="product-price">
          <span className="old-price">${(p.sell + p.sell / 3).toFixed(2)}</span>

          {/*<span className="old-price">$500.00</span>*/}
          <span className="price">${p.sell}</span>
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
