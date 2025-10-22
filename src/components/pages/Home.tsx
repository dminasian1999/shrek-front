// ==============================
import React from "react"
import Contact from "./Contact.tsx"
import Logos from "../htm/Logos.tsx"
import HomeLookBook from "./HomeLookBook.tsx"
import HomeSlideshow from "./HomeSlideshow.tsx"
import HomeCarouselCategories from "./HomeCarouselCategories.tsx"


export function Home() {
  return (
    <div className="home">


      <div className="home-section">
        <div className="home-wrap">
          <HomeSlideshow />
        </div>
      </div>


      <div className="home-section home-section--alt">
        <div className="home-wrap">
          <HomeCarouselCategories />
        </div>
      </div>


      <div className="home-section">
        <div className="home-wrap">
          <HomeLookBook />
        </div>
      </div>


      <div className="home-section">
        <div className="home-wrap">
          <Contact />
        </div>
      </div>


      <div className="home-section home-section--alt">
        <div className="home-wrap">
          <Logos />
        </div>
      </div>
    </div>
  )
}


export default Home
