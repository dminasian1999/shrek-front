import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { fetchUser } from "../../features/api/accountActions.ts"
import { createToken } from "../../utils/constants.ts"
import { Link } from "react-router-dom"

const Login = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()
  const { loading, errorMessage } = useAppSelector(state => state.user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!login || !password) {
      alert("Please fill in all fields.")
      return
    }

    dispatch(fetchUser(createToken(login, password)))
  }

  // useEffect(() => {
  //   return () =>set
  // })

  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Login</h1>
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
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        disabled={loading}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="************"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        // disabled={loading}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="text-center col-12">
                    <button
                      type="submit"
                      className="btn mb-3"
                      onClick={handleSubmit}
                      // disabled={loading}
                    >
                      {loading ? (
                        <div className="spinner-border" />
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
                      <Link  to={"/forgot-password"} id="RecoverPassword">
                        Forgot your password?
                      </Link>{" "}
                      &nbsp; | &nbsp;
                      <Link to="/register" id="customer_register_link">
                        Create account
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
