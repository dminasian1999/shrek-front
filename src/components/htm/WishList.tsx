import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { ProductT } from "../../utils/types.ts"
import { getPostByIds } from "../../features/api/postActions.tsx"
import { removeWishlist } from "../../features/api/accountActions.ts"

const WishList = () => {
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const [products, setProducts] = useState([] as ProductT[])
  const dispatch = useAppDispatch()
  useEffect(() => {
    // if (user?.wishList?.length) {
    getPostByIds(user.wishList, token).then(setProducts)
    // }
    // else {
    //   setProducts([]); // clear when wishlist is empty
    // }
  }, [setProducts, user.wishList.length])

  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Wish List</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 main-col">
            <form action="#">
              <div className="wishlist-table table-content table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-name text-center alt-font">
                        Remove
                      </th>
                      <th className="product-price text-center alt-font">
                        Images
                      </th>
                      <th className="product-name alt-font">Product</th>
                      <th className="product-price text-center alt-font">
                        Unit Price
                      </th>
                      <th className="category text-center alt-font">
                        Category
                      </th>
                      <th className="product-subtotal text-center alt-font">
                        Add to Cart
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td
                          className="product-remove text-center"
                          valign="middle"
                        >
                          {/*<a href="#" onClick={(e) => e.preventDefault()}>*/}
                          <div
                            className={"btn btn-sm"}
                            // onClick={() =>
                            //   // removeWishlist(token, user.login, p.id!)
                            // }
                            onClick={() => dispatch(removeWishlist(p.id!))}
                          >
                            <i className="icon icon anm fa-2x anm-times-l"></i>
                          </div>
                        </td>
                        <td className="product-thumbnail text-center">
                          <a href="#">
                            <img src={p.imageUrl} alt={p.name} title={p.name} />
                          </a>
                        </td>
                        <td className="product-name">
                          <h4 className="no-margin">
                            <a href="#">{p.name}</a>
                          </h4>
                        </td>
                        <td className="product-price text-center">
                          <h4 className="amount">${p.sell}</h4>
                        </td>
                        <td className="text-center text-secondary">
                          <h4>{p.category}</h4>
                        </td>
                        <td className="product-subtotal text-center">
                          <button type="button" className="btn btn-small">
                            Add To Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishList
