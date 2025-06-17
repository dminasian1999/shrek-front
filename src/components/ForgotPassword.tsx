import React from 'react';

export default function ForgotPassword() {
    return (
        <div className="login-bg">
            <div className="container p-0">
                <div className="row g-0">
                    <div className="col-xl-6 col-lg-12"></div>
                    <div className="col-xl-6 col-lg-12">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-8 col-sm-4 col-12">
                                <form action="index.html" className="my-5">
                                    <div className="bg-white p-5 rounded-4">
                                        <div className="login-form">
                                            <a href="index.html" className="mb-4 d-flex">
                                                <img
                                                    src="assets/images/logo-dark.svg"
                                                    className="img-fluid login-logo"
                                                    alt="Admin Dashboards"
                                                />
                                            </a>
                                            <h5 className="fw-light mb-4 lh-2">
                                                In order to access your account, please enter the email id
                                                you provided during the registration process.
                                            </h5>
                                            <div className="mb-3">
                                                <label className="form-label">Your Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div className="d-grid py-2">
                                                <a href="index.html" className="btn btn-lg btn-primary">
                                                    SUBMIT
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
