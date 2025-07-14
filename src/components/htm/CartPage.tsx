import React from "react";
import { useAppSelector } from "../../app/hooks.ts";
import CartPageRow from "./CartPageRow.tsx";
import PayPalCheckout from "../../paymant/PayPalCheckout.tsx";

const CartPage = () => {
  const cart = useAppSelector((state) => state.user.profile.cart);

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
          {cart.items.map((item) => (
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
        {/* Estimate Shipping */}
        <div className="col-12 col-md-6">
          <div className="border rounded p-4 h-100 shadow-sm">
            <h5 className="fw-bold mb-3">Estimate Shipping and Tax</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <select className="form-select" id="country">
                  <option value="">Select Country</option>
                  <option>Armenia</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" id="state" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="zip" className="form-label">Postal Code</label>
                <input type="text" id="zip" className="form-control" />
              </div>
              <button type="button" className="btn btn-secondary w-100">
                Calculate Shipping
              </button>
            </form>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="col-12 col-md-6">
          <div className="border rounded p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3">Cart Summary</h5>
            <div className="d-flex justify-content-between border-bottom pb-2">
              <span>Subtotal</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2 fw-bold">
              <span>Grand Total</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>

            <div className="form-check my-3">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label className="form-check-label" htmlFor="terms">
                I agree with the terms and conditions
              </label>
            </div>

            <PayPalCheckout />

            <button type="submit" className="btn btn-primary w-100 mt-3" disabled>
              Proceed To Checkout
            </button>

            <div className="text-center mt-3">
              <img
                src="src/images/payment-img.jpg"
                alt="Accepted payment methods"
                className="img-fluid"
                style={{ maxHeight: "60px" }}
              />
              <p className="mt-2 mb-0">
                <a href="#">Checkout with Multiple Addresses</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
