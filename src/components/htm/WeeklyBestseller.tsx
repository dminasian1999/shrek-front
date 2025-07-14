import Carousel from "react-multi-carousel"

import { collections } from "../../utils/constants.ts"
import React from "react"
import { Link } from "react-router-dom"

const WeeklyBestseller = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 1,
    },
  }
  return (
    <div className="section ">
      <div className="container mx-auto ">
        <div className="row ">
          <div className="section-header text-center">
            <h2 className="h2 text-3xl font-bold">Bestsellers</h2>
          </div>
        </div>
        <div className="col-12 productSlider grid-products ">
          <Carousel
            className={"py-5"}
            swipeable
            draggable
            showDots
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            keyBoardControl
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {collections.map(item => (
              <Link
                to={`/shop/${item.route}`}
                className="p-2 d-flex flex-column align-items-center h-100"
              >
                <img
                  src={item.image}
                  className={"object-fit-cover w-100 h-100"}
                  alt={""}
                ></img>
                <h5 className="mt-">{item.title}</h5>
              </Link>
            ))}
          </Carousel>
        </div>{" "}
      </div>
    </div>
  )
}
export default WeeklyBestseller
