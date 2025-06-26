import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-light text-light pt-5">
      {/* Newsletter Section */}
      <div className="container mb-5">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div className="text-center text-lg-start">
              <h2 className="h4 fw-bold">
                <span>Sign up for </span>newsletter
              </h2>
              <form className="input-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                />
                <button type="submit" className="btn btn-dark">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-5 text-center text-lg-end">
            <div className="d-flex justify-content-center justify-content-lg-end gap-3 mt-3 mt-lg-0">
              <a href="#" className="text-light fs-4">📘</a>
              <a href="#" className="text-light fs-4">🐦</a>
              <a href="#" className="text-light fs-4">📌</a>
              <a href="#" className="text-light fs-4">📷</a>
              <a href="#" className="text-light fs-4">🎥</a>
              <a href="#" className="text-light fs-4">🎬</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-dark text-light py-5">
        <div className="container ">
          <div className="row ">
            {/* Quick Shop */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Quick Shop</h5>
              <ul className="list-unstyled mt-3">
                <li><a href="#" className="text-white text-decoration-none">Women</a></li>
                <li><a href="#" className="text-white text-decoration-none">Men</a></li>
                <li><a href="#" className="text-white text-decoration-none">Kids</a></li>
                <li><a href="#" className="text-white text-decoration-none">Sportswear</a></li>
                <li><a href="#" className="text-white text-decoration-none">Sale</a></li>
              </ul>
            </div>
            {/* Informations */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Informations</h5>
              <ul className="list-unstyled mt-3">
                <li><a href="#" className="text-white text-decoration-none">About us</a></li>
                <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-white text-decoration-none">Privacy policy</a></li>
                <li><a href="#" className="text-white text-decoration-none">Terms & condition</a></li>
                <li><a href="#" className="text-white text-decoration-none">My Account</a></li>
              </ul>
            </div>
            {/* Customer Services */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Customer Services</h5>
              <ul className="list-unstyled mt-3">
                <li><a href="#" className="text-white text-decoration-none">Request Personal Data</a></li>
                <li><a href="#" className="text-white text-decoration-none">FAQ's</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-white text-decoration-none">Orders and Returns</a></li>
                <li><a href="#" className="text-white text-decoration-none">Support Center</a></li>
              </ul>
            </div>
            {/* Contact Us */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Contact Us</h5>
              <ul className="list-unstyled mt-3">
                <li className="d-flex">
                  <span className="me-2">📍</span>
                  <span>55 Gallaxy Enque,<br />2568 steet, 23568 NY</span>
                </li>
                <li className="d-flex mt-2">
                  <span className="me-2">📞</span>
                  <span>(440) 000 000 0000</span>
                </li>
                <li className="d-flex mt-2">
                  <span className="me-2">✉️</span>
                  <span>sales@yousite.com</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-light mt-4" />

          {/* Footer Bottom */}
          <div className="text-center pt-2">
            <small>
              &copy; {new Date().getFullYear()} <a href="https://templateshub.net" className="text-white text-decoration-underline">Templates Hub</a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
