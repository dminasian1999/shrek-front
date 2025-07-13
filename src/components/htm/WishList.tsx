import React, { useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { ProductT } from "../../utils/types.ts"
import { getPostByIds } from "../../features/api/postActions.tsx"
import { addCartList, removeWishlist } from "../../features/api/accountActions.ts"
import { ProductsContext } from "../../utils/context.ts"
import { categories } from "../../utils/constants.ts"

const WishList = () => {
  const { language } = useContext(ProductsContext)
  const user = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const [products, setProducts] = useState([] as ProductT[])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user?.wishList) {
      getPostByIds(user.wishList, token).then(setProducts)
    }
  }, [setProducts, token, user?.wishList])

  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">
              {language === "Armenian"
                ? "Ցանկացված ապրանքներ"
                : language === "Russian"
                  ? "Список желаемого"
                  : "Wish List"}
            </h1>
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
                      {language === "Armenian"
                        ? "Հեռացնել"
                        : language === "Russian"
                          ? "Удалить"
                          : "Remove"}
                    </th>
                    <th className="product-price text-center alt-font">
                      {language === "Armenian"
                        ? "Պատկերներ"
                        : language === "Russian"
                          ? "Изображения"
                          : "Images"}
                    </th>
                    <th className="product-name alt-font">
                      {language === "Armenian"
                        ? "Ապրանք"
                        : language === "Russian"
                          ? "Товар"
                          : "Product"}
                    </th>
                    <th className="product-price text-center alt-font">
                      {language === "Armenian"
                        ? "Միավորի գին"
                        : language === "Russian"
                          ? "Цена за единицу"
                          : "Unit Price"}
                    </th>
                    <th className="category text-center alt-font">
                      {language === "Armenian"
                        ? "Կատեգորիա"
                        : language === "Russian"
                          ? "Категория"
                          : "Category"}
                    </th>
                    <th className="product-subtotal text-center alt-font">
                      {language === "Armenian"
                        ? "Ավելացնել զամբյուղ"
                        : language === "Russian"
                          ? "Добавить в корзину"
                          : "Add to Cart"}
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
                        <div
                          className={"btn btn-sm"}
                          onClick={() => dispatch(removeWishlist(p.id!))}
                        >
                          <i className="icon icon anm fa-2x anm-times-l"></i>
                        </div>
                      </td>
                      <td className="product-thumbnail text-center">
                        <a href="#">
                          <img src={p.imageUrls[0]} alt={p.name} title={p.name} />
                        </a>
                      </td>
                      <td className="product-name">
                        <h4 className="no-margin">
                          <a href="#">{p.name}</a>
                        </h4>
                      </td>
                      <td className="product-price text-center">
                        <h4 className="amount">${p.price}</h4>
                      </td>
                      <td className="text-center text-secondary">
                        <h4>{categories(language).find(c => c.route === p.category)?.title}</h4>
                      </td>
                      <td className="product-subtotal text-center">
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
                          type="button"
                          className="btn btn-small"
                        >
                          {language === "Armenian"
                            ? "Ավելացնել զամբյուղ"
                            : language === "Russian"
                              ? "Добавить в корзину"
                              : "Add To Cart"}
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
