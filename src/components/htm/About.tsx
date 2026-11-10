import { Link } from "react-router-dom"
import ceramics from "../../images/categories/ceramics.jpg"

const About = () => (
  <div className="container public-page">
    <header className="section-heading">
      <p className="eyebrow">From Jerusalem, with character</p>
      <h1>Gejekoushian’s Armenian Ceramics & Gifts</h1>
      <p>
        Discover Armenian ceramics, gifts, and souvenirs from the Old City of
        Jerusalem.
      </p>
    </header>
    <div className="contact-layout about-layout">
      <img
        src={ceramics}
        alt="A selection of decorative ceramics in the Gejekoushian’s collection"
        className="about-image"
        width="640"
        height="640"
      />
      <div>
        <h2>A piece for your home. A gift to remember.</h2>
        <p>
          Explore decorative tiles, plates, vases, jewelry, and souvenirs in our
          online shop. The collections bring together pieces for everyday spaces
          and meaningful occasions.
        </p>
        <p>
          Start with a collection, take a closer look at each item, and contact
          us if you would like help choosing or confirming delivery
          arrangements.
        </p>
        <div className="d-flex flex-wrap gap-3">
          <Link className="btn btn-primary" to="/collections">
            Explore collections
          </Link>
          <Link className="btn btn-outline-primary" to="/contact">
            Talk to the shop
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default About
