import { useContext } from "react"
import { Link } from "react-router-dom"
import { adminInfo } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const Footer = () => {
  const { language } = useContext(ProductsContext)
  const info = adminInfo(language)
  return (
    <footer className="store-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link className="footer-wordmark" to="/">GEJEKOUSHIAN’S</Link>
          <p>Armenian ceramics, meaningful gifts, and a little piece of Jerusalem.</p>
          <span className="footer-location">{info.address}</span>
        </div>
        <nav aria-label="Shop footer links"><h2>Discover</h2>
          <Link to="/shop">Shop all</Link><Link to="/shop/tiles">Tiles</Link><Link to="/shop/pomegranates">Pomegranates</Link><Link to="/collections">All collections</Link>
        </nav>
        <nav aria-label="Customer help"><h2>Let us help</h2>
          <Link to="/about">Our story</Link><Link to="/faq">Frequently asked questions</Link><Link to="/account">My account</Link><Link to="/contact">Contact us</Link>
        </nav>
        <div className="footer-contact"><h2>Have something in mind?</h2>
          <p>Ask us about an item, your order, or a gift for someone special.</p>
          <a href={`mailto:${info.email}`}>{info.email} <span aria-hidden="true">→</span></a>
          <a href={`tel:${info.phone.replace(/\s/g, "")}`}>{info.phone}</a>
        </div>
      </div>
      <div className="container footer-bottom-line"><span>© {new Date().getFullYear()} Gejekoushian’s Armenian Ceramics & Gifts</span><span>Jerusalem · Ceramics · Gifts</span></div>
    </footer>
  )
}

export default Footer
