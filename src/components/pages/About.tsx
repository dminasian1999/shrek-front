import React from "react"
import { bgHero } from "../../utils/constants"
import Contact from "./Contact"

export default function About() {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="text-center py-4 bg-light border-bottom mb-4">
        <h1 className="fw-bold mb-0">About Us</h1>
      </div>

      <div className="container">
        <section className="mb-5">
          <div className="card text-white border-0 rounded-4 shadow-lg overflow-hidden">
            {/* Background Image */}
            <img
              src={bgHero}
              alt="Gejekoushian Gift Shop — Jerusalem"
              className="card-img object-fit-cover"
              style={{ height: "50vh" }} // Made slightly taller for more impact
            />

            {/* Dark Overlay for Contrast */}
            <div
              className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center p-4 p-md-5"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }} // Darker overlay
            >
              {/* Content Wrapper for Max-Width */}
              <div style={{ maxWidth: "800px" }}>
        <span className="badge bg-light text-dark fw-semibold mb-3 px-3 py-2 fs-6">
          Gejekoushian • Since the 1960s
        </span>

                <h1
                  className="display-5 display-md-3 fw-bold mb-3"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }} // Subtle shadow for "pop"
                >
                  Hand-crafted heritage from Jerusalem’s Old City
                </h1>

                <p className="lead mb-0 opacity-75 fw-light">
                  Silver & stones • Armenian ceramics • Christian gifts • Holy Land souvenirs
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* SHOPS */}
        <section className="mb-5">
          <div className="d-flex align-items-center mb-3">
            <div
              className="border-start border-4 border-warning ps-3 fw-semibold"
              style={{ color: "#ef9468" }}
            >
              Our Shops in the Old City
            </div>
            <span className="badge bg-warning-subtle text-dark ms-3 border">
              Open 11:00 – 18:00
            </span>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">Shop 1 — Next to Zion Gate</h5>
                  <p className="text-muted small mb-2">Address: <span className="fw-semibold">No. 15</span></p>
                  <p className="mb-0">
                    Steps from the ancient walls — a cozy entry to our world of silverwork and ceramics.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="fw-bold">Shop 2 — Habad Street</h5>
                  <p className="text-muted small mb-2">
                    Address: <span className="fw-semibold">No. 84</span> (near the Jewish Quarter)
                  </p>
                  <p className="mb-0">
                    A bright boutique showcasing Eilat stones, Jerusalem crosses, Star of David pieces, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="mb-5">
          <div className="row g-4">
            <div className="col-lg-7">
              <h2 className="h4 mb-3">Our Story</h2>
              <p className="lead">
                Step into Jerusalem’s Old City and discover the Gejekoushian family tradition.
                For three generations, our Armenian family has shared Holy Land beauty through art,
                jewelry, Christian souvenirs, and hand-painted ceramics.
              </p>
              <p>
                Armenian pottery is world-famous for its vibrant colors and lasting quality.
                Our mission: to bring a piece of the Holy Land into your home.
              </p>

              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-0">
                  <strong>1960s — The Beginning:</strong> Krikor and Berj Gejekoushian opened their first shop.
                </li>
                <li className="list-group-item ps-0">
                  <strong>Craft & Influence:</strong> Mr. Berj inspired Israeli and Christian jewelry makers.
                </li>
                <li className="list-group-item ps-0">
                  <strong>The Next Generation:</strong> His sons Gregory, Steven, and George continued the vision.
                </li>
                <li className="list-group-item ps-0">
                  <strong>Ceramic Heritage:</strong> The family expanded to hand-painted Armenian ceramics.
                </li>
              </ul>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">What You’ll Find</h5>
                  <ul className="mb-0">
                    <li>Top-quality Israeli & Christian jewelry</li>
                    <li>Eilat stone, Star of David & Jerusalem crosses</li>
                    <li>Hand-crafted Armenian ceramics</li>
                    <li>Meaningful Holy Land souvenirs</li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 small">
                <span className="badge bg-light text-dark border">Family-owned</span>
                <span className="badge bg-light text-dark border">Hand-crafted</span>
                <span className="badge bg-light text-dark border">Jerusalem</span>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE */}
        <section className="mb-5">
          <div className="ratio ratio-21x9 rounded-4 overflow-hidden shadow-sm">
            <img src={bgHero} alt="Armenian ceramics and silverwork" className="w-100 h-100 object-fit-cover" />
          </div>
        </section>

        {/* CLOSING NOTE */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 mb-2">With best regards,</h3>
              <p className="mb-0">
                <strong>The Gejekoushian Family of Jerusalem</strong><br />
                We hope to see you soon in our shop!
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mb-4">
          <Contact />
        </section>
      </div>
    </div>
  )
}
