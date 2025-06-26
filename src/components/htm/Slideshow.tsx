import React from "react";

const Slideshow = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">

        <div className="carousel-item active">
          <div className="carousel-img-wrapper">
            <img
              src="src/images/slideshow-banners/belle-banner1.jpg"
              className="d-block w-100 carousel-img"
              alt="Slide 1"
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src="http://localhost:63342/belle-multipurpose-bootstrap-html-template/assets/images/slideshow-banners/home2-default-banner2.jpg"
              className="d-block w-100 carousel-img"
              alt="Slide 2"
            />
          </div>
        </div>

        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src="http://localhost:63342/belle-multipurpose-bootstrap-html-template/assets/images/product-images/product-image3-1.jpg"
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
