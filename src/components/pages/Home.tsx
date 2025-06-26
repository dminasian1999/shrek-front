import React from "react"
import Slideshow from "../htm/Slideshow.tsx"
import WeeklyBestseller from "../htm/WeeklyBestseller.tsx"
import ParallaxSection from "../htm/ParallaxSection.tsx"
import NewArrivals from "../htm/NewArrivals.tsx"

const Home = () => {
  return (
    <div>
      <Slideshow />
      <WeeklyBestseller />
      <NewArrivals />
    </div>
  )
}

export default Home
