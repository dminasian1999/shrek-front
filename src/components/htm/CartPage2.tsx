import React, { useState, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CartPageRow from "./CartPageRow"
import PayPalCheckout from "../../paymant/PayPalCheckout"
import { checkOut } from "../../features/api/accountActions.ts"
import { OrderT } from "../../utils/types.ts"

// ===== SHIPPING CALC UTILS =====
type VolumeTier = "1-4" | "5-25";

const ECO_TABLE: Array<[number, number, number]> = [
  [100, 45, 39],
  [250, 50, 43],
  [500, 61, 50],
  [750, 70, 61],
  [1000, 82, 64],
  [1500, 102, 75],
  [2000, 117, 88],
];

const ecoPrice = (weight: number, tier: VolumeTier): number | null => {
  if (weight <= 0 || weight > 2000) return null;
  for (const [max, price14, price525] of ECO_TABLE) {
    if (weight <= max) return tier === "5-25" ? price525 : price14;
  }
  return null;
};

const emsPrice = (weight: number): number => {
  const base = 145;
  if (weight <= 500) return base;
  const extra = Math.ceil((weight - 500) / 500);
  return base + 20 * extra;
};

const getBestShipping = (weight: number, monthlyShipments: number) => {
  const tier: VolumeTier = monthlyShipments >= 5 ? "5-25" : "1-4";
  const eco = ecoPrice(weight, tier);
  const ems = emsPrice(weight);

  if (eco == null) {
    return { method: "EMS", cost: ems, notes: ["EcoPost supports only up to 2000g"] };
  }
  if (eco <= ems) {
    return { method: "ECOPOST", cost: eco, notes: [`Tier ${tier}`] };
  }
  return { method: "EMS", cost: ems, notes: [`EMS cheaper than EcoPost (Tier ${tier})`] };
};

// ===== MAIN COMPONENT =====
const CartPage2 = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // 🏷️ Calculate cart total weight
  const totalWeight = useMemo(() => {
    return profile.cart.items.reduce(
      (sum, item) => sum + item.product.weight * item.quantity,
      0
    )
  }, [profile.cart.items])

  // 🏷️ Choose shipping option
  const shippingQuote = useMemo(() => {
    return getBestShipping(totalWeight, profile.cart.items.length)
  }, [totalWeight, profile.cart.items.length])

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
      const resultAction = await dispatch(checkOut(orderPayload))
      if (checkOut.fulfilled.match(resultAction)) {
        alert("Your order(s) have been successfully placed!")
        // TODO: clear cart or redirect user
      } else {
        throw new Error("Order creation failed.")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "There was a problem placing your order.")
    }
  }

  const subtotal = profile.cart.totalPrice ?? 0
  const shippingCost = shippingQuote?.cost ?? 0
  const grandTotal = subtotal + shippingCost

  return (
    <div className="px-1">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Shopping Cart</h1>
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
        <div className="col-12 col-md-6">
          <div className="border rounded p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3">Cart Summary</h5>
            <div className="d-flex justify-content-between border-bottom pb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Shipping ({shippingQuote?.method})</span>
              <span>₪{shippingCost.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 fw-bold">
              <span>Grand Total</span>
              <span>₪{grandTotal.toFixed(2)}</span>
            </div>
            {shippingQuote?.notes && (
              <small className="text-muted">Note: {shippingQuote.notes.join(", ")}</small>
            )}

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

            <PayPalCheckout amount={grandTotal.toFixed(2)} />

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

export default CartPage2
