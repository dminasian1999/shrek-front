import React from 'react';

export default function FAQ() {
    return (
        <div className="app-body">
            <div className="container">
                {/* Breadcrumb */}
                <div className="row gx-3">
                    <div className="col-12 col-xl-6">
                        <ol className="breadcrumb mb-3">
                            <li className="breadcrumb-item">
                                <i className="icon-house_siding lh-1"></i>
                                <a href="index.html" className="text-decoration-none">
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb-item">Pages</li>
                            <li className="breadcrumb-item">FAQ's</li>
                        </ol>
                    </div>
                </div>

                {/* FAQ card */}
                <div className="row gx-3">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="border rounded-3 p-5">
                                    {/* Search box */}
                                    <div className="mb-5">
                                        <h5 className="mb-3">How can we help?</h5>
                                        <p className="mb-3">
                                            Search for the topic you need help with or{' '}
                                            <a href="contact-us.html" className="text-primary">
                                                Contact our support
                                            </a>
                                        </p>
                                        <div className="input-group w-50">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                autoFocus
                                            />
                                            <button className="btn btn-primary" type="button">
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    {/* Accordion */}
                                    <div className="row gx-3">
                                        <div className="col-xxl-12">
                                            <div className="accordion" id="accordionFaq">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button
                                                            className="accordion-button"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                        >
                                                            What’s your return policy?
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse show"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionFaq"
                                                    >
                                                        <div className="accordion-body">
                                                            Discover 100s of premium admin themes & admin dashboards, including multipurpose and responsive landing pages and HTML templates.
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ...repeat for other questions... */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Still can’t find your answer */}
                                    <div className="text-center pt-5 border border-dark p-3 w-50 rounded-3 mt-5 m-auto">
                                        <h3>Still can’t find your answer?</h3>
                                        <p className="fw-300">We are happy to help!</p>
                                        <a href="contact-us.html" className="btn btn-outline-primary">
                                            Contact us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
