import React, { useRef } from "react";
import { useAppDispatch } from "../../app/hooks.ts";
import {
  updateCartList,
  removeCartList,
} from "../../features/api/accountActions.ts";
import { CartItem } from "../../utils/types.ts";

const CartPageRow = ({ cardItem }: { cardItem: CartItem }) => {
  const dispatch = useAppDispatch();
  const product = cardItem.product;
  const quantity = cardItem.quantity;

  const minQty = 1;
  const maxQty = product.sizeQuantities.find(sq => sq.size === cardItem.selectedSize)?.quantity ?? 1 ;

  // 🧩 Prevent multiple rapid clicks until action finishes
  const isUpdating = useRef(false);

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUpdating.current) return;
    if (quantity <= minQty) return;

    isUpdating.current = true;
    await dispatch(updateCartList({ cartItemId: product.id!+cardItem.selectedSize, isAdd: false }));
    isUpdating.current = false;
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUpdating.current) return;
    if (quantity >= maxQty) return;

    isUpdating.current = true;
    await dispatch(updateCartList({ cartItemId: product.id!+cardItem.selectedSize, isAdd: true }));
    isUpdating.current = false;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUpdating.current) return
    dispatch(
      removeCartList({
        cartItemId: product.id!+cardItem.selectedSize,
        product,
        quantity: 1,
        selectedSize:cardItem.selectedSize
      }),
    )
  };

  return (
    <tr className="align-middle">
      <td>
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="img-fluid rounded"
          style={{ maxWidth: "80px", height: "auto" }}
        />
      </td>
      <td>
        <strong>{product.name}</strong>
        <div className="text-muted small">{product.category}</div>

        <div className="text-muted small">{product.sizeQuantities.find(sq => sq.size === cardItem.selectedSize)?.size}</div>
      </td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        <div className="input-group input-group-sym justify-content-center">
          <button
            className="btn btn-outline-secondary"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            disabled={quantity <= minQty}
          >
            −
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            readOnly
            aria-label="Quantity"
            style={{ width: "50px" }}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            disabled={quantity >= maxQty}
          >
            +
          </button>
        </div>
      </td>
      <td>${(product.price * quantity).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleRemove}
          aria-label={`Remove ${product.name}`}
        >
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
};

export default CartPageRow;
