import React from 'react';

export default function ContactUs() {
    return (
        <div className="page-wrapper">
            <div className="app-container">
                {/* Header */}
                <header className="app-header d-flex align-items-center">
                    <div className="container">
                        <div className="row gx-3">
                            <div className="col-md-3 col-2">
                                <div className="app-brand">
                                    <a href="/public" className="d-lg-block d-none">
                                        <img src="/assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
                                    </a>
                                    <a href="/public" className="d-lg-none d-md-block">
                                        <img src="/assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-9 col-10">
                                <div className="header-actions col">
                                    <div className="search-container d-none d-lg-block">
                                        <input
                                            type="text"
                                            id="search"
                                            className="form-control"
                                            placeholder="Search"
                                        />
                                        <i className="icon-search" />
                                    </div>
                                    {/* Additional header actions... */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg">
                    {/* Offcanvas mobile menu and nav items... */}
                </nav>

                {/* Main Content */}
                <main className="app-body">
                    <div className="container">
                        {/* Breadcrumb */}
                        <div className="row gx-3">
                            <div className="col-12 col-xl-6">
                                <ol className="breadcrumb mb-3">
                                    <li className="breadcrumb-item">
                                        <i className="icon-house_siding lh-1" />
                                        <a href="/public" className="text-decoration-none">
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">Pages</li>
                                    <li className="breadcrumb-item">Contact Us</li>
                                </ol>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="row gx-3">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Contact Us</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-5">
                                                <div className="p-3">
                                                    <h3 className="mb-3">
                                                        Say Hello <span className="display-5">👋</span>
                                                    </h3>
                                                    <div className="row gx-3">
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="fullName" className="form-label">
                                                                    Full Name <span className="text-danger fs-5">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="fullName"
                                                                    placeholder="Enter your full name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="yourEmail" className="form-label">
                                                                    Email <span className="text-danger fs-5">*</span>
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="yourEmail"
                                                                    placeholder="Enter your email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="yourMessage" className="form-label">
                                                                    Message <span className="text-danger fs-5">*</span>
                                                                </label>
                                                                <textarea
                                                                    rows={3}
                                                                    className="form-control"
                                                                    id="yourMessage"
                                                                    placeholder="Enter your message..."
                                                                />
                                                            </div>
                                                            <div className="d-grid">
                                                                <button type="button" className="btn btn-primary btn-lg">
                                                                    Send Message
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="app-footer">
                    <div className="container">
                        <span>© Bootstrap Gallery 2024</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
