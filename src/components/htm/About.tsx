import React from "react"
import { bgHero } from "../../utils/constants.ts"
import MapLocation from "./MapLocation.tsx"

const About = () => {
  return (
    <div>
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">About Us</h1>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            <div className="text-center mb-4">
              <h2 className="h2">
                Welcome to Jerusalem’s Gejekoushian Gift Shop!
              </h2>
              <div className="rte-setting">
                <p>
                  We are proud to have two shops in the Old City:
                  <p> • Shop 1: Next to Zion Gate, No. 15</p>
                  <p className="">
                    • Shop 2: On Habad Street, No. 84, near the Jewish Quarter
                  </p>
                  <p>
                    Step into the heart of Jerusalem’s Old City and discover the
                    Gejekoushian family tradition. For three generations, our
                    Armenian family has been sharing the beauty of the Holy Land
                    through art, jewelry, Christian souvenirs, and authentic
                    hand-painted ceramics. .
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <img className="blur-up w-100 p-5" src={bgHero} alt="About Us" />
        </div>
        <div className="row">
          <div className="col-12">
            <h2>History </h2>
            <p>
              In our shops, you will find top-quality Israeli and Christian
              jewelry, meaningful souvenirs from the Holy Land, and unique
              Armenian ceramics, each piece hand-crafted and painted by our
              family. Armenian pottery is world-renowned for its rich tradition,
              vibrant colors, and lasting quality, and we are honored to
              continue this heritage. Our mission is simple: to bring a piece of
              the Holy Land into your home. Our Story: The Gejekoushian journey
              began in the 1960s, when Krikor and Berj Gejekoushian opened their
              first shop. Mr. Berj, one of Jerusalem’s oldest silversmiths,
              dedicated his life to the art of jewelry. With passion and
              expertise, he inspired Israeli and Christian jewelry makers and
              introduced the finest designs featuring Eilat stones, the Star of
              David, Jerusalem crosses, and many other sacred treasures. His
              sons Krikor (Gregory), Sevan (Steven), and Kevork (George) carried
              on their father’s vision. For over 30 years, through times of
              chaos and conflict, the Gejekoushian family has remained rooted in
              Jerusalem, committed to preserving their craft. Inspired by their
              Armenian culture, the family later expanded their work to include
              authentic, hand-painted Armenian ceramics. Each piece reflects not
              only artistry but also a living tradition of pride, care, and
              love. We hope to see you soon in our shop! With best regards, The
              Gejekoushian Family of Jerusalem
            </p>
            <p></p>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-4">
            <MapLocation />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <h2 className="h2">Contact Us</h2>
            <ul className="addressFooter">
              <li>
                <i className="icon anm anm-map-marker-al"></i>
                <p>55 Gallaxy Enque, 2568 steet, 23568 NY</p>
              </li>
              <li className="phone">
                <i className="icon anm anm-phone-s"></i>
                <p>(440) 000 000 0000</p>
              </li>
              <li className="email">
                <i className="icon anm anm-envelope-l"></i>
                <p>sales@yousite.com</p>
              </li>
            </ul>
            <hr />
            <ul className="list--inline site-footer__social-icons social-icons">
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Facebook"
                >
                  <i className="icon icon-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Twitter"
                >
                  <i className="icon icon-twitter"></i>
                  <span className="icon__fallback-text">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Pinterest"
                >
                  <i className="icon icon-pinterest"></i>{" "}
                  <span className="icon__fallback-text">Pinterest</span>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Instagram"
                >
                  <i className="icon icon-instagram"></i>{" "}
                  <span className="icon__fallback-text">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Tumblr"
                >
                  <i className="icon icon-tumblr-alt"></i>
                  <span className="icon__fallback-text">Tumblr</span>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on YouTube"
                >
                  <i className="icon icon-youtube"></i>
                  <span className="icon__fallback-text">YouTube</span>
                </a>
              </li>
              <li>
                <a
                  className="social-icons__link"
                  href="#"
                  target="_blank"
                  title="Belle Multipurpose Bootstrap 4 Template on Vimeo"
                >
                  <i className="icon icon-vimeo-alt"></i>
                  <span className="icon__fallback-text">Vimeo</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
