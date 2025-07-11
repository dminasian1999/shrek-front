import React, { useContext, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { fetchUser } from "../../features/api/accountActions.ts"
import { createToken } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"
import { Link } from "react-router-dom"

const Login = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()
  const { loading, errorMessage } = useAppSelector(state => state.user)
  const { language } = useContext(ProductsContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!login || !password) {
      alert(
        language === "Armenian"
          ? "Խնդրում ենք լրացնել բոլոր դաշտերը։"
          : language === "Russian"
            ? "Пожалуйста, заполните все поля."
            : "Please fill in all fields."
      )
      return
    }

    dispatch(fetchUser(createToken(login, password)))
  }

  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">
              {language === "Armenian"
                ? "Մուտք"
                : language === "Russian"
                  ? "Вход"
                  : "Login"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
            <div className="mb-4">
              <form
                method="post"
                action="#"
                id="CustomerLoginForm"
                acceptCharset="UTF-8"
                className="contact-form"
              >
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="CustomerEmail">
                        {language === "Armenian"
                          ? "Էլ. հասցե"
                          : language === "Russian"
                            ? "Эл. почта"
                            : "Email"}
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder={
                          language === "Armenian"
                            ? "օրինակ՝ example@email.com"
                            : language === "Russian"
                              ? "например example@email.com"
                              : "example@email.com"
                        }
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        disabled={loading}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="CustomerPassword">
                        {language === "Armenian"
                          ? "Գաղտնաբառ"
                          : language === "Russian"
                            ? "Пароль"
                            : "Password"}
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder={
                          language === "Armenian"
                            ? "************"
                            : language === "Russian"
                              ? "************"
                              : "************"
                        }
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                    <button
                      type="submit"
                      className="btn mb-3"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="spinner-border" />
                      ) : language === "Armenian" ? (
                        "Մուտք գործել"
                      ) : language === "Russian" ? (
                        "Войти"
                      ) : (
                        "Sign In"
                      )}
                    </button>
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}
                    <p className="mb-4">
                      <a href="#" id="RecoverPassword">
                        {language === "Armenian"
                          ? "Մոռացել եք գաղտնաբառը?"
                          : language === "Russian"
                            ? "Забыли пароль?"
                            : "Forgot your password?"}
                      </a>{" "}
                      &nbsp; | &nbsp;
                      <Link to="/register" id="customer_register_link">
                        {language === "Armenian"
                          ? "Ստեղծել հաշիվ"
                          : language === "Russian"
                            ? "Создать аккаунт"
                            : "Create account"}
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
