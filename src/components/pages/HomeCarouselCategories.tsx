// ==============================
import React from "react"
import Carousel from "react-multi-carousel"
import { collections } from "../../utils/constants.ts"
import { Link } from "react-router-dom"


export function HomeCarouselCategories() {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2, slidesToSlide: 1 }
  }


  return (
    <div className="section">
      <style>{`
.hc-title { font-weight: 900; letter-spacing: .06em; }
.hc-card { border-radius: 1rem; overflow:hidden; background:#fff; border: 1px solid rgba(0,0,0,.06); box-shadow: 0 10px 24px rgba(0,0,0,.08); transition: transform .25s ease }
.hc-card:hover { transform: translateY(-4px) }
.hc-img-wrap { position:relative; aspect-ratio: 4/3 }
.hc-img { width:100%; height:100%; object-fit: cover }
.hc-overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.35)); display:flex; align-items:end; justify-content:center; padding: 12px }
.hc-name { color:#fff; font-weight:800; text-shadow: 0 4px 14px rgba(0,0,0,.5) }
`}</style>


      <div className="container">
        <div className="row mb-2">
          <div className="section-header text-center">
            <h2 className="h2 hc-title">Bestsellers</h2>
          </div>
        </div>


        <div className="productSlider">
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3500}
            keyBoardControl
            containerClass="carousel-container"
            itemClass="px-2"
          >
            {collections.map((item) => (
              <Link key={item.route} to={`/shop/${item.route}`} className="text-decoration-none">
                <div className="hc-card">
                  <div className="hc-img-wrap">
                    <img src={item.image} className="hc-img" alt={item.title} loading="lazy" />
                    <div className="hc-overlay"><h5 className="hc-name m-0">{item.title}</h5></div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}


export default HomeCarouselCategories
