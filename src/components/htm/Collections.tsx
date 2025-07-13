import React from "react";
import { Link } from "react-router-dom";
import { collections } from "../../utils/constants.ts";

const Collections = () => {
  // Define styles in a template literal. This keeps the JSX clean.
  const componentStyles = `
    .collection-card {
      background-color: #ffffff;
      border: none;
      border-radius: 1rem; /* 16px */
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .collection-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 32px rgba(0,0,0,0.12);
    }

    .collection-card__image {
      transition: transform 0.3s ease;
    }

    .collection-card:hover .collection-card__image {
      transform: scale(1.05);
    }

    .collection-card__body {
      padding: 1rem;
    }
  `;

  return (
    <>
      {/* Inject the styles into the document's head */}
      <style>{componentStyles}</style>

      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-uppercase text-secondary">
          Explore Our Collections
        </h2>

        <div className="row g-4">
          {collections.map((item) => (
            // 1. Use a stable key like `item.route` instead of `index`.
            // 2. Add `d-flex` to make all columns in a row equal height.
            <div key={item.route} className="col-6 col-md-4 col-lg-3 d-flex">
              {/* 3. Use <Link> for SPA-friendly navigation. */}
              <Link
                to={`/shop/${item.route}`}
                className="text-decoration-none text-dark d-block w-100"
                aria-label={`Explore ${item.title} category`}
              >
                {/* 4. Replaced inline styles and events with a clean class. */}
                <div className="collection-card">
                  <div className="ratio ratio-1x1 bg-light">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover collection-card__image"
                    />
                  </div>
                  <div className="collection-card__body text-center">
                    <h5 className="card-title fs-6 fw-semibold text-truncate m-0">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collections;
