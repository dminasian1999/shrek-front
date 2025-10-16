import React from "react"
import { adminInfo, categories, links } from "../../utils/constants.ts"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="p-0" id="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="row p-0">
          <div className="col-12 col-sm-12 col-md-12 col-lg-7 d-flex justify-content-start align-items-center">
            <div className="display-table">
              <div className="display-table-cell footer-newsletter">
                <div className="section-header text-center">
                  <label htmlFor="newsletter-email" className="h2">
                    Sign up for newsletter
                  </label>
                </div>
                <form action="#" method="post">
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
          </div>

          {/* Social Icons */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex justify-content-end align-items-center">
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

      {/* Footer Links */}
      <div className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              {/* Shop Links */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Shop</h4>
                <ul>
                  {categories.map(c => (
                    <li key={c.route}>
                      <Link to={`/shop/${c.route}`}>{c.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Information Links */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Information</h4>
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/account">My Account</Link>
                  </li>
                </ul>
              </div>

              {/* Customer Services Links */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">Customer Services</h4>
                <ul>
                  <li>
                    <Link to="/faq">FAQ's</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/orders-and-returns">Orders and Returns</Link>
                  </li>
                  <li>
                    <Link to="/support-center">Support Center</Link>
                  </li>
                </ul>

              </div>

              {/* Contact Info */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 contact-box">
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

          {/* Payment Icons */}
          <div className="footer-bottom">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-0 order-md-1 text-right text-md-center">
                <ul className="payment-icons list--inline d-flex gap-2">
                  <li><i className="icon fa fa-cc-visa" aria-hidden="true"></i></li>
                  <li><i className="icon fa fa-cc-mastercard" aria-hidden="true"></i></li>
                  <li><i className="icon fa fa-cc-paypal" aria-hidden="true"></i></li>
                  <li><i className="icon fa fa-credit-card" aria-hidden="true"></i></li>
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
