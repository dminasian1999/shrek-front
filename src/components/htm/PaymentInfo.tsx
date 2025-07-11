import React, { useContext } from "react"
import { ProductsContext } from "../../utils/context"

const PaymentInfo = () => {
  const { language } = useContext(ProductsContext)

  const t = {
    heading:
      language === "Armenian"
        ? "Վճարման տեղեկատվություն"
        : language === "Russian"
          ? "Платежная информация"
          : "Payment Information",
    nameOnCard:
      language === "Armenian"
        ? "Քարտի վրա գրված անունը"
        : language === "Russian"
          ? "Имя на карте"
          : "Name on Card",
    cardType:
      language === "Armenian"
        ? "Քարտի տեսակը"
        : language === "Russian"
          ? "Тип карты"
          : "Credit Card Type",
    cardNumber:
      language === "Armenian"
        ? "Քարտի համարը"
        : language === "Russian"
          ? "Номер карты"
          : "Credit Card Number",
    cvv:
      language === "Armenian"
        ? "CVV կոդ"
        : language === "Russian"
          ? "CVV код"
          : "CVV Code",
    expDate:
      language === "Armenian"
        ? "Ժամկետի ավարտը"
        : language === "Russian"
          ? "Срок действия"
          : "Expiration Date",
    placeholderName:
      language === "Armenian"
        ? "Անունը քարտի վրա"
        : language === "Russian"
          ? "Имя на карте"
          : "Card Name",
    placeholderCardNumber:
      language === "Armenian"
        ? "Քարտի համարը"
        : language === "Russian"
          ? "Номер карты"
          : "Credit Card Number",
    placeholderCVV:
      language === "Armenian"
        ? "Անվտանգության կոդ"
        : language === "Russian"
          ? "Код безопасности"
          : "Card Verification Number",
    selectPrompt:
      language === "Armenian"
        ? "--- Խնդրում ենք ընտրել ---"
        : language === "Russian"
          ? "--- Пожалуйста, выберите ---"
          : "--- Please Select ---",
  }

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
            {t.heading}
          </button>
        </h2>

        <div
          id="collapsePayment"
          className="accordion-collapse collapse"
          aria-labelledby="headingPayment"
        >
          <div className="accordion-body">
            <fieldset>
              <div className="row">
                <div className="form-group col-md-6 required mb-3">
                  <label htmlFor="input-cardname">
                    {t.nameOnCard} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="input-cardname"
                    name="cardname"
                    type="text"
                    className="form-control"
                    placeholder={t.placeholderName}
                  />
                </div>

                <div className="form-group col-md-6 required mb-3">
                  <label htmlFor="input-cardtype">
                    {t.cardType} <span className="text-danger">*</span>
                  </label>
                  <select
                    id="input-cardtype"
                    name="cardtype"
                    className="form-control"
                  >
                    <option value="">{t.selectPrompt}</option>
                    <option value="1">American Express</option>
                    <option value="2">Visa</option>
                    <option value="3">MasterCard</option>
                    <option value="4">Discover</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 required mb-3">
                  <label htmlFor="input-cardno">
                    {t.cardNumber} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="input-cardno"
                    name="cardno"
                    type="text"
                    className="form-control"
                    placeholder={t.placeholderCardNumber}
                  />
                </div>

                <div className="form-group col-md-6 required mb-3">
                  <label htmlFor="input-cvv">
                    {t.cvv} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="input-cvv"
                    name="cvv"
                    type="text"
                    className="form-control"
                    placeholder={t.placeholderCVV}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 required mb-3">
                  <label htmlFor="input-exdate">
                    {t.expDate} <span className="text-danger">*</span>
                  </label>
                  <input
                    id="input-exdate"
                    name="exdate"
                    type="date"
                    className="form-control"
                  />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
