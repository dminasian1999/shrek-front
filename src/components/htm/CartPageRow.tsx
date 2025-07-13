import React, { useContext } from "react"
import { removeCartList, updateCartList } from "../../features/api/accountActions.ts"
import { CartItem } from "../../utils/types.ts"
import { useAppDispatch } from "../../app/hooks.ts"
import { categories } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const CartPageRow = ({ cardItem }: { cardItem: CartItem }) => {
  const dispatch = useAppDispatch()
  const { language } = useContext(ProductsContext)

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      updateCartList({
        productId: cardItem.product.id!,
        isAdd: false,
      }),
    )
  }

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      updateCartList({
        productId: cardItem.product.id!,
        isAdd: true,
      }),
    )
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      removeCartList({
        cartItemId: cardItem.product.id!,
        product: cardItem.product,
        quantity: 1,
      }),
    )
  }

  return (
    <tr className="cart__row border-bottom line1 cart-flex border-top">
      <td className="cart__image-wrapper cart-flex-item">
        <a href="#">
          <img
            className="cart__image"
            src={cardItem.product.imageUrls[0]}
            alt={cardItem.product.name}
          />
        </a>
      </td>
      <td className="cart__meta small--text-left cart-flex-item">
        <div className="list-view-item__title">
          <a href="#">{cardItem.product.name}</a>
        </div>
        <div className="cart__meta-text">{}</div>
        <div className="cart__meta-text">{categories(language).find(c => c.route === cardItem.product.category)?.title}</div>
      </td>
      <td className="cart__price-wrapper cart-flex-item">
        <span className="money">${cardItem.product.price}</span>
      </td>
      <td className="cart__update-wrapper cart-flex-item text-right">
        <div className="cart__qty text-center">
          <div className="qtyField">
            <a
              href="#"
              onClick={handleDecrease}
              className="qtyBtn minus"
              aria-label={`Decrease quantity of ${cardItem.product.name}`}
            >
              <i className="icon icon-minus"></i>
            </a>
            <input
              className="cart__qty-input qty"
              type="text"
              name="updates[]"
              id={`qty-${cardItem.product.id}`}
              value={cardItem.quantity}
              readOnly
              pattern="[0-9]*"
              aria-label={`Quantity of ${cardItem.product.name}`}
            />
            <a
              href="#"
              onClick={handleIncrease}
              className="qtyBtn plus"
              aria-label={`Increase quantity of ${cardItem.product.name}`}
            >
              <i className="icon icon-plus"></i>
            </a>
          </div>
        </div>
      </td>
      <td className="text-right small--hide cart-price">
        <div>
          <span className="money">
            ${(cardItem.product.price * cardItem.quantity)}
          </span>
        </div>
      </td>
      <td className="text-center small--hide">
        <button
          onClick={handleRemove}
          className="btn btn--secondary cart__remove"
          title="Remove item"
          aria-label={`Remove ${cardItem.product.name} from cart`}
          type="button"
        >
          <i className="icon icon anm anm-times-l"></i>
        </button>
      </td>
    </tr>
  )
}

export default CartPageRow
