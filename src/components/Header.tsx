import React, {useState} from 'react'
import {deleteToken} from '../features/slices/tokenSlice'
import {deleteUser} from '../features/slices/userSlice'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {Link} from "react-router-dom";
import {defaultPic} from "../utils/constants.ts";


const Header: React.FC = () => {
    const user = useAppSelector(state => state.user.profile)
    const [logOut, setLogOut] = useState(false)
    const dispatch = useAppDispatch()

    const confirmLogout = () => {
        dispatch(deleteUser())
        dispatch(deleteToken())
        setLogOut(false)
    }

    return (
        <header className="app-header d-flex align-items-center">
            <div className="container">
                <div className="row">
                    {/* Brand / Logo */}
                    <div className="col-md-3 col-2">
                        <div className="app-brand">
                            <a href="/" className="d-lg-block d-none">
                                <img
                                    src={defaultPic}
                                    className="logo object-fit-cover"
                                    alt="Bootstrap Gallery"
                                />
                            </a>
                            <a href="/" className="d-lg-none d-md-block">
                                <img
                                    src={defaultPic}
                                    className="logo object-fit-cover"
                                    alt="Bootstrap Gallery"
                                />
                            </a>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="col-md-9 col-10">
                        <div className="header-actions col">
                            <div className="dropdown ms-3">

                                <a
                                    id="userSettings"
                                    className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none"
                                    href="#!"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {/* Pretty Avatar */}
                                    <img
                                        src={ defaultPic}
                                        alt="User Avatar"
                                        className="rounded-circle border border-2 border-light shadow-sm"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    {/* Username & Role */}
                                    <div className="ms-2 text-truncate d-lg-block d-none text-white">
                    <span className="d-flex opacity-50 small">
                      { 'Guest'}
                    </span>
                                        <span>{user?.firstName || 'Anonymous'}</span>
                                    </div>
                                </a>

                                {/* Dropdown Menu */}
                                <div className="dropdown-menu dropdown-menu-end">
                                    <div className="header-action-links">
                                        <Link  className="dropdown-item" to="/account">
                                            <i className="fa fa-user border border-primary text-primary " />
                                            Profile
                                        </Link>

                                    </div>

                                    <div
                                        className="mx-3 mt-2 d-grid btn btn-outline-danger"
                                        onClick={confirmLogout}
                                    >
                                        Logout
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="btn btn-warning btn-sm ms-3 d-lg-none d-md-block"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#MobileMenu"
                            >
                                <i className="icon-menu" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
