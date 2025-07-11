import React, { useState, useEffect, useContext } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { updateAddress } from "../../features/api/accountActions.ts"
import { AddressT } from "../../utils/types.ts"
import { ProductsContext } from "../../utils/context.ts"

const Address = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector((state) => state.user.profile.address)
  const { language } = useContext(ProductsContext)

  const [formData, setFormData] = useState<AddressT>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || "",
        phone: address.phone || "",
      })
    }
  }, [address])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    if (address) {
      setFormData({ ...address })
    }
    setEdit(false)
  }

  const handleSave = () => {
    dispatch(updateAddress(formData))
    setEdit(false)
  }

  const labels: Record<keyof AddressT, string> = {
    fullName:
      language === "Armenian"
        ? "Ամբողջական անուն"
        : language === "Russian"
          ? "Полное имя"
          : "Full Name",
    street:
      language === "Armenian"
        ? "Փողոց"
        : language === "Russian"
          ? "Улица"
          : "Street Address",
    city:
      language === "Armenian"
        ? "Քաղաք"
        : language === "Russian"
          ? "Город"
          : "City",
    state:
      language === "Armenian"
        ? "Մարզ / Շրջան"
        : language === "Russian"
          ? "Область / Регион"
          : "State / Region",
    zipCode:
      language === "Armenian"
        ? "Փոստային ինդեքս"
        : language === "Russian"
          ? "Почтовый индекс"
          : "Postal Code",
    country:
      language === "Armenian"
        ? "Երկիր"
        : language === "Russian"
          ? "Страна"
          : "Country",
    phone:
      language === "Armenian"
        ? "Հեռախոսահամար"
        : language === "Russian"
          ? "Номер телефона"
          : "Phone Number",
  }

  return (
    <div className="accordion" id="accordionAddress">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingAddress">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseAddress"
            aria-expanded="false"
            aria-controls="collapseAddress"
          >
            {language === "Armenian"
              ? "Հասցե"
              : language === "Russian"
                ? "Адрес"
                : "Billing Address"}
          </button>
        </h2>
        <div
          id="collapseAddress"
          className="accordion-collapse collapse"
          aria-labelledby="headingAddress"
        >
          <div className="accordion-body">
            <form>
              <fieldset>
                <h5 className="mb-3">
                  {language === "Armenian"
                    ? "Վճարման տվյալներ"
                    : language === "Russian"
                      ? "Платежные данные"
                      : "Billing Details"}
                </h5>

                <div className="row">
                  {Object.entries(labels).map(([name, label]) => (
                    <div
                      key={name}
                      className="form-group col-sm-6 col-12 mb-3"
                    >
                      <label htmlFor={`input-${name}`}>{label}</label>
                      {edit ? (
                        <input
                          id={`input-${name}`}
                          name={name}
                          type="text"
                          className="form-control"
                          value={formData[name as keyof AddressT]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {formData[name as keyof AddressT] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
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
                      {language === "Armenian"
                        ? "Չեղարկել"
                        : language === "Russian"
                          ? "Отмена"
                          : "Cancel"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      {language === "Armenian"
                        ? "Պահպանել"
                        : language === "Russian"
                          ? "Сохранить"
                          : "Save"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setEdit(true)}
                  >
                    {language === "Armenian"
                      ? "Խմբագրել"
                      : language === "Russian"
                        ? "Редактировать"
                        : "Edit"}
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

export default Address
