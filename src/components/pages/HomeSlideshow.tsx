import React from "react";

const slides = [
  {
    img: "https://static.vecteezy.com/system/resources/previews/024/714/974/non_2x/earthenware-pottery-collection-ornate-patterns-rustic-decoration-generated-by-ai-free-photo.jpg",
    caption: "Gejekoushian’s Armenian Ceramics – Authentic Craft from Jerusalem",
  },
  {
    img: "https://static.vecteezy.com/system/resources/previews/026/350/225/large_2x/ornate-earthenware-pottery-adorns-rustic-kitchen-table-generated-by-ai-free-photo.jpg",
    caption: "Handcrafted Armenian Pottery – Timeless Art from Jerusalem",
  },
  {
    img: "https://static.vecteezy.com/system/resources/previews/025/185/814/large_2x/antique-teapot-ornate-decoration-chinese-culture-elegance-generated-by-ai-free-photo.jpg",
    caption: "Authentic Souvenirs – Bringing Tradition Into Your Home",
  },
  {
    img: "https://static.vecteezy.com/system/resources/previews/055/978/362/non_2x/crafting-pottery-with-fern-patterns-in-a-creative-workspace-during-daylight-free-photo.jpeg",
    caption: "Every Piece Tells a Story – Crafted with Heritage & Passion",
  },

];

const HomeSlideshow = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="carousel-img-wrapper position-relative">
              <img
                src={slide.img}
                className="d-block w-100 carousel-img"
                alt={`Slide ${index + 1}`}
              />
              <div className="carousel-caption top-50 start-50 translate-middle text-center">
                <h1 className="fw-bold text-shadow">{slide.caption}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
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

export default HomeSlideshow;
