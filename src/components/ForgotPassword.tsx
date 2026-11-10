import { Link } from "react-router-dom"
import { adminInfo } from "../utils/constants"

export default function ForgotPassword() {
  return (
    <section className="container py-5" style={{ maxWidth: 640 }}>
      <h1>Account help</h1>
      <p>
        Automated password recovery is currently unavailable. Contact the shop
        for help accessing your account.
      </p>
      <p>
        <a href={`mailto:${adminInfo("English").email}`}>
          {adminInfo("English").email}
        </a>
      </p>
      <Link to="/login" className="btn">
        Back to sign in
      </Link>
    </section>
  )
}
