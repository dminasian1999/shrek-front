import React from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import { updateCartList, removeCartList } from "../../features/api/accountActions.ts";
import { CartItem } from "../../utils/types.ts";

const CartPageRow = ({ cardItem }: { cardItem: CartItem }) => {
  const dispatch = useAppDispatch();

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateCartList({ productId: cardItem.product.id!, isAdd: false }));
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateCartList({ productId: cardItem.product.id!, isAdd: true }));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      removeCartList({
        cartItemId: cardItem.product.id!,
        product: cardItem.product,
        quantity: 1,
      })
    );
  };

  return (
    <tr className="align-middle">
      <td>
        <img
          src={cardItem.product.imageUrls[0]}
          alt={cardItem.product.name}
          className="img-fluid rounded"
          style={{ maxWidth: "80px", height: "auto" }}
        />
      </td>
      <td>
        <strong>{cardItem.product.name}</strong>
        <div className="text-muted small">{cardItem.product.category}</div>
      </td>
      <td>₪{cardItem.product.price.toFixed(2)}</td>
      <td>
        <div className="input-group input-group-sym justify-content-center">
          <button
            className="btn btn-outline-secondary"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={cardItem.quantity}
            readOnly
            aria-label="Quantity"
            style={{ width: "50px" }}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>
      <td>₪{(cardItem.product.price * cardItem.quantity).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleRemove}
          aria-label={`Remove ${cardItem.product.name}`}
        >
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
};

export default CartPageRow;
