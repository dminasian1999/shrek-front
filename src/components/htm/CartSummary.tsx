// src/components/CartPage/CartSummary.tsx

import React from "react"
import PayPalCheckout from "../../paymant/PayPalCheckout" // Import PayPal
import { useAppSelector } from "../../app/hooks"

const CartSummary = () => {
  // Assuming totalPrice is the Estimated total
  const estimatedTotal = useAppSelector(state => state.user.profile.cart.totalPrice)

  // Placeholder for a simple checkout handler
  const handleCheckOutClick = () => {
    console.log("Proceeding to Check Out...")
    // In a real app, this would redirect or open a modal
  }

  return (
    <div className="d-flex flex-column align-items-end">
      {/* Estimated Total Display */}
      <div className="mb-3 text-end">
        <h4 className="fw-bold d-inline me-2">Estimated total</h4>
        <h4 className="fw-bold d-inline">${estimatedTotal.toFixed(2)} USD</h4>
      </div>

      <p className="text-muted small mb-4">
        Taxes, discounts and shipping calculated at checkout.
      </p>

      {/* Checkout Button (Brown/Grey) */}
      <button
        className="btn btn-secondary text-white w-100 mb-3"
        style={{ backgroundColor: "#8c7f73", borderColor: "#8c7f73" }}
        onClick={handleCheckOutClick}
      >
        Check out
      </button>

      {/* PayPal Button (Yellow) */}
      <div className="w-100">
        {/* Replace this div with your actual PayPalCheckout component */}
        <button
          className="btn btn-warning w-100"
          style={{ backgroundColor: "#ffc107", color: "black", fontWeight: "bold" }}
        >
          PayPal
        </button>
        {/* <PayPalCheckout order={orderPayload} /> */}
      </div>
    </div>
  )
}

export default CartSummary
