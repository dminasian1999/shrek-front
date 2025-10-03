import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { Link } from "react-router-dom"
import { deleteUser } from "../../features/slices/userSlice.ts"
import { deleteToken } from "../../features/slices/tokenSlice.ts"
import { adminInfo } from "../../utils/constants.ts"

const TopHeader = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.token)

  const confirmLogout = () => {
    dispatch(deleteUser())
    dispatch(deleteToken())
  }

  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="row">
          {/* Left side: phone */}
          <div className="col-10 col-sm-8 col-md-5 col-lg-4">
            <p className="phone-no">
              <i className="anm anm-phone-s"></i> {adminInfo.phone}
            </p>
          </div>

          {/* Middle text */}
          <div className="col-sm-4 col-md-4 col-lg-4 d-none d-md-block">
            <div className="text-center">
              <p className="top-header_middle-text">Welcome to Gejekoushian’s  Souvenirs</p>
            </div>
          </div>

          {/* Right side: user menu */}
          <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
            {/* Mobile dropdown */}
            <div className="dropdown">
              <div role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="user-menu d-block d-lg-none">
                  <i className="anm anm-user-al"></i>
                </span>
              </div>

              <ul className="dropdown-menu">
                {!token ? (
                  <>
                    <li>
                      <Link className="dropdown-item text-dark" to="/login">Login</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dark" to="/register">Create Account</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item text-dark" to="/account">Account</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dark" to="/" onClick={confirmLogout}>Logout</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Desktop links */}
            <ul className="customer-links list-inline d-none d-lg-block d-xl-block">
              {!token ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Create Account</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/account">Account</Link></li>
                  <li><Link to="/" onClick={confirmLogout}>Logout</Link></li>
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
