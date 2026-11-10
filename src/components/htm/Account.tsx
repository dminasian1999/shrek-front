import { useState } from "react"
import type { FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changePassword, updateUser } from "../../features/api/accountActions"
import Address from "./Address"
import Products from "./Products"
import OrderHistory from "./OrderHistory"

const Account = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)
  const [firstName, setFirstName] = useState(profile.firstName || "")
  const [lastName, setLastName] = useState(profile.lastName || "")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function save(event: FormEvent, password: boolean) {
    event.preventDefault()
    setMessage("")
    setError("")
    if (password && newPassword !== repeatPassword) {
      setError("The new passwords must match.")
      return
    }
    setBusy(true)
    try {
      if (password) {
        await dispatch(changePassword({ oldPassword, newPassword })).unwrap()
        setOldPassword("")
        setNewPassword("")
        setRepeatPassword("")
        setMessage("Your password has been updated.")
      } else {
        await dispatch(
          updateUser({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          }),
        ).unwrap()
        setMessage("Your profile has been saved.")
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : typeof cause === "object" && cause && "message" in cause
            ? String(cause.message)
            : "Unable to save. Please try again.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="container py-5">
      <h1>My account</h1>
      <p>Signed in as {profile.login}</p>
      {error && (
        <p role="alert" className="alert alert-danger">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="alert alert-success">
          {message}
        </p>
      )}
      <div className="row g-4 mb-5">
        <form
          className="col-12 col-md-6"
          onSubmit={event => void save(event, false)}
        >
          <fieldset disabled={busy}>
            <legend>Profile details</legend>
            <label htmlFor="profile-first-name">First name</label>
            <input
              id="profile-first-name"
              className="form-control mb-3"
              required
              maxLength={100}
              autoComplete="given-name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="profile-last-name">Last name</label>
            <input
              id="profile-last-name"
              className="form-control mb-3"
              required
              maxLength={100}
              autoComplete="family-name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <button className="btn" type="submit">
              Save profile
            </button>
          </fieldset>
        </form>
        <form
          className="col-12 col-md-6"
          onSubmit={event => void save(event, true)}
        >
          <fieldset disabled={busy}>
            <legend>Change password</legend>
            <label htmlFor="old-password">Current password</label>
            <input
              id="old-password"
              className="form-control mb-3"
              type="password"
              required
              autoComplete="current-password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <label htmlFor="new-password">
              New password (at least 8 characters)
            </label>
            <input
              id="new-password"
              className="form-control mb-3"
              type="password"
              required
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <label htmlFor="repeat-password">Confirm new password</label>
            <input
              id="repeat-password"
              className="form-control mb-3"
              type="password"
              required
              autoComplete="new-password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
            <button className="btn" type="submit">
              Update password
            </button>
          </fieldset>
        </form>
      </div>
      <Address />
      <OrderHistory />
      <p className="mt-4">
        Payment details are entered securely with PayPal at checkout.
      </p>
      {profile.roles?.some(
        role => role === "ADMINISTRATOR" || role === "MODERATOR",
      ) && <Products />}
    </section>
  )
}

export default Account
