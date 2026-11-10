import { Link } from "react-router-dom"
import pomegranates from "../../images/categories/pomegranates.jpg"

const Slideshow = () => (
  <section className="store-hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <span className="eyebrow">GEJEKOUSHIAN’S · JERUSALEM</span>
      <h1 id="hero-title">A little tradition.<br /><em>A lasting treasure.</em></h1>
      <p>Discover Armenian ceramics and thoughtful gifts, inspired by the color and character of Jerusalem.</p>
      <div className="hero-actions"><Link className="btn store-button" to="/shop">Explore the shop <span aria-hidden="true">→</span></Link><Link className="text-link" to="/about">Our story</Link></div>
      <span className="hero-note">For your home. For someone special.</span>
    </div>
    <div className="hero-image">
      <img src={pomegranates} alt="Decorative ceramic pomegranate with colorful floral patterns" width="720" height="960" fetchPriority="high" />
      <div className="hero-image-label"><span>Pattern. Color. Tradition.</span><Link to="/shop/pomegranates">Explore pomegranates <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>
)

export default Slideshow
