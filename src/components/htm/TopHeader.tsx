import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { deleteUser } from "../../features/slices/userSlice.ts"
import { deleteToken } from "../../features/slices/tokenSlice.ts"

const TopHeader = () => {
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("English")
  const dispatch = useAppDispatch()

  const confirmLogout = () => {
    dispatch(deleteUser())
    dispatch(deleteToken())
  }
  const token = useAppSelector((state) => state.token)

  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 col-sm-8 col-md-5 col-lg-4">
            <div className="currency-picker">
              <span className="selected-currency">{currency}</span>
              <ul id="currencies">
                {["INR", "GBP", "CAD", "USD", "AUD", "EUR", "JPY"].map((cur) => (
                  <li
                    key={cur}
                    data-currency={cur}
                    className={currency === cur ? "selected" : ""}
                    onClick={() => setCurrency(cur)}
                  >
                    {cur}
                  </li>
                ))}
              </ul>
            </div>
            <div className="language-dropdown">
              <span className="language-dd">{language}</span>
              <ul id="language">
                {["German", "French"].map((lang) => (
                  <li key={lang} onClick={() => setLanguage(lang)}>
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
            <p className="phone-no">
              <i className="anm anm-phone-s"></i> +440 0(111) 044 833
            </p>
          </div>

          <div className="col-sm-4 col-md-4 col-lg-4 d-none d-md-block d-lg-block d-blo d-xl-block">
            <div className="text-center">
              <p className="top-header_middle-text">Worldwide Express Shipping</p>
            </div>
          </div>

          <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
            <div className="dropdown">
              <div className="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="user-menu d-block d-lg-none">
                  <i className="anm anm-user-al"></i>
                </span>
              </div>

              <ul className="dropdown-menu">
                {!token ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">Login</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">Create Account</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/account">My Account</Link>
                    </li>
                    <li><Link className="dropdown-item" to={'/'} onClick={confirmLogout}>Logout</Link></li>

                    <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>

                  </>
                )}
              </ul>
            </div>

            <ul className="customer-links list-inline d-none d-lg-block d-xl-block">
              {!token ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Create Account</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/account">My Account</Link></li>
                  <li><Link to={'/'} onClick={confirmLogout}>Logout</Link></li>
                  <li><Link to="/wishlist">Wishlist</Link></li>

                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
