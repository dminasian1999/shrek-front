import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  updateCartList,
  removeCartList,
} from "../../features/api/accountActions"
import type { CartItem } from "../../utils/types"
import { money, productStock } from "../../utils/commerce"

const CartPageRow = ({
  cardItem,
  compact = false,
}: {
  cardItem: CartItem
  compact?: boolean
}) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.user.loading)
  const { product, quantity, cartItemId } = cardItem
  const image = (
    <img
      src={product.imageUrls?.[0] || "/product-placeholder.svg"}
      alt=""
      width={72}
      height={72}
      className="rounded"
      style={{ objectFit: "cover" }}
    />
  )
  const productName = (
    <>
      <Link to={`/product/${product.id}`}>{product.name}</Link>
      {cardItem.selectedSize && (
        <div className="small text-muted">{cardItem.selectedSize}</div>
      )}
    </>
  )
  const quantityControls = (
    <div
      role="group"
      className="cart-quantity"
      aria-label={`Quantity of ${product.name}`}
    >
      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={loading || quantity <= 1}
        onClick={() =>
          void dispatch(updateCartList({ productId: cartItemId, isAdd: false }))
        }
        aria-label={`Decrease quantity of ${product.name}`}
      >
        −
      </button>
      <span aria-label={`Quantity: ${quantity}`}>{quantity}</span>
      <button
        type="button"
        className="btn btn-outline-secondary"
        disabled={
          loading || quantity >= productStock(product, cardItem.selectedSize)
        }
        onClick={() =>
          void dispatch(updateCartList({ productId: cartItemId, isAdd: true }))
        }
        aria-label={`Increase quantity of ${product.name}`}
      >
        +
      </button>
    </div>
  )
  const remove = (
    <button
      type="button"
      className="btn btn-outline-secondary cart-remove"
      disabled={loading}
      onClick={() => void dispatch(removeCartList(cardItem))}
      aria-label={`Remove ${product.name}`}
    >
      {compact ? "Remove" : "×"}
    </button>
  )

  if (compact)
    return (
      <article className="cart-mobile-item" aria-label={product.name}>
        <div className="cart-mobile-product">
          <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
            {image}
          </Link>
          <div className="cart-mobile-name">
            {productName}
            <p className="small mb-0 mt-2">{money(product.price)} each</p>
          </div>
        </div>
        <div className="cart-mobile-total">
          <span>Item total</span>
          <strong>{money(product.price * quantity)}</strong>
        </div>
        <div className="cart-mobile-actions">
          {quantityControls}
          {remove}
        </div>
      </article>
    )

  return (
    <tr>
      <td>
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          {image}
        </Link>
      </td>
      <td>{productName}</td>
      <td>{money(product.price)}</td>
      <td>{quantityControls}</td>
      <td>{money(product.price * quantity)}</td>
      <td>{remove}</td>
    </tr>
  )
}
export default CartPageRow
