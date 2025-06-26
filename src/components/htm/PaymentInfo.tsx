import React from "react";

const PaymentInfo = () => {
  return (
    <div className="accordion mb-2" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingPayment">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapsePayment"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapsePayment"
          >
            Payment Information
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapsePayment"
          className="accordion-collapse collapse"
          aria-labelledby="headingPayment"
        >
          <div className="accordion-body">
            <fieldset>
              <div className="row">
                <div className="form-group col-md-6 required">
                  <label htmlFor="input-cardname">
                    Name on Card <span className="required-f">*</span>
                  </label>
                  <input
                    name="cardname"
                    placeholder="Card Name"
                    id="input-cardname"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group col-md-6 required">
                  <label htmlFor="input-cardtype">
                    Credit Card Type <span className="required-f">*</span>
                  </label>
                  <select
                    name="cardtype"
                    id="input-cardtype"
                    className="form-control"
                  >
                    <option value="">--- Please Select ---</option>
                    <option value="1">American Express</option>
                    <option value="2">Visa Card</option>
                    <option value="3">Master Card</option>
                    <option value="4">Discover Card</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-md-6 required">
                  <label htmlFor="input-cardno">
                    Credit Card Number <span className="required-f">*</span>
                  </label>
                  <input
                    name="cardno"
                    placeholder="Credit Card Number"
                    id="input-cardno"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group col-md-6 required">
                  <label htmlFor="input-cvv">
                    CVV Code <span className="required-f">*</span>
                  </label>
                  <input
                    name="cvv"
                    placeholder="Card Verification Number"
                    id="input-cvv"
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="form-group col-md-6 required">
                  <label htmlFor="input-exdate">
                    Expiration Date <span className="required-f">*</span>
                  </label>
                  <input
                    type="date"
                    name="exdate"
                    id="input-exdate"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6 d-flex align-items-end">
                  <img
                    className="img-fluid"
                    src="src/images/payment-img.jpg"
                    alt="Card Types"
                    title="Card Types"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
