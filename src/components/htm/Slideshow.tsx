import React from "react";
import { banner1Img, banner2Img, banner3Img, banner4Img } from "../../utils/constants.ts"

const Slideshow = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">

        <div className="carousel-item active">
          <div className="carousel-img-wrapper">
            <img
              src={banner1Img}
              className="d-block w-100 carousel-img"
              alt="Slide 1"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src={banner2Img}
              className="d-block w-100 carousel-img"
              alt="Slide 2"
            />
          </div>
        </div>

        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src={banner3Img}
              className="d-block w-100 carousel-img"
              alt="Slide 3"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src={banner4Img}
              className="d-block w-100 carousel-img"
              alt="Slide 3"
            />
          </div>
        </div>

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slideshow;
