import React from "react"
import ProductListToolbar from "./ProductListToolbar.tsx"
import ProductListGrid from "./ProductListGrid.tsx"

const ProductList = () => {
  return (
    <div className="productList product-load-more">
      <button
        type="button"
        className="btn btn-filter d-block d-md-none d-lg-none"
      >
        {" "}
        Product Filters
      </button>
      <ProductListToolbar />
      <ProductListGrid />
    </div>
  )
}

export default ProductList
