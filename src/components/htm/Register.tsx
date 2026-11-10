import React, { useContext, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { registerUser } from "../../features/api/accountActions"
import { ProductsContext } from "../../utils/context"

const Register = () => {
  const dispatch = useAppDispatch()
  const { loading, errorMessage } = useAppSelector(state => state.user)
  const { language } = useContext(ProductsContext)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!login || !password || !firstName || !lastName) {
      alert(
        language === "Armenian"
          ? "Բոլոր դաշտերը պարտադիր են։"
          : language === "Russian"
            ? "Все поля обязательны для заполнения."
            : "All fields are required.",
      )
      return
    }

    dispatch(
      registerUser({
        login: login.trim().toLowerCase(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }),
    )
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
                  disabled={loading}
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
                  onChange={e => setLogin(e.target.value.trim())}
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
                    disabled={loading}
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
                    minLength={8}
                    maxLength={72}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-group-text btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? language === "Armenian"
                          ? "Թաքցնել գաղտնաբառը"
                          : language === "Russian"
                            ? "Скрыть пароль"
                            : "Hide password"
                        : language === "Armenian"
                          ? "Ցույց տալ գաղտնաբառը"
                          : language === "Russian"
                            ? "Показать пароль"
                            : "Show password"
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
                  disabled={loading}
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
                  onChange={e => setFirstName(e.target.value)}
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
                  disabled={loading}
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
                  onChange={e => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                />
              </div>

              {errorMessage && (
                <p className="alert alert-danger" role="alert">
                  {errorMessage}
                </p>
              )}
              <div className="d-grid">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary btn-lg"
                >
                  {loading
                    ? "Creating account…"
                    : language === "Armenian"
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
