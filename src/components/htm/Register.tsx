import React, { useContext, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { registerUser } from "../../features/api/accountActions"
import { ProductsContext } from "../../utils/context"

const Register = () => {
  const dispatch = useAppDispatch()
  const { language } = useContext(ProductsContext)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!login || !password || !firstName || !lastName) {
      alert(
        language === "Armenian"
          ? "Բոլոր դաշտերը պարտադիր են։"
          : language === "Russian"
            ? "Все поля обязательны для заполнения."
            : "All fields are required."
      )
      return
    }

    if (!agreed) {
      alert(
        language === "Armenian"
          ? "Պարտադիր է ընդունել պայմանները։"
          : language === "Russian"
            ? "Вы должны принять условия."
            : "You must agree to the terms and conditions."
      )
      return
    }

    dispatch(registerUser({ login, password, firstName, lastName }))
  }

  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">
              {language === "Armenian"
                ? "Ստեղծել Հաշիվ"
                : language === "Russian"
                  ? "Создать аккаунт"
                  : "Create an Account"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
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
                      ? "Մուտքագրեք ձեր էլ. հասցեն"
                      : language === "Russian"
                        ? "Введите ваш эл. адрес"
                        : "Enter your email"
                  }
                  value={login}
                  onChange={(e) => setLogin(e.target.value.trim())}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  {language === "Armenian"
                    ? "Գաղտնաբառ"
                    : language === "Russian"
                      ? "Пароль"
                      : "Password"}
                </label>
                <div className="input-group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder={
                      language === "Armenian"
                        ? "Մուտքագրեք գաղտնաբառը"
                        : language === "Russian"
                          ? "Введите пароль"
                          : "Enter password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-group-text btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? (language === "Armenian"
                          ? "Թաքցնել գաղտնաբառը"
                          : language === "Russian"
                            ? "Скрыть пароль"
                            : "Hide password")
                        : (language === "Armenian"
                          ? "Ցույց տալ գաղտնաբառը"
                          : language === "Russian"
                            ? "Показать пароль"
                            : "Show password")
                    }
                  >
                    <i className={`icon-eye${showPassword ? "-off" : ""}`}></i>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  {language === "Armenian"
                    ? "Անուն"
                    : language === "Russian"
                      ? "Имя"
                      : "First Name"}
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  placeholder={
                    language === "Armenian"
                      ? "Մուտքագրեք անունը"
                      : language === "Russian"
                        ? "Введите имя"
                        : "Enter First Name"
                  }
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value.trim())}
                  required
                  autoComplete="given-name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  {language === "Armenian"
                    ? "Ազգանուն"
                    : language === "Russian"
                      ? "Фамилия"
                      : "Last Name"}
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  placeholder={
                    language === "Armenian"
                      ? "Մուտքագրեք ազգանունը"
                      : language === "Russian"
                        ? "Введите фамилию"
                        : "Enter Last Name"
                  }
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.trim())}
                  required
                  autoComplete="family-name"
                />
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  id="termsConditions"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label
                  className="form-check-label mx-1"
                  htmlFor="termsConditions"
                >
                  {language === "Armenian"
                    ? "Ես համաձայն եմ պայմանների հետ"
                    : language === "Russian"
                      ? "Я согласен с условиями"
                      : "I agree to the terms and conditions"}
                </label>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  {language === "Armenian"
                    ? "Գրանցվել"
                    : language === "Russian"
                      ? "Зарегистрироваться"
                      : "SIGN UP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
