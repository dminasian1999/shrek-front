import React from "react";
import { banner1Img, banner2Img, banner3Img, banner4Img } from "../../utils/constants.ts"

const Slideshow = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">

        <div className="carousel-item active">

          <div className="carousel-img-wrapper position-relative ">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/350/225/large_2x/ornate-earthenware-pottery-adorns-rustic-kitchen-table-generated-by-ai-free-photo.jpg"

              className="d-block w-100 carousel-img "
              alt="Slide 1"
            />
            <div className="carousel-caption top-50 start-50 translate-middle text-center">
              <h1>Welcome to the Sevan Armenian Ceramics Center – Jerusalem’s Online Shop for Authentic Souvenirs</h1>
            </div>

          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src="https://static.vecteezy.com/system/resources/previews/025/185/814/large_2x/antique-teapot-ornate-decoration-chinese-culture-elegance-generated-by-ai-free-photo.jpg"

              className="d-block w-100 carousel-img"
              alt="Slide 2"
            />
            <div className="carousel-caption top-50 start-50 translate-middle text-center">
              <h1>Welcome to the Sevan Armenian Ceramics Center – Jerusalem’s Online Shop for Authentic Souvenirs</h1>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src="https://static.vecteezy.com/system/resources/previews/055/978/362/non_2x/crafting-pottery-with-fern-patterns-in-a-creative-workspace-during-daylight-free-photo.jpeg"
              className="d-block w-100 carousel-img"
              alt="Slide 3"
            />
            <div className="carousel-caption top-50 start-50 translate-middle text-center">
              <h1>Welcome to the Sevan Armenian Ceramics Center – Jerusalem’s Online Shop for Authentic Souvenirs</h1>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-img-wrapper">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/714/974/non_2x/earthenware-pottery-collection-ornate-patterns-rustic-decoration-generated-by-ai-free-photo.jpg"              className="d-block w-100 carousel-img"
              alt="Slide 4"
            />
            <div className="carousel-caption top-50 start-50 translate-middle text-center">
              <h1>Welcome to the Sevan Armenian Ceramics Center – Jerusalem’s Online Shop for Authentic Souvenirs</h1>
            </div>
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
