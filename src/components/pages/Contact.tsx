import React from "react"
import MapLocation1 from "../htm/MapLocation1.tsx"
import MapLocation2 from "../htm/MapLocation2.tsx"
import { adminInfo, links } from "../../utils/constants.ts"

const Contact: React.FC = () => {
  const telHref = `tel:${(adminInfo.phone || "").replace(/\s+/g, "")}`
  const mailHref = `mailto:${adminInfo.email}`

  return (
    <div className="container py-4 py-md-5">
      {/* Header */}
      <div className="row align-items-center mb-4 mb-md-5">
        <div className="col-12 text-center">
          <h1 className="display-6 fw-semibold mb-2">Contact Us</h1>
          <p className="text-muted mb-0">
            We’re happy to help—find us on the map or reach out via phone or email.
          </p>
        </div>
      </div>

      {/* Maps */}
      <div className="row g-3 g-md-4 mb-4 mb-md-5">
        <div className="col-12 col-lg-6">
          <div className="ratio ratio-4x3 rounded-3 overflow-hidden shadow-sm hover-shadow">
            <MapLocation1 />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="ratio ratio-4x3 rounded-3 overflow-hidden shadow-sm hover-shadow">
            <MapLocation2 />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="row g-3 g-md-4">
        {/* Opening Hours */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <i className="fa fa-clock me-2 fs-5 text-primary" aria-hidden="true" />
                <h5 className="mb-0">Opening Hours</h5>
              </div>
              <p className="mb-1 text-muted small">Every day</p>
              <p className="mb-0 fw-medium">11:00 – 18:00</p>
            </div>
          </div>
        </div>

        {/* Address / Phone / Email */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4">
              <h5 className="mb-3">Get in touch</h5>

              <ul className="list-unstyled mb-4 d-grid gap-3">
                <li className="d-flex">
                  <i className="icon anm anm-map-marker-al me-3 mt-1 fs-5" aria-hidden="true" />
                  <div>
                    <div className="text-muted small">Address</div>
                    <div className="fw-medium">{adminInfo.address}</div>
                  </div>
                </li>
                <li className="d-flex">
                  <i className="icon anm anm-phone-s me-3 mt-1 fs-5" aria-hidden="true" />
                  <div>
                    <div className="text-muted small">Phone</div>
                    <a className="fw-medium link-underline link-underline-opacity-0" href={telHref}>
                      {adminInfo.phone}
                    </a>
                  </div>
                </li>
                <li className="d-flex">
                  <i className="icon anm anm-envelope-l me-3 mt-1 fs-5" aria-hidden="true" />
                  <div>
                    <div className="text-muted small">Email</div>
                    <a className="fw-medium link-underline link-underline-opacity-0" href={mailHref}>
                      {adminInfo.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="col-12 col-lg-3">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4">
              <h5 className="mb-3">Follow us</h5>
              <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
                {links.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light border d-inline-flex align-items-center gap-2 rounded-pill py-2 px-3 shadow-none social-icons__link"
                      title={item.name}
                      aria-label={item.name}
                    >
                      <i className={`icon icon-${item.name}`} aria-hidden="true" />
                      <span className="small">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: contact form could go here as another card if/when you enable it */}
    </div>
  )
}

export default Contact
