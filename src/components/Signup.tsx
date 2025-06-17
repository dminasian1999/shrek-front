// src/pages/Signup.jsx
import React from 'react';

export default function Signup() {
    return (
        <div className="login-bg">
            <div className="container p-0">
                <div className="row g-0">
                    <div className="col-xl-6 col-lg-12" />
                    <div className="col-xl-6 col-lg-12">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-8 col-sm-4 col-12">
                                <form action="index.html" className="my-5">
                                    <div className="bg-white p-5 rounded-4">
                                        <div className="login-form">
                                            <a href="index.html" className="mb-4 d-flex">
                                                <img
                                                    src="/assets/images/logo-dark.svg"
                                                    className="img-fluid login-logo"
                                                    alt="Admin Dashboards"
                                                />
                                            </a>
                                            <h2 className="mt-4 mb-4">SignUp</h2>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <div className="input-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter password"
                                                    />
                                                    <a href="#" className="input-group-text">
                                                        <i className="icon-eye" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="form-check m-0 mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsConditions"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="termsConditions"
                                                >
                                                    I agree to the terms and conditions
                                                </label>
                                            </div>
                                            <div className="d-grid py-3 mt-3 gap-3">
                                                <a href="index.html" className="btn btn-lg btn-primary">
                                                    SIGNUP
                                                </a>
                                                <a
                                                    href="login.html"
                                                    className="btn btn-lg btn-outline-dark"
                                                >
                                                    LOGIN
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
