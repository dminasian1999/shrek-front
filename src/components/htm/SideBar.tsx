import { categories } from "../../utils/constants.ts";
import { Link, useLocation } from "react-router-dom"

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="col-12 col-md-3 px-3">
      {/* Close Button (Mobile) */}
      <div className="d-block d-md-none mb-3 text-end">
        <button type="button" className="btn btn-outline-dark btn-sm">
          &times;
        </button>
      </div>

      {/* Categories Accordion */}
      <div className="accordion mb-4 shadow-sm rounded" id="categoryAccordion">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingCategories">
            <button
              className="accordion-button fw-bold bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCategories"
              aria-expanded="true"
              aria-controls="collapseCategories"
            >
              <i className="bi bi-tags me-2"></i>
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
                {categories.map((category,idx) => (
                  <li className="list-group-item px-3 py-2" key={idx}>
                    <Link
                      to={`/shop/`+category.route}
                      className={`d-block text-decoration-none rounded fw-medium ${
                       "text-dark"
                      } hover-transition`}
                    >
                      <i className="bi bi-chevron-right me-2 text-muted small"></i>
                      {category.title}
                    </Link>
                  </li>

                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-4 p-3 border rounded shadow-sm bg-light">
        <h6 className="fw-semibold mb-3">
          <i className="bi bi-cash-coin me-2"></i>
          Filter by Price
        </h6>
        <form>
          <input
            type="range"
            className="form-range"
            id="priceRange"
            min="0"
            max="1000"
          />
          <div className="d-flex justify-content-between mb-3 text-muted small">
            <span>$0</span>
            <span>$1000</span>
          </div>
          <div className="input-group input-group-sm">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
            />
            <span className="input-group-text">-</span>
            <input
              type="number"
              className="form-control"
              placeholder="Max"
            />
          </div>
          <button className="btn btn-dark btn-sm w-100 mt-3">
            Apply Filter
          </button>
        </form>
      </div>

      {/* Static Banner */}
      <div className="mb-4">
        <img
          src="src/images/side-banner-2.jpg"
          alt="Promo banner"
          className="img-fluid rounded shadow-sm"
          style={{ objectFit: "cover", maxHeight: "220px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SideBar;
