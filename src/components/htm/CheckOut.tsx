import React from "react"
import Address from "./Address.tsx"
import PaymentInfo from "./PaymentInfo.tsx"

const CheckOut = () => {
  return (
    <div>
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="customer-box returning-customer">
              <h3>
                <i className="icon anm anm-user-al"></i> Returning customer?{" "}
                <a
                  href="#customer-login"
                  id="customer"
                  className="text-white text-decoration-underline"
                  data-toggle="collapse"
                >
                  Click here to login
                </a>
              </h3>
              <div id="customer-login" className="collapse customer-content">
                <div className="customer-info">
                  <p className="coupon-text">
                    If you have shopped with us before, please enter your
                    details in the boxes below. If you are a new customer,
                    please proceed to the Billing &amp; Shipping section.
                  </p>
                  <form>
                    <div className="row">
                      <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="exampleInputEmail1">
                          Email address <span className="required-f">*</span>
                        </label>
                        <input
                          type="email"
                          className="no-margin"
                          id="exampleInputEmail1"
                        />
                      </div>
                      <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="exampleInputPassword1">
                          Password <span className="required-f">*</span>
                        </label>
                        <input type="password" id="exampleInputPassword1" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-check width-100 margin-20px-bottom">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              value=""
                            />{" "}
                            Remember me!
                          </label>
                          <a href="#" className="float-right">
                            Forgot your password?
                          </a>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="customer-box customer-coupon">
              <h3 className="font-15 xs-font-13">
                <i className="icon anm anm-gift-l"></i> Have a coupon?{" "}
                <a
                  href="#have-coupon"
                  className="text-white text-decoration-underline"
                  data-toggle="collapse"
                >
                  Click here to enter your code
                </a>
              </h3>
              <div
                id="have-coupon"
                className="collapse coupon-checkout-content"
              >
                <div className="discount-coupon">
                  <div id="coupon" className="coupon-dec tab-pane active">
                    <p className="margin-10px-bottom">
                      Enter your coupon code if you have one.
                    </p>
                    <label className="required get" htmlFor="coupon-code">
                      <span className="required-f">*</span> Coupon
                    </label>
                    <input
                      id="coupon-code"
                      required
                      type="text"
                      className="mb-3"
                    />
                    <button className="coupon-btn btn" type="submit">
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row billing-fields">
         <Address />

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="your-order-payment">
              <div className="your-order">
                <h2 className="order-title mb-4">Your Order</h2>

                <div className="table-responsive-sm order-table">
                  <table className="bg-white table table-bordered table-hover text-center">
                    <thead>
                      <tr>
                        <th className="text-left">Product Name</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left">Spike Jacket</td>
                        <td>₪99</td>
                        <td>S</td>
                        <td>1</td>
                        <td>₪99</td>
                      </tr>
                      <tr>
                        <td className="text-left">Argon Sweater</td>
                        <td>₪199</td>
                        <td>M</td>
                        <td>2</td>
                        <td>₪298</td>
                      </tr>
                      <tr>
                        <td className="text-left">Babydoll Bow Dress</td>
                        <td>₪299</td>
                        <td>XL</td>
                        <td>3</td>
                        <td>₪398</td>
                      </tr>
                    </tbody>
                    <tfoot className="font-weight-600">
                      <tr>
                        <td colSpan={4} className="text-right">
                          Shipping
                        </td>
                        <td>₪50.00</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="text-right">
                          Total
                        </td>
                        <td>₪845.00</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <hr />

              <div className="your-payment">
                <h2 className="payment-title mb-3">payment method</h2>
                <div className="payment-method">
                  <div className="payment-accordion">
                    <div id="accordion" className="payment-section">
                      <div className="card mb-2">
                        <div className="card-header">
                          <a
                            className="card-link"
                            data-toggle="collapse"
                            href="#collapseOne"
                          >
                            Direct Bank Transfer{" "}
                          </a>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p className="no-margin font-15">
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won't be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="card-header">
                          <a
                            className="collapsed card-link"
                            data-toggle="collapse"
                            href="#collapseTwo"
                          >
                            Cheque Payment
                          </a>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p className="no-margin font-15">
                              Please send your cheque to Store Name, Store
                              Street, Store Town, Store State / County, Store
                              Postcode.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card margin-15px-bottom border-radius-none">
                        <div className="card-header">
                          <a
                            className="collapsed card-link"
                            data-toggle="collapse"
                            href="#collapseThree"
                          >
                            {" "}
                            PayPal{" "}
                          </a>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p className="no-margin font-15">
                              Pay via PayPal; you can pay with your credit card
                              if you don't have a PayPal account.
                            </p>
                          </div>
                        </div>
                      </div>

<PaymentInfo/>                    </div>
                  </div>

                  <div className="order-button-payment">
                    <button className="btn" value="Place order" type="submit">
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
