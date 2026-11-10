import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  updateCartList,
  removeCartList,
} from "../../features/api/accountActions"
import type { CartItem } from "../../utils/types"
import { money, productStock } from "../../utils/commerce"

const CartPageRow = ({ cardItem }: { cardItem: CartItem }) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.user.loading)
  const { product, quantity, cartItemId } = cardItem
  return (
    <tr>
      <td>
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          <img
            src={product.imageUrls?.[0] || "/product-placeholder.svg"}
            alt=""
            width={72}
            height={72}
            className="rounded"
            style={{ objectFit: "cover", minWidth: 60 }}
          />
        </Link>
      </td>
      <td>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        {cardItem.selectedSize && (
          <div className="small text-muted">{cardItem.selectedSize}</div>
        )}
      </td>
      <td>{money(product.price)}</td>
      <td>
        <div
          className="d-flex align-items-center gap-2"
          style={{ minWidth: 130 }}
        >
          <button
            type="button"
            className="btn btn-outline-secondary p-2"
            disabled={loading || quantity <= 1}
            onClick={() =>
              void dispatch(
                updateCartList({ productId: cartItemId, isAdd: false }),
              )
            }
            aria-label={`Decrease quantity of ${product.name}`}
          >
            −
          </button>
          <span aria-label={`Quantity: ${quantity}`}>{quantity}</span>
          <button
            type="button"
            className="btn btn-outline-secondary p-2"
            disabled={
              loading ||
              quantity >= productStock(product, cardItem.selectedSize)
            }
            onClick={() =>
              void dispatch(
                updateCartList({ productId: cartItemId, isAdd: true }),
              )
            }
            aria-label={`Increase quantity of ${product.name}`}
          >
            +
          </button>
        </div>
      </td>
      <td>{money(product.price * quantity)}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-secondary p-2"
          disabled={loading}
          onClick={() => void dispatch(removeCartList(cardItem))}
          aria-label={`Remove ${product.name}`}
        >
          ×
        </button>
      </td>
    </tr>
  )
}
export default CartPageRow
