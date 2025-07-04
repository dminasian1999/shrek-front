import React, { useState } from "react"
import SideBar from "./SideBar.tsx"
import ProductList from "./ProductList.tsx"
import { banner3Img } from "../../utils/constants.ts"
import Contact from "./Contact.tsx"

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div id="page-content">
      {/* Hero Section */}
      <div className="collection-header mb-4">
        <div className="collection-hero position-relative">
          <img
            className="img-fluid w-100"
            src={banner3Img}
            alt="Shop banner"
            style={{ objectFit: "cover", maxHeight: "200px" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <SideBar />
          <div className="col-sm-12 col-md-9 col-lg-9 main-col">
            {/* Search Bar */}
            <div className="mb-3 input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-dark">
                <i className="fa fa-search" />
              </button>
            </div>

            <hr />
            <ProductList />

            <div className="infinitpaginOuter text-center mt-4">
              <button className="btn btn-outline-dark btn-sm">Load More</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Shop
