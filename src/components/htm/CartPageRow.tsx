import React from "react"
import { removeCartList, updateCartList } from "../../features/api/accountActions.ts"
import { CartItem } from "../../utils/types.ts"
import { useAppDispatch } from "../../app/hooks.ts"

const CartPageRow = ({cardItem}:{cardItem:CartItem}) => {

  const dispatch = useAppDispatch()

  return (
      <tr className="cart__row border-bottom line1 cart-flex border-top">
        <td className="cart__image-wrapper cart-flex-item">
          <a href="#">
            <img
              className="cart__image"
              src={cardItem.product.imageUrl}
              alt="Elastic Waist Dress - Navy / Small"
            />
          </a>
        </td>
        <td className="cart__meta small--text-left cart-flex-item">
          <div className="list-view-item__title">
            <a href="#">{cardItem.product.name}</a>
          </div>

          <div className="cart__meta-text">
            {` ${cardItem.product.category}`}
          </div>
        </td>
        <td className="cart__price-wrapper cart-flex-item">
          <span className="money">${cardItem.product.sell}</span>
        </td>
        <td className="cart__update-wrapper cart-flex-item text-right">
          <div className="cart__qty text-center">
            <div className="qtyField">
              <a
                onClick={e => {
                  e.preventDefault()
                  dispatch(
                    updateCartList({
                      productId: cardItem.product.id!,
                      isAdd: false
                    }),
                  )
                }}
                className="qtyBtn minus"
                href="javascript:void(0);"
              >
                <i className="icon icon-minus"></i>
              </a>
              <input
                className="cart__qty-input qty"
                type="text"
                name="updates[]"
                id="qty"
                value={cardItem.quantity}
                pattern="[0-9]*"
              />
              <a
                onClick={e => {
                  e.preventDefault()
                  dispatch(
                    updateCartList({
                      productId: cardItem.product.id!,
                      isAdd: true
                    }),
                  )
                }}
                className="qtyBtn plus"
                href="javascript:void(0);"
              >
                <i className="icon icon-plus"></i>
              </a>
            </div>
          </div>
        </td>
        <td className="text-right small--hide cart-price">
          <div>
                          <span className="money">
                            ${cardItem.product.sell * cardItem.quantity}
                          </span>
          </div>
        </td>
        <td className="text-center small--hide">
          <div
            onClick={e => {
              e.preventDefault()
              dispatch(
                removeCartList({
                  cartItemId:cardItem.product.id!,
                  product: cardItem.product,
                  quantity: 1,
                }),
              )
            }}
            className="btn btn--secondary cart__remove"
            title="Remove tem"
          >
            <i className="icon icon anm anm-times-l"></i>
          </div>
        </td>
      </tr>

  )
}

export default CartPageRow
