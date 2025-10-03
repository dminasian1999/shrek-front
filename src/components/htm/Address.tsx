import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { updateAddress } from "../../features/api/accountActions.ts";
import { AddressT } from "../../utils/types.ts";
import { countries } from "../../utils/constants.ts";

const Address = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.user.profile?.address);

  const [formData, setFormData] = useState<AddressT>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [edit, setEdit] = useState(false);

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
      });
    } else {
      setFormData({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });
    }
  }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (address) {
      setFormData({
        fullName: address.fullName || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || "",
        phone: address.phone || "",
      });
    } else {
      setFormData({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });
    }
    setEdit(false);
  };

  const handleSave = () => {
    dispatch(updateAddress(formData));
    setEdit(false);
  };

  const labels = {
    fullName: "Full Name",
    street: "Street Address",
    city: "City",
    state: "State / Region",
    zipCode: "Postal Code",
    country: "Country",
    phone: "Phone Number",
  } as const;

  const renderPlain = (val?: string) => (
    <p className="form-control-plaintext mb-0">{val || "-"}</p>
  );

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
            Billing Address
          </button>
        </h2>

        <div
          id="collapseAddress"
          className="accordion-collapse collapse"
          aria-labelledby="headingAddress"
        >
          <div className="accordion-body">
            <form onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <h5 className="mb-3">Billing Details</h5>

                <div className="row">
                  {/* Full Name */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-fullName" className="form-label">
                      {labels.fullName}
                    </label>
                    {edit ? (
                      <input
                        id="input-fullName"
                        name="fullName"
                        type="text"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    ) : (
                      renderPlain(formData.fullName)
                    )}
                  </div>

                  {/* Street */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-street" className="form-label">
                      {labels.street}
                    </label>
                    {edit ? (
                      <input
                        id="input-street"
                        name="street"
                        type="text"
                        className="form-control"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        autoComplete="street-address"
                      />
                    ) : (
                      renderPlain(formData.street)
                    )}
                  </div>

                  {/* City */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-city" className="form-label">
                      {labels.city}
                    </label>
                    {edit ? (
                      <input
                        id="input-city"
                        name="city"
                        type="text"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        autoComplete="address-level2"
                      />
                    ) : (
                      renderPlain(formData.city)
                    )}
                  </div>

                  {/* State */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-state" className="form-label">
                      {labels.state}
                    </label>
                    {edit ? (
                      <input
                        id="input-state"
                        name="state"
                        type="text"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        autoComplete="address-level1"
                      />
                    ) : (
                      renderPlain(formData.state)
                    )}
                  </div>

                  {/* Zip Code */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-zipCode" className="form-label">
                      {labels.zipCode}
                    </label>
                    {edit ? (
                      <input
                        id="input-zipCode"
                        name="zipCode"
                        type="text"
                        className="form-control"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 94105"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    ) : (
                      renderPlain(formData.zipCode)
                    )}
                  </div>

                  {/* Country */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-country" className="form-label">
                      {labels.country}
                    </label>
                    {edit ? (
                      <select
                        id="input-country"
                        name="country"
                        className="form-select"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        autoComplete="country-name"
                      >
                        <option value="">Select country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    ) : (
                      renderPlain(formData.country)
                    )}
                  </div>

                  {/* Phone */}
                  <div className="form-group col-12 col-sm-6 mb-3">
                    <label htmlFor="input-phone" className="form-label">
                      {labels.phone}
                    </label>
                    {edit ? (
                      <input
                        id="input-phone"
                        name="phone"
                        type="tel"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. +1 415 555 1234"
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    ) : (
                      renderPlain(formData.phone)
                    )}
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
  );
};

export default Address;
