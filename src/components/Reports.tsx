import React from 'react';

export default function Reports() {
    return (
        <div className="page-wrapper">
            <div className="app-container">

                {/* App header */}
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

                                    {/* Search */}
                                    <div className="search-container d-none d-lg-block">
                                        <input type="text" id="search" className="form-control" placeholder="Search" />
                                        <i className="icon-search" />
                                    </div>

                                    {/* Notifications */}
                                    <div className="d-sm-flex d-none align-items-center gap-2">
                                        {/* ... other dropdown actions ... */}
                                    </div>

                                    {/* User menu */}
                                    <div className="dropdown ms-3">
                                        <a id="userSettings" className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/assets/images/user2.png" className="rounded-2 img-3x" alt="User" />
                                            <div className="ms-2 text-truncate d-lg-block d-none text-white">
                                                <span className="d-flex opacity-50 small">Admin</span>
                                                <span>Taylor Franklin</span>
                                            </div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <a className="dropdown-item" href="/profile"><i className="icon-user border border-primary text-primary"></i> Profile</a>
                                            <a className="dropdown-item" href="/settings"><i className="icon-settings border border-danger text-danger"></i> Settings</a>
                                            <div className="mx-3 mt-2 d-grid">
                                                <a href="/login" className="btn btn-outline-danger">Logout</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile menu toggle */}
                                    <button className="btn btn-warning btn-sm ms-3 d-lg-none d-md-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#MobileMenu">
                                        <i className="icon-menu"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* App navbar */}
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        {/* Offcanvas mobile menu omitted for brevity */}
                    </div>
                </nav>

                {/* App body */}
                <main className="app-body">
                    <div className="container">

                        {/* Breadcrumb */}
                        <div className="row gx-3 mb-3">
                            <div className="col-12 col-xl-6">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <i className="icon-house_siding lh-1" />
                                        <a href="/public" className="text-decoration-none ms-1">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">Dashboards</li>
                                    <li className="breadcrumb-item active">Reports</li>
                                </ol>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="row gx-3 mb-3">
                            <div className="col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body position-relative">
                                        <div className="d-flex align-items-center">
                                            <div className="p-3">
                                                <i className="icon-phone display-5 text-info"></i>
                                            </div>
                                            <div className="pt-2">
                                                <h5 className="fw-light opacity-50">Calls</h5>
                                                <h1 className="m-0">250</h1>
                                            </div>
                                            <span className="badge bg-info position-absolute top-0 end-0 m-3"><i className="icon-trending-up me-1"></i>15%</span>
                                        </div>
                                        <div id="callsData" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="card">
                                    <div className="card-body position-relative">
                                        <div className="d-flex align-items-center">
                                            <div className="p-3">
                                                <i className="icon-shopping-bag display-5 text-info"></i>
                                            </div>
                                            <div className="pt-2">
                                                <h5 className="fw-light opacity-50">Revenue</h5>
                                                <h1 className="m-0">$6,400</h1>
                                            </div>
                                            <span className="badge bg-danger position-absolute top-0 end-0 m-3"><i className="icon-trending-up me-1"></i>18%</span>
                                        </div>
                                        <div id="revenueData" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Earnings Chart */}
                        <div className="row gx-3 mb-3">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Earnings</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-xl-7 col-lg-6">
                                                <div id="world-map-markers3" className="chart-height-xl" />
                                            </div>
                                            <div className="col-xl-5 col-lg-6">
                                                <div className="row g-3">
                                                    {/* Earnings stats omitted for brevity */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reports Table & Calls History & Other sections omitted for brevity */}

                    </div>
                </main>

                {/* App footer */}
                <footer className="app-footer">
                    <div className="container text-center">
                        <span>© Bootstrap Gallery 2024</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}
