import { Link } from "react-router-dom"
import { collections } from "../../utils/constants.ts"
import jewelryPreview from "../../images/categories/rings.jpg"

const featured = ["tiles", "pomegranates", "mugs", "jewelry"]
const LookBook = () => (
  <section className="container discovery-section" aria-labelledby="discover-title">
    <div className="section-heading"><div><span className="eyebrow">FIND YOUR FAVORITE</span><h2 id="discover-title">Made for meaningful moments</h2></div><Link className="text-link" to="/collections">View all collections <span aria-hidden="true">→</span></Link></div>
    <div className="discovery-grid">
      {featured.map(route => {
        const item = collections.find(collection => collection.route === route)!
        return <Link className="discovery-card" key={route} to={`/shop/${route}`}>
          <div className="discovery-image"><img src={route === "jewelry" ? jewelryPreview : item.image} alt={item.title} loading="lazy" width="360" height="440" /></div>
          <div><h3>{item.title}</h3><span aria-hidden="true">→</span></div>
        </Link>
      })}
    </div>
  </section>
)

export default LookBook
