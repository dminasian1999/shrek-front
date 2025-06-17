import React from 'react'
import {useAppSelector} from '../../app/hooks'
import {useNavigate} from 'react-router-dom';

const Info = () => {
    const user = useAppSelector(state => state.user.profile)
    const navigate = useNavigate();
    const profile = useAppSelector((state) => state.user.profile);

    return (
        <div
            className="tab-pane fade show active"
            id="oneA"
            role="tabpanel"
            aria-labelledby="tab-oneA"
        >
            <div className="row gx-3">
                <div
                    className="col-sm-4 col-12 mb-3 d-flex justify-content-center align-items-center text-center">
                    <div id="update-profile">
                        <div
                            className="fa fa-user-circle fa-5x"
                        />
                    </div>
                </div>

                <div className="col-sm-8 col-12">
                    <div className="row gx-3">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">
                                    First Name
                                </label>

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
                                <h1>{profile.lastName}</h1>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthDay" className="form-label">
                                    Role
                                </label>
                                <ul>{profile.roles.map((role) => (
                                    <li className=" h6">{role}</li>))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



)
}

export default Info
