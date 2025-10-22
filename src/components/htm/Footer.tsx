import React from "react"
import { adminInfo, categories, links } from "../../utils/constants.ts"
import { Link } from "react-router-dom"

// --- Refactor: Data for static link lists ---
const infoLinks = [
  { path: "/about", label: "About Us" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-and-conditions", label: "Terms & Conditions" },
  { path: "/account", label: "My Account" },
]

const serviceLinks = [
  { path: "/faq", label: "FAQ's" },
  { path: "/contact", label: "Contact Us" },
  { path: "/orders-and-returns", label: "Orders and Returns" },
  { path: "/support-center", label: "Support Center" },
]

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter submission logic here
    console.log("Newsletter submitted")
  }

  return (
    <footer className="p-0" id="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          {" "}
          {/* --- Refactor: Added container for better alignment --- */}
          <div className="row p-0">
            <div className="col-lg-7 d-flex align-items-center">
              <div className="footer-newsletter w-100">
                <div className="section-header text-center text-lg-start">
                  <label htmlFor="newsletter-email" className="h2">
                    Sign up for newsletter
                  </label>
                </div>
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="input-group">
                    <input
                      type="email"
                      className="input-group__field newsletter__input"
                      name="EMAIL"
                      id="newsletter-email"
                      placeholder="Email address"
                      required
                    />
                    <span className="input-group__btn">
                      <button
                        type="submit"
                        className="btn newsletter__submit"
                        name="commit"
                        id="Subscribe"
                      >
                        <span className="newsletter__submit-text--large">
                          Subscribe
                        </span>
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* Social Icons */}
            <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end align-items-center mt-4 mt-lg-0">
              <div className="footer-social">
                <ul className="list--inline site-footer__social-icons social-icons">
                  {links.map(item => (
                    <li key={item.name}>
                      <a
                        href={item.route}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icons__link"
                        title={item.name}
                      >
                        <i className={`icon icon-${item.name}`}></i>
                        <span className="visually-hidden">{item.route}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              {/* Shop Links */}
              <div className="col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Shop</h4>
                <ul>
                  {categories.map(c => (
                    <li key={c.route}>
                      <Link to={`/shop/${c.route}`}>{c.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- Refactor: Mapped from data array --- */}
              <div className="col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Information</h4>
                <ul>
                  {infoLinks.map(link => (
                    <li key={link.path}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- Refactor: Mapped from data array --- */}
              <div className="col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Customer Services</h4>
                <ul>
                  {serviceLinks.map(link => (
                    <li key={link.path}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-md-3 col-lg-3 contact-box">
                <h4 className="h4">Contact Us</h4>
                <ul className="addressFooter">
                  <li>
                    <i className="icon anm anm-map-marker-al"></i>
                    <p>{adminInfo.address}</p>
                  </li>
                  <li className="phone">
                    <i className="icon anm anm-phone-s"></i>
                    <p>{adminInfo.phone}</p>
                  </li>
                  <li className="email">
                    <i className="icon anm anm-envelope-l"></i>
                    <p>{adminInfo.email}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

          {/* --- Refactor: Re-structured bottom for a logical 2-col layout --- */}
          <div className="footer-bottom">
            <div className="row align-items-center">
              {/* Copyright */}
              <div className="col-md-6 text-center text-md-start">
                <p className="mb-2 mb-md-0">
                  © {new Date().getFullYear()} Your Store Name. All Rights Reserved.
                </p>
              </div>

              {/* Payment Icons */}
              <div className="col-md-6 text-center text-md-end">
                <ul
                  className="payment-icons list--inline d-flex gap-2 justify-content-center justify-content-md-end"
                >
                  <li>
                    <i className="icon fa fa-cc-visa" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i
                      className="icon fa fa-cc-mastercard"
                      aria-hidden="true"
                    ></i>
                  </li>

                  <li>
                    <i className="icon fa fa-cc-paypal" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i className="icon fa fa-credit-card" aria-hidden="true"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
