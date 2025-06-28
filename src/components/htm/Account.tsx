import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { UserEditData } from "../../utils/types.ts"
import {
  changePassword,
  updateUser,
} from "../../features/api/accountActions.ts"
import Breadcrumb from "../Breadcrumb.tsx"
import Address from "./Address.tsx"
import PaymentInfo from "./PaymentInfo.tsx"

const Account = () => {
  // const handleImageChange = (idx: any)=> {
  //     uploadImage().then(r => );
  // }
  const token = useAppSelector(state => state.token)
  const profile = useAppSelector(state => state.user.profile)
  const [user, setUser] = useState({} as UserEditData)
  const [edit, setEdit] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  // const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const dispatch = useAppDispatch()

  const handleClickClear = () => {
    setOldPassword("")
    setNewPassword("")
    setRepeatPassword("")
  }

  const handleClickSave = () => {
    if (newPassword === repeatPassword) {
      dispatch(changePassword({ newPassword, oldPassword }))
    }
    close()
  }

  return (
    <div className="app-body container">
      <Breadcrumb />

      <div className="accordion " id="accordionUserProfile">
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
                  <div id="update-profile">
                    <div className="fa fa-user-circle fa-5x" />
                  </div>
                </div>

                <div className="col-sm-8 col-12">
                  <div className="row gx-3">
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">
                          First Name
                        </label>
                        {edit ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            onChange={e =>
                              setUser({
                                ...user,
                                firstName: e.target.value.trim(),
                              })
                            }
                          />
                        ) : (
                          <h1>{profile.firstName}</h1>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">
                          Email
                        </label>
                        <h1>{profile.login}</h1>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">
                          Last Name
                        </label>
                        {edit ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={e =>
                              setUser({
                                ...user,
                                lastName: e.target.value.trim(),
                              })
                            }
                          />
                        ) : (
                          <h1>{profile.lastName}</h1>
                        )}
                      </div>

                      {updatePassword ? (
                        <div className="mb-3 list-group gap-3">
                          <input
                            className="list-group-item"
                            placeholder="Old Password"
                            type="password"
                            value={oldPassword}
                            onChange={e =>
                              setOldPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            placeholder="New Password"
                            type="password"
                            value={newPassword}
                            onChange={e =>
                              setNewPassword(e.target.value.trim())
                            }
                          />
                          <input
                            className="list-group-item"
                            placeholder="Repeat New Password"
                            type="password"
                            value={repeatPassword}
                            onChange={e =>
                              setRepeatPassword(e.target.value.trim())
                            }
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label htmlFor="birthDay" className="form-label">
                            Role
                          </label>
                          <ul>
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

              {edit || updatePassword ? (
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setUser({} as typeof user)
                      handleClickClear()
                      setEdit(false)
                      setUpdatePassword(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (edit) dispatch(updateUser(user))
                      if (updatePassword) handleClickSave()
                      setUser({} as typeof user)
                      handleClickClear()
                      setEdit(false)
                      setUpdatePassword(false)
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setEdit(true)}
                  >
                    Edit User
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setUpdatePassword(true)}
                  >
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Address />
      <PaymentInfo />
    </div>
  )
}

export default Account
