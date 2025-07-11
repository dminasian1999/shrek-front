import React from "react"
import Slideshow from "../htm/Slideshow.tsx"
import WeeklyBestseller from "../htm/WeeklyBestseller.tsx"
import LookBook from "../htm/LookBook.tsx"
import Contact from "../htm/Contact.tsx"
import Types from "../htm/Types.tsx"
import Logos from "../htm/Logos.tsx"

const Home = () => {
  return (
    <div>
      <Slideshow />
      <WeeklyBestseller />

      <LookBook/>
      <Contact/>
<Logos/>

      {/*<NewArrivals />*/}
    </div>
  )
}

export default Home
