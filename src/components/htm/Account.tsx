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
import Products from "./Products.tsx"
import Orders from "./Orders.tsx"
import { ProductsContext } from "../../utils/context.ts"

const Account = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)
  const token = useAppSelector(state => state.token)
  const { language } = useContext(ProductsContext) // You can remove if not used anymore

  const myOrders = profile.orders || []

  const [user, setUser] = useState<UserEditData>({ firstName: profile.firstName, lastName: profile.lastName })
  const [edit, setEdit] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const resetForm = () => {
    setUser({ firstName: profile.firstName, lastName: profile.lastName })
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
        alert("Passwords do not match.")
        return
      }
      dispatch(changePassword({ oldPassword, newPassword }))
    }
    setEdit(false)
    setUpdatePassword(false)
    resetForm()
  }

  return (
    <>
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
              User Profile
            </button>
          </h2>

          <div
            id="collapseUser"
            className="accordion-collapse collapse show"
            aria-labelledby="headingUser"
          >
            <div className="accordion-body">
              <div className="row gx-3">
                <div className="col-sm-4 col-12 mb-3 d-flex justify-content-center align-items-center text-center">
                  <div className="fa fa-user-circle fa-5x" />
                </div>

                <div className="col-sm-8 col-12">
                  <div className="row gx-3">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
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

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <h5>{profile.login}</h5>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
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

                      {updatePassword ? (
                        <div className="list-group gap-2">
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={e =>
                              setOldPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e =>
                              setNewPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            type="password"
                            placeholder="Repeat New Password"
                            value={repeatPassword}
                            onChange={e =>
                              setRepeatPassword(e.target.value.trim())
                            }
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label className="form-label">Roles</label>
                          <ul className="mb-0">
                            {profile.roles.map((role, idx) => (
                              <li key={idx} className="h6">
                                {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end mt-4">
                {edit || updatePassword ? (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setEdit(false)
                        setUpdatePassword(false)
                        resetForm()
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => setEdit(true)}
                    >
                      Edit User
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setUpdatePassword(true)}
                    >
                      Update Password
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pass orders, token, baseUrl to Orders */}
      <Orders />

      <Address />
      <PaymentInfo />

      {profile.roles.includes("ADMINISTRATOR") && <Products />}
    </>
  )
}

export default Account
