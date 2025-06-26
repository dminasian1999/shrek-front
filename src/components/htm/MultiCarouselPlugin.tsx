import React from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { categories } from "../../utils/constants.ts"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
}

const MultiCarouselPlugin = () => {
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 productSlider grid-products">
      <Carousel
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
        {categories.map(item => (
          <div key={item.title} className="text-center item p-2">
            <div className="product-image link-image">
              <a href={'/shop/'+item.title.toLowerCase().trim()}
                className={"grid-view-item__link "}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="img-fluid rounded h-100 w-100 object-fit-cover btn  border-0 p-0"
                />
              </a>
              <h3 className="mt-2">{item.title}</h3>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MultiCarouselPlugin
