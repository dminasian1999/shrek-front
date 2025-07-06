import React from "react"
import ProductListGrid from "./ProductListGrid.tsx"
import ProductListToolbar from "./ProductListToolbar.tsx"

const ProductList = () => {
  return (
    <div className="productList product-load-more">
      <button
        type="button"
        className="btn btn-filter d-block d-md-none d-lg-nqone"
      >
        {" "}
        Product Filters
      </button>
      <ProductListToolbar/>
      <ProductListGrid />
    </div>
  )
}

export default ProductList
