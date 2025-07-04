import React from "react"

const ProductListToolbar = () => {
  return (
    <div className="toolbar">
      <div className="filters-toolbar-wrapper">
        <div className="row">
          <div
            className="col-4 col-md-4 col-lg-4 filters-toolbar__item collection-view-as d-flex justify-content-start align-items-center">
            <a href="shop-left-sidebar.html" title="Grid View" className="change-view change-view--active">
              <img src="/src/images/grid.jpg" alt="Grid" />
            </a>
            <a href="shop-listview.html" title="List View" className="change-view">
              <img src="/src/images/list.jpg" alt="List" />
            </a>
          </div>
          <div
            className="col-4 col-md-4 col-lg-4 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-center align-items-center">
            <span className="filters-toolbar__product-count">Showing: 22</span>
          </div>
          <div className="col-4 col-md-4 col-lg-4 text-right">
            <div className="filters-toolbar__item">
              {/*<label for="SortBy" className="hidden">Sort</label>*/}
              <select name="SortBy" id="SortBy"
                      className="filters-toolbar__input filters-toolbar__input--sort">
                <option value="title-ascending" selected >Sort</option>
                <option>Best Selling</option>
                <option>Alphabetically, A-Z</option>
                <option>Alphabetically, Z-A</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
                <option>Date, new to old</option>
                <option>Date, old to new</option>
              </select>
              <input className="collection-header__default-sort" type="hidden" value="manual"/>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default ProductListToolbar
