import React, { useEffect, useState } from "react"
import { updatePaymentInfo } from "../../features/api/accountActions.ts"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { paymentMethodT } from "../../utils/types.ts"

const PaymentInfo = () => {
  const [edit, setEdit] = useState(false)
const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({} as paymentMethodT)
  const paymentMethod = useAppSelector((state) => state.user.profile.paymentMethod)

  const [initialData, setInitialData] = useState({ ...formData })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setFormData({ ...initialData })
    setEdit(false)
  }

  const handleSave = () => {
    setInitialData({ ...formData })
    setEdit(false)
   dispatch(updatePaymentInfo(formData))
  }

  useEffect(() => {
    if (paymentMethod) {
      setFormData(paymentMethod)
    }
  }, [paymentMethod])
  return (
    <div className="accordion" id="accordionPayment">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingPayment">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePayment"
            aria-expanded="false"
            aria-controls="collapsePayment"
          >
            Payment Information
          </button>
        </h2>
        <div
          id="collapsePayment"
          className="accordion-collapse collapse"
          aria-labelledby="headingPayment"
        >
          <div className="accordion-body">
            <form>
              <fieldset>
                <h5 className="mb-3">Card Details</h5>

                <div className="row">
                  <div className="form-group col-md-6 required mb-3">
                    <label htmlFor="input-cardname">Name on Card</label>
                    {edit ? (
                      <input
                        id="input-cardname"
                        name="cardname"
                        type="text"
                        className="form-control"
                        placeholder="Card Name"
                        value={formData.cardname}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{formData.cardname || "-"}</p>
                    )}
                  </div>

                  <div className="form-group col-md-6 required mb-3">
                    <label htmlFor="input-cardtype">Credit Card Type</label>
                    {edit ? (
                      <select
                        id="input-cardtype"
                        name="cardtype"
                        className="form-control"
                        value={formData.cardtype}
                        onChange={handleChange}
                      >
                        <option value="">--- Please Select ---</option>
                        <option value="American Express">American Express</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Discover">Discover</option>
                      </select>
                    ) : (
                      <p className="form-control-plaintext">{formData.cardtype || "-"}</p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6 required mb-3">
                    <label htmlFor="input-cardno">Credit Card Number</label>
                    {edit ? (
                      <input
                        id="input-cardno"
                        name="cardno"
                        type="text"
                        className="form-control"
                        placeholder="Card Number"
                        value={formData.cardno}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{formData.cardno || "-"}</p>
                    )}
                  </div>

                  <div className="form-group col-md-6 required mb-3">
                    <label htmlFor="input-cvv">CVV Code</label>
                    {edit ? (
                      <input
                        id="input-cvv"
                        name="cvv"
                        type="text"
                        className="form-control"
                        placeholder="Security Code"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{formData.cvv || "-"}</p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-6 required mb-3">
                    <label htmlFor="input-exdate">Expiration Date</label>
                    {edit ? (
                      <input
                        id="input-exdate"
                        name="exdate"
                        type="month"
                        className="form-control"
                        value={formData.exdate}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">
                        {formData.exdate ? formData.exdate.replace("-", "/") : "-"}
                      </p>
                    )}
                  </div>


                  <div className="form-group col-md-6 d-flex align-items-end">
                    <img
                      src="src/images/payment-img.jpg"
                      alt="Card Types"
                      title="Card Types"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="d-flex justify-content-end mt-4 gap-2">
                {edit ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
