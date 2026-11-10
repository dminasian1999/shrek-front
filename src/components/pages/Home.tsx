import { Link } from "react-router-dom"
import Slideshow from "../htm/Slideshow.tsx"
import LookBook from "../htm/LookBook.tsx"
import Logos from "../htm/Logos.tsx"
import tiles from "../../images/categories/tiles.jpg"

const Home = () => (
  <>
    <Slideshow />
    <Logos />
    <LookBook />
    <section className="container story-section" aria-labelledby="story-title">
      <img src={tiles} alt="Blue and white ornamental ceramic tiles" loading="lazy" width="600" height="460" />
      <div><span className="eyebrow">A CONNECTION TO JERUSALEM</span><h2 id="story-title">Bring a little color<br />into the everyday.</h2><p>From patterned tiles to decorative ceramics, discover pieces that bring character to a room and meaning to a gift.</p><Link className="text-link" to="/about">Meet Gejekoushian’s <span aria-hidden="true">→</span></Link></div>
    </section>
    <section className="home-contact"><span className="eyebrow">WE’RE HERE TO HELP</span><h2>Looking for something special?</h2><p>Tell us what you have in mind. We can help you find your way.</p><Link className="btn store-button" to="/contact">Get in touch <span aria-hidden="true">→</span></Link></section>
  </>
)

export default Home
