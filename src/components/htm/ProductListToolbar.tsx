import React from "react"
import { useAppDispatch } from "../../app/hooks.ts"
import { searchPosts } from "../../features/api/postActions.ts"

const ProductListToolbar = () => {
  const dispatch = useAppDispatch()

  const handleSortChange = (e:any) => {
    const value = e.target.value

    switch (value) {
      case "name-asc":
        dispatch(searchPosts({ query: "name", asc: true }))

        break
      case "name-desc":
        dispatch(searchPosts({ query: "name", asc: false }))
        break
      case "price-asc":
        dispatch(searchPosts({ query: "sell", asc: true }))

        break
      case "price-desc":
        dispatch(searchPosts({ query: "sell", asc: false }))
        break
      case "date-asc":
        dispatch(searchPosts({ query: "dateCreated", asc: true }))

        break
      case "date-desc":
        dispatch(searchPosts({ query: "dateCreated", asc: false }))

        break
      default:
        // fallback
        break
    }
  }

  return (
    <div className="toolbar">
      <div className="filters-toolbar-wrapper">
        <div className="row">
          <div className="col-4 d-flex justify-content-start align-items-center">
            <a href="#" className="change-view change-view--active">
              <img src="/src/images/grid.jpg" alt="Grid" />
            </a>
            <a href="#" className="change-view">
              <img src="/src/images/list.jpg" alt="List" />
            </a>
          </div>
          <div className="col-4 text-center d-flex justify-content-center align-items-center">
            <span className="filters-toolbar__product-count">Showing: 22</span>
          </div>
          <div className="col-4 text-right">
            <div className="filters-toolbar__item">
              <select
                onChange={handleSortChange}
                className="filters-toolbar__input filters-toolbar__input--sort"
                defaultValue=""
              >
                <option value="" disabled>
                  Sort
                </option>
                <option value="name-asc">Alphabetically, A–Z</option>
                <option value="name-desc">Alphabetically, Z–A</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="date-desc">Date, new to old</option>
                <option value="date-asc">Date, old to new</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListToolbar
