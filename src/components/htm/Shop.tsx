import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar.tsx";
import { banner3Img, baseUrlBlog } from "../../utils/constants.ts";
import Contact from "./Contact.tsx";
import { ProductsContext } from "../../utils/context.ts";
import { useParams } from "react-router-dom";
import { ProductT } from "../../utils/types.ts";
import ProductItem from "./ProductItem.tsx";

const Shop = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { id } = useParams();
  const category = id!;
  const [sort, setSort] = useState("dateCreated");
  const [asc, setAsc] = useState(false); // Default: date descending
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-");
    setSort( field);
    setAsc(direction === "asc");
  };

  const searchPosts = async (criteria: string, sort: string, asc: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${baseUrlBlog}/posts/criteria/${criteria}/sort/${sort}/asc/${asc}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data: ProductT[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    searchPosts(category, sort, asc);
  }, [category, sort, asc]);

  return (
    <div id="page-content">
      {/* Hero Banner */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-dark">
                <i className="fa fa-search" />
              </button>
            </div>

            <hr />

            {/* Toolbar + Product Grid */}
            <div className="productList product-load-more">
              <button
                type="button"
                className="btn btn-filter d-block d-md-none d-lg-none"
              >
                Product Filters
              </button>

              {/* Sort Dropdown */}
              <div className="toolbar">
                <select
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="filters-toolbar__input filters-toolbar__input--sort"
                  defaultValue="date-desc"
                >
                  <option value="name-asc">Alphabetically, A–Z</option>
                  <option value="name-desc">Alphabetically, Z–A</option>
                  <option value="sell-asc">Price, low to high</option>
                  <option value="sell-desc">Price, high to low</option>
                  <option value="dateCreated-desc">Date, new to old</option>
                  <option value="dateCreated-asc">Date, old to new</option>
                </select>
              </div>

              {/* Loading / Error / Grid */}
              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-danger">Error: {error}</p>
              ) : (
                <div className="grid-products grid--view-items">
                  <div className="row">
                    {products
                      .filter((p) =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((p) => (
                        <ProductItem key={p.id} p={p} />
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Load More Button Placeholder */}
            <div className="infinitpaginOuter text-center mt-4">
              <button className="btn btn-outline-dark btn-sm">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
