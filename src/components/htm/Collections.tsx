import { Link } from "react-router-dom"
import { collections } from "../../utils/constants.ts"

const Collections = () => (
  <section className="container public-page" aria-labelledby="collections-title">
    <div className="section-heading"><div><span className="eyebrow">SOMETHING TO TREASURE</span><h1 id="collections-title">Explore our collections</h1><p>Ceramics, jewelry, and gifts to make a moment your own.</p></div></div>
    <div className="collections-grid">{collections.map(item => (
      <Link className="discovery-card" key={item.route} to={`/shop/${item.route}`}>
        <div className="discovery-image"><img src={item.image} alt={item.title} loading="lazy" width="320" height="360" /></div>
        <div><h2>{item.title}</h2><span aria-hidden="true">→</span></div>
      </Link>
    ))}</div>
  </section>
)

export default Collections
