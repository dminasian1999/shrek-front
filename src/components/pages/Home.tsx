import React from "react"
import Slideshow from "../htm/Slideshow.tsx"
import WeeklyBestseller from "../htm/WeeklyBestseller.tsx"
import NewArrivals from "../htm/NewArrivals.tsx"
import LookBook from "../htm/LookBook.tsx"
import Contact from "../htm/Contact.tsx"

const Home = () => {
  return (
    <div>
      <Slideshow />
      <WeeklyBestseller />
      <LookBook/>
      <Contact/>
      {/*<NewArrivals />*/}
    </div>
  )
}

export default Home
