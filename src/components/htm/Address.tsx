import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { updateAddress } from "../../features/api/accountActions.ts"
import { AddressT } from "../../utils/types.ts"

const Address = () => {
  const address = useAppSelector((state) => state.user.profile.address);
const dispatch = useAppDispatch();
  // Initialize formData with address from Redux store
  const [formData, setFormData] = useState({} as AddressT);
  const [edit, setEdit] = useState(false);

  // Optional: Update formData if address changes
  useEffect(() => {
    setFormData({
      firstname: address?.firstname || "",
      lastname: address?.lastname || "",
      email: address?.email || "",
      telephone: address?.telephone || "",
      company: address?.company || "",
      address_1: address?.address_1 || "",
      address_2: address?.address_2 || "",
      city: address?.city || "",
      postcode: address?.postcode || "",
      country_id: address?.country_id || "",
      zone_id: address?.zone_id || "",
    });
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    setEdit(false);
    // Reset formData to Redux store values on cancel
    setFormData({
      firstname: address?.firstname || "",
      lastname: address?.lastname || "",
      email: address?.email || "",
      telephone: address?.telephone || "",
      company: address?.company || "",
      address_1: address?.address_1 || "",
      address_2: address?.address_2 || "",
      city: address?.city || "",
      postcode: address?.postcode || "",
      country_id: address?.country_id || "",
      zone_id: address?.zone_id || "",
    });
  };

  const handleSave = () => {
    // Save logic here (e.g., API call)
    setEdit(false);
    dispatch(updateAddress(formData))
  };

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
            <form>
              <fieldset>
                <h2 className="login-title mb-3">Billing details</h2>
                <div className="row">
                  {["firstname", "lastname"].map((field) => (
                    <div key={field} className="form-group col-md-6 required">
                      <label htmlFor={`input-${field}`}>
                        {field === "firstname" ? "First Name" : "Last Name"}{" "}
                        <span className="required-f">*</span>
                      </label>
                      {edit ? (
                        <input
                          name={field}
                          id={`input-${field}`}
                          type="text"
                          className="form-control"
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {formData[field] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="row mt-3">
                  {["email", "telephone"].map((field) => (
                    <div key={field} className="form-group col-md-6 required">
                      <label htmlFor={`input-${field}`}>
                        {field === "email" ? "E-Mail" : "Telephone"}{" "}
                        <span className="required-f">*</span>
                      </label>
                      {edit ? (
                        <input
                          name={field}
                          id={`input-${field}`}
                          type={field === "email" ? "email" : "tel"}
                          className="form-control"
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {formData[field] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-4">
                <div className="row">
                  {["company", "address_1"].map((field) => (
                    <div key={field} className="form-group col-md-6">
                      <label htmlFor={`input-${field}`}>
                        {field === "company" ? "Company" : "Address"}{" "}
                        {field === "address_1" && (
                          <span className="required-f">*</span>
                        )}
                      </label>
                      {edit ? (
                        <input
                          name={field}
                          id={`input-${field}`}
                          type="text"
                          className="form-control"
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {formData[field] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="row mt-3">
                  {["address_2", "city"].map((field) => (
                    <div key={field} className="form-group col-md-6">
                      <label htmlFor={`input-${field}`}>
                        {field === "address_2" ? "Apartment" : "City"}{" "}
                        <span className="required-f">*</span>
                      </label>
                      {edit ? (
                        <input
                          name={field}
                          id={`input-${field}`}
                          type="text"
                          className="form-control"
                          value={formData[field]}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {formData[field] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="row mt-3">
                  <div className="form-group col-md-6 required">
                    <label htmlFor="input-postcode">
                      Post Code <span className="required-f">*</span>
                    </label>
                    {edit ? (
                      <input
                        name="postcode"
                        id="input-postcode"
                        type="text"
                        className="form-control"
                        value={formData.postcode}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">
                        {formData.postcode || "-"}
                      </p>
                    )}
                  </div>
                  <div className="form-group col-md-6 required">
                    <label htmlFor="input-country">
                      Country <span className="required-f">*</span>
                    </label>
                    {edit ? (
                      <select
                        name="country_id"
                        id="input-country"
                        className="form-control"
                        value={formData.country_id}
                        onChange={handleChange}
                      >
                        <option value=""> --- Please Select ---</option>
                        <option value="244">Aaland Islands</option>
                        <option value="1">Afghanistan</option>
                        <option value="2">Albania</option>
                      </select>
                    ) : (
                      <p className="form-control-plaintext">
                        {formData.country_id || "-"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="form-group col-md-6 required">
                    <label htmlFor="input-zone">
                      Region / State <span className="required-f">*</span>
                    </label>
                    {edit ? (
                      <select
                        name="zone_id"
                        id="input-zone"
                        className="form-control"
                        value={formData.zone_id}
                        onChange={handleChange}
                      >
                        <option value=""> --- Please Select ---</option>
                        <option value="3513">Aberdeen</option>
                        <option value="3514">Aberdeenshire</option>
                      </select>
                    ) : (
                      <p className="form-control-plaintext">
                        {formData.zone_id || "-"}
                      </p>
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
