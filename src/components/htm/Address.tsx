import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { updateAddress } from "../../features/api/accountActions.ts";
import { AddressT } from "../../utils/types.ts";

const Address = () => {
  const address = useAppSelector((state) => state.user.profile.address);
  const dispatch = useAppDispatch();

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
    setFormData({
      fullName: address?.fullName || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      zipCode: address?.zipCode || "",
      country: address?.country || "",
      phone: address?.phone || "",
    });
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEdit(false);
    setFormData({
      fullName: address?.fullName || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      zipCode: address?.zipCode || "",
      country: address?.country || "",
      phone: address?.phone || "",
    });
  };

  const handleSave = () => {
    setEdit(false);
    dispatch(updateAddress(formData));
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
                <h2 className="login-title mb-3">Billing Details</h2>
                <div className="row">
                  {[
                    { label: "Full Name", name: "fullName" },
                    { label: "Street Address", name: "street" },
                    { label: "City", name: "city" },
                    { label: "State / Region", name: "state" },
                    { label: "Postal Code", name: "zipCode" },
                    { label: "Country", name: "country" },
                    { label: "Phone Number", name: "phone" },
                  ].map(({ label, name }) => (
                    <div key={name} className="form-group col-md-6 mb-3">
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
