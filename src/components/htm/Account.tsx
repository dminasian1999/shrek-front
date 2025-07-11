import React, { useState, useContext } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { UserEditData } from "../../utils/types.ts"
import {
  changePassword,
  updateUser,
} from "../../features/api/accountActions.ts"
import Breadcrumb from "./Breadcrumb.tsx"
import Address from "./Address.tsx"
import PaymentInfo from "./PaymentInfo.tsx"
import AddProduct from "./AddProduct.tsx"
import { ProductsContext } from "../../utils/context.ts"
import Products from "./Products.tsx"

const Account = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)
  const { language } = useContext(ProductsContext)

  const [user, setUser] = useState({} as UserEditData)
  const [edit, setEdit] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const resetForm = () => {
    setUser({} as UserEditData)
    setOldPassword("")
    setNewPassword("")
    setRepeatPassword("")
  }

  const handleSave = () => {
    if (edit) {
      dispatch(updateUser(user))
    }
    if (updatePassword) {
      if (newPassword !== repeatPassword) {
        alert(
          language === "Armenian"
            ? "Գաղտնաբառերը չեն համընկնում։"
            : language === "Russian"
              ? "Пароли не совпадают."
              : "Passwords do not match."
        )
        return
      }
      dispatch(changePassword({ oldPassword, newPassword }))
    }
    setEdit(false)
    setUpdatePassword(false)
    resetForm()
  }

  return (
    <div className="app-body container">
      <Breadcrumb />

      <div className="accordion" id="accordionUserProfile">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingUser">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseUser"
              aria-expanded="true"
              aria-controls="collapseUser"
            >
              {language === "Armenian"
                ? "Օգտագործողի պրոֆիլ"
                : language === "Russian"
                  ? "Профиль пользователя"
                  : "User Profile"}
            </button>
          </h2>

          <div
            id="collapseUser"
            className="accordion-collapse collapse show"
            aria-labelledby="headingUser"
          >
            <div className="accordion-body">
              <div className="row gx-3">
                {/* Profile Picture */}
                <div className="col-sm-4 col-12 mb-3 d-flex justify-content-center align-items-center text-center">
                  <div className="fa fa-user-circle fa-5x" />
                </div>

                {/* User Info */}
                <div className="col-sm-8 col-12">
                  <div className="row gx-3">
                    <div className="col-6">
                      {/* First Name */}
                      <div className="mb-3">
                        <label className="form-label">
                          {language === "Armenian"
                            ? "Անուն"
                            : language === "Russian"
                              ? "Имя"
                              : "First Name"}
                        </label>
                        {edit ? (
                          <input
                            className="form-control"
                            value={user.firstName || ""}
                            placeholder="First Name"
                            onChange={e =>
                              setUser({
                                ...user,
                                firstName: e.target.value.trim(),
                              })
                            }
                          />
                        ) : (
                          <h5>{profile.firstName}</h5>
                        )}
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <h5>{profile.login}</h5>
                      </div>
                    </div>

                    <div className="col-6">
                      {/* Last Name */}
                      <div className="mb-3">
                        <label className="form-label">
                          {language === "Armenian"
                            ? "Ազգանուն"
                            : language === "Russian"
                              ? "Фамилия"
                              : "Last Name"}
                        </label>
                        {edit ? (
                          <input
                            className="form-control"
                            value={user.lastName || ""}
                            placeholder="Last Name"
                            onChange={e =>
                              setUser({
                                ...user,
                                lastName: e.target.value.trim(),
                              })
                            }
                          />
                        ) : (
                          <h5>{profile.lastName}</h5>
                        )}
                      </div>

                      {/* Role or Password Change */}
                      {updatePassword ? (
                        <div className="list-group gap-2">
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder={
                              language === "Armenian"
                                ? "Հին գաղտնաբառ"
                                : language === "Russian"
                                  ? "Старый пароль"
                                  : "Old Password"
                            }
                            value={oldPassword}
                            onChange={e =>
                              setOldPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder={
                              language === "Armenian"
                                ? "Նոր գաղտնաբառ"
                                : language === "Russian"
                                  ? "Новый пароль"
                                  : "New Password"
                            }
                            value={newPassword}
                            onChange={e =>
                              setNewPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder={
                              language === "Armenian"
                                ? "Կրկնել գաղտնաբառը"
                                : language === "Russian"
                                  ? "Повторите пароль"
                                  : "Repeat New Password"
                            }
                            value={repeatPassword}
                            onChange={e =>
                              setRepeatPassword(e.target.value.trim())
                            }
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label className="form-label">
                            {language === "Armenian"
                              ? "Դերերը"
                              : language === "Russian"
                                ? "Роли"
                                : "Roles"}
                          </label>
                          <ul className="mb-0">
                            {profile.roles.map((role, idx) => (
                              <li key={idx} className="h6">{role}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2 justify-content-end mt-4">
                {(edit || updatePassword) ? (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setEdit(false)
                        setUpdatePassword(false)
                        resetForm()
                      }}
                    >
                      {language === "Armenian"
                        ? "Չեղարկել"
                        : language === "Russian"
                          ? "Отмена"
                          : "Cancel"}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      {language === "Armenian"
                        ? "Պահպանել"
                        : language === "Russian"
                          ? "Сохранить"
                          : "Save"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => setEdit(true)}
                    >
                      {language === "Armenian"
                        ? "Խմբագրել օգտատիրոջ տվյալները"
                        : language === "Russian"
                          ? "Редактировать профиль"
                          : "Edit User"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setUpdatePassword(true)}
                    >
                      {language === "Armenian"
                        ? "Փոխել գաղտնաբառը"
                        : language === "Russian"
                          ? "Изменить пароль"
                          : "Update Password"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <Address />
      <PaymentInfo />
      {profile.roles.includes("ADMINISTRATOR") && <AddProduct />}
      {profile.roles.includes("ADMINISTRATOR") && <Products />}
    </div>
  )
}

export default Account
