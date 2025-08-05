import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CartPageRow from "./CartPageRow"
import PayPalCheckout from "../../paymant/PayPalCheckout"
import { baseUrl } from "../../utils/constants"
import ShippingEstimator from "./ShippingEstimator"
import { checkOut } from "../../features/api/accountActions.ts"
import { OrderT } from "../../utils/types.ts"

const CartPage = () => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector(state => state.user.profile)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const token = useAppSelector(state => state.token)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the terms to proceed.")
      return
    }

    const orderItems = profile.cart.items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }))

    const orderPayload: OrderT = {
      userId: profile.login,
      paymentMethod: "PayPal",
      shippingAddress: profile.address!,
      orderItems,
    }

    try {
      // Dispatch the async thunk instead of fetch
      const resultAction = await dispatch(checkOut(orderPayload))

      if (checkOut.fulfilled.match(resultAction)) {
        alert("Your order(s) have been successfully placed!")
        // TODO: clear cart or redirect user
      } else {
        throw new Error( "Order creation failed.")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "There was a problem placing your order.")
    }
  }

  return (
    <div className="px-1">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Shopping Cart</h1>
      </div>

      <div className="alert alert-success text-center">
        <i className="fa fa-truck me-2" />
        <strong>Congratulations!</strong> You've got free shipping!
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle text-center">
          <thead className="table-light">
          <tr>
            <th colSpan={2}>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
          </thead>
          <tbody>
          {profile.cart.items.map(item => (
            <CartPageRow key={item.cartItemId} cardItem={item} />
          ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={6}>
              <a href="/" className="btn btn-outline-secondary w-100 w-md-auto">
                Continue Shopping
              </a>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>

      <div className="row gy-4">
        <ShippingEstimator />

        <div className="col-12 col-md-6">
          <div className="border rounded p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3">Cart Summary</h5>
            <div className="d-flex justify-content-between border-bottom pb-2">
              <span>Subtotal</span>
              <span>${profile.cart.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 fw-bold">
              <span>Grand Total</span>
              <span>${profile.cart.totalPrice?.toFixed(2)}</span>
            </div>

            <div className="form-check my-3">
              <input
                type="checkbox"
                className="me-2"
                id="terms"
                required
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="terms">
                I agree with the terms and conditions
              </label>
            </div>

            <PayPalCheckout amount={profile.cart.totalPrice?.toFixed(2)} />

            <button
              type="submit"
              onClick={handleCheckout}
              className="btn btn-primary w-100 mt-3"
              disabled={!termsAccepted}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
