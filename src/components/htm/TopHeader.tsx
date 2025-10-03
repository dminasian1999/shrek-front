import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { deleteUser } from "../../features/slices/userSlice.ts"
import { deleteToken } from "../../features/slices/tokenSlice.ts"
import { adminInfo } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const TopHeader = () => {
  const [currency, setCurrency] = useState("USD")
  const {language, setLanguage} = useContext(ProductsContext)
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
            <div className="language-dropdown dropdown ">
              <span data-bs-toggle="dropdown"  className="language-dd">{language}</span>
              <ul className={'dropdown-menu'} >
                {["English", "Russian","Armenian"].map((lang) => (
                  <li className={'dropdown-item'} key={lang} onClick={() => setLanguage(lang)}>

                    <div className="dropdown-item-text">{lang}</div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="phone-no">
              <i className="anm anm-phone-s"></i>{adminInfo.phone}
            </p>
          </div>

          <div className="col-sm-4 col-md-4 col-lg-4 d-none d-md-block d-lg-block d-blo d-xl-block">
            <div className="text-center">
              <p className="top-header_middle-text">{language === "Armenian"
                ? "Բարի գալուստ Sevan souvenirs"
                : language === "Russian"
                  ? ""
                  : "Welcome to Sevan souvenirs"}</p>
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
                    <li className={'text-dark'}>
                      <Link className="dropdown-item text-dark" to="/login">{language === "Armenian"
                        ? "Մուտք"
                        : language === "Russian"
                          ? "Войти"
                          : "Login"}</Link>
                    </li>
                    <li>

                      <Link className="dropdown-item text-dark" to="/register">{language === "Armenian"
                        ? "Գրանցում"
                        : language === "Russian"
                          ? "Регистрация"
                          : "Create Account"}</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item text-dark" to="/account">{language === "Armenian"
                        ? "Հաշիվ"
                        : language === "Russian"
                          ? "Аккаунт"
                          : "Account"}</Link>
                    </li>
                    <li><Link className="dropdown-item text-dark" to={'/'} onClick={confirmLogout}>{language === "Armenian"
                      ? "Ելք"
                      : language === "Russian"
                        ? "Выход"
                        : "Logout"}</Link></li>


                  </>
                )}
              </ul>
            </div>

            <ul className="customer-links list-inline d-none d-lg-block d-xl-block">
              {!token ? (
                <>
                  <li><Link to="/login">{language === "Armenian"
                    ? "Մուտք"
                    : language === "Russian"
                      ? "Войти"
                      : "Login"}</Link></li>
                  <li><Link to="/register">{language === "Armenian"
                    ? "Գրանցում"
                    : language === "Russian"
                      ? "Регистрация"
                      : "Create Account"}</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/account">{language === "Armenian"
                    ? "Հաշիվ"
                    : language === "Russian"
                      ? "Аккаунт"
                      : "Account"}</Link></li>
                  <li><Link to={'/'} onClick={confirmLogout}>{language === "Armenian"
                    ? "Ելք"
                    : language === "Russian"
                      ? "Выход"
                      : "Logout"}</Link></li>

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
