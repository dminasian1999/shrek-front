import { categories } from "../../utils/constants.ts";

const SideBar = () => {
  return (
    <div className="col-12 col-md-3">
      {/* Close button for mobile */}
      <div className="d-block d-md-none mb-3 text-end">
        <button type="button" className="btn btn-outline-secondary btn-sm">
          &times;
        </button>
      </div>

      {/* Categories Accordion */}
      <div className="accordion mb-4" id="categoryAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCategories">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCategories"
              aria-expanded="true"
              aria-controls="collapseCategories"
            >
              Categories
            </button>
          </h2>
          <div
            id="collapseCategories"
            className="accordion-collapse collapse show"
            aria-labelledby="headingCategories"
            data-bs-parent="#categoryAccordion"
          >
            <div className="accordion-body p-0">
              <ul className="list-group list-group-flush">
                {categories.map((category, idx) => (
                  <li className="list-group-item" key={idx}>
                    <a
                      href={`/shop/${encodeURIComponent(category.title)}`}
                      className="text-decoration-none"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h5>Price</h5>
        <form>
          <label htmlFor="customRange1" className="form-label">
            Select price range
          </label>
          <input type="range" className="form-range" id="customRange1" />
          <div className="row g-2 mt-2">
            <div className="col-6">
              <input type="text" className="form-control" placeholder="Min" />
            </div>
            <div className="col-6 text-end">
              <button type="submit" className="btn btn-secondary btn-sm">
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Popular Products */}
      <div className="mb-4">
        <h5>Popular Products</h5>
        <div className="row g-3">
          {[
            {
              name: "Cena Skirt",
              price: "$173.60",
              img: "assets/images/product-images/mini-product-img.jpg",
            },
            {
              name: "Block Button Up",
              price: "$378.00",
              img: "assets/images/product-images/mini-product-img1.jpg",
            },
            {
              name: "Balda Button Pant",
              price: "$278.60",
              img: "assets/images/product-images/mini-product-img2.jpg",
            },
            {
              name: "Border Dress in Black/Silver",
              price: "$228.00",
              img: "assets/images/product-images/mini-product-img3.jpg",
            },
          ].map((product, idx) => (
            <div className="col-12 d-flex" key={idx}>
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid me-3"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
              <div>
                <h6 className="mb-1">{product.name}</h6>
                <p className="mb-0 text-muted">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Static Banner */}
      <div className="mb-4">
        <img
          src="assets/images/side-banner-2.jpg"
          alt="Side banner"
          className="img-fluid rounded"
        />
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="btn btn-outline-primary btn-sm">View all</button>
      </div>
    </div>
  );
};

export default SideBar;
