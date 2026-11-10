import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updateAddress } from "../../features/api/accountActions"
import type { AddressT } from "../../utils/types"
import { completeAddress, commerceError } from "../../utils/commerce"

const emptyAddress: AddressT = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: "",
}
const fields: {
  name: keyof AddressT
  label: string
  autocomplete: string
  required: boolean
}[] = [
  {
    name: "fullName",
    label: "Full name",
    autocomplete: "name",
    required: true,
  },
  {
    name: "street",
    label: "Street address",
    autocomplete: "street-address",
    required: true,
  },
  {
    name: "city",
    label: "City",
    autocomplete: "address-level2",
    required: true,
  },
  {
    name: "state",
    label: "State / region (optional)",
    autocomplete: "address-level1",
    required: false,
  },
  {
    name: "zipCode",
    label: "Postal code",
    autocomplete: "postal-code",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    autocomplete: "country-name",
    required: true,
  },
  { name: "phone", label: "Phone number", autocomplete: "tel", required: true },
]

const Address = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector(state => state.user.profile.address)
  const [form, setForm] = useState<AddressT>(address || emptyAddress)
  const [edit, setEdit] = useState(!completeAddress(address))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  useEffect(() => {
    setForm(address || emptyAddress)
  }, [address])

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    if (saving) return
    setError("")
    setMessage("")
    if (!completeAddress(form)) {
      setError("Complete the required address fields.")
      return
    }
    setSaving(true)
    try {
      const trimmed = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()]),
      ) as unknown as AddressT
      await dispatch(updateAddress(trimmed)).unwrap()
      setEdit(false)
      setMessage("Delivery address saved.")
    } catch (cause) {
      setError(
        commerceError(cause, "Unable to save the address. Please try again."),
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="border rounded p-3 p-md-4">
      <h2 className="h4 mb-3">Delivery address</h2>
      {error && (
        <p role="alert" className="text-danger">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-success">
          {message}
        </p>
      )}
      {edit ? (
        <form onSubmit={event => void save(event)}>
          <div className="row">
            {fields.map(field => (
              <div
                className={`mb-3 ${field.name === "street" ? "col-12" : "col-sm-6"}`}
                key={field.name}
              >
                <label
                  className="form-label"
                  htmlFor={`delivery-${field.name}`}
                >
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                <input
                  id={`delivery-${field.name}`}
                  name={field.name}
                  className="form-control"
                  type={field.name === "phone" ? "tel" : "text"}
                  autoComplete={field.autocomplete}
                  value={form[field.name]}
                  required={field.required}
                  maxLength={field.name === "street" ? 200 : 100}
                  onChange={event =>
                    setForm(previous => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  disabled={saving}
                />
              </div>
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn" disabled={saving} type="submit">
              {saving ? "Saving…" : "Save delivery address"}
            </button>
            {completeAddress(address) && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={saving}
                onClick={() => {
                  setForm(address!)
                  setEdit(false)
                  setError("")
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          <address className="mb-3">
            {address?.fullName}
            <br />
            {address?.street}
            <br />
            {address?.city}
            {address?.state ? `, ${address.state}` : ""} {address?.zipCode}
            <br />
            {address?.country}
            <br />
            {address?.phone}
          </address>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setEdit(true)
              setMessage("")
            }}
          >
            Edit address
          </button>
        </>
      )}
    </section>
  )
}
export default Address
