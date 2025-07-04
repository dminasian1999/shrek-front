import React from "react"
import MapLocation from "./MapLocation.tsx"

const NavContactUs = () => {
  return (
    <div className="contact-us">
      {/*<HeaderEntry />*/}
      <div className="contact-area py-3">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-4">
                <div className="contact-content">
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fal fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Address</h5>
                      <p>Armenian Patriarchate st. 68, Jlm, Israel</p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fal fa-phone"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Call Us</h5>
                      <p>+972 52-500-5936</p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Email Us</h5>
                      <p>mamjerusalem@gmail.com</p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className="fal fa-clock"></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>Open Time</h5>
                      <p>Mon - Sat (09:00AM - 17:00PM)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 align-self-center">
                <div className="contact-form">
                  <div className="contact-form-header">
                    <h2>Get In Touch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page randomised
                      words which don't look even slightly when looking at its
                      layout.{" "}
                    </p>
                  </div>
                  <form
                    method="post"
                    action="/mozex/assets/php/contact.php"
                    id="contact-form"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Your Subject"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        cols={30}
                        rows={5}
                        className="form-control"
                        placeholder="Write Your Message"
                      ></textarea>
                    </div>
                    <button type="submit" className="theme-btn">
                      Send Message <i className="far fa-paper-plane"></i>
                    </button>
                    <div className="col-md-12 mt-3">
                      <div className="form-messege text-success"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="map-container"
        style={{ textAlign: "center", padding: "20px 0" }}
      >
        <MapLocation />
      </div>
    </div>
  )
}

export default NavContactUs
