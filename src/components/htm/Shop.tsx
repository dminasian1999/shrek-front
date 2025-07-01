import React from "react";
import SideBar from "./SideBar.tsx";
import ProductList from "./ProductList.tsx"; // Check spelling: ProductList?
import { useParams } from "react-router-dom";
import { banner3Img } from "../../utils/constants.ts"

const Shop = () => {
  return (
    <div id="page-content">
      {/* Hero Section */}
      <div className="collection-header mb-4">
        <div className="collection-hero position-relative">
          <img
            className="img-fluid w-100"
            src={banner3Img}
            alt="Shop banner"
            style={{ objectFit: "cover", maxHeight: "300px" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <SideBar />
          <div className="col-sm-12 col-md-9 col-lg-9 main-col">
            <div className="category-description mb-4">
              <h3>Category Description</h3>
              <p>
                Discover a wide variety of categories with handpicked items that
                meet your taste and needs. Whether you're into fashion, art, or
                essentials — we have something for you.
              </p>
            </div>

            <hr />
            <ProductList />

            {/* Load More */}
            <div className="infinitpaginOuter text-center mt-4">
              <button className="btn btn-outline-dark btn-sm">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
