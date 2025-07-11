import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../utils/context.ts"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import ProductItem from "./ProductItem.tsx"
import { baseUrlBlog } from "../../utils/constants.ts"

const ProductList = () => {

  const { products, setProducts } = useContext(ProductsContext)
  const {id } = useParams()
  const category = id! ;
  const [criteria,setCriteria]=useState('')
  const [sort,setSort]=useState('')
  const [asc,setAsc]=useState(true)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on category change
  useEffect(() => {
    const searchPosts = async (criteria: string,  sort: string,asc: boolean,) => {
      const response = await fetch(`${baseUrlBlog}  /posts/criteria/${criteria}/sort/${sort}/asc/${asc}`)
      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      return  await response.json();
    }
    window.scrollTo(0, 0);
    searchPosts(criteria, sort, asc).then(setProducts) // default: date descending (newest)

  }, []);

  // if (loading) return <p>Loading products...</p>;
  // if (error) return <p>Error loading products: {error}</p>;
  // if (!products || products.length === 0)
  //   return <p>No products found in this category.</p>;
  const handleSortChange = (value: string) => {
    switch (value) {
      case "name-asc":
        setCriteria(category)
        setSort("name")
        setAsc(true)
        break
      case "name-desc":
        setCriteria(category)
        setSort("name")
        setAsc(false)
        break
      case "price-asc":
        setCriteria(category)
        setSort("sell")
        setAsc(true)
        break
      case "price-desc":
        setCriteria(category)
        setSort("sell")
        setAsc(false)
        break
      case "date-asc":
        setCriteria(category)
        setSort("dateCreated")
        setAsc(true)
        break
      case "date-desc":
        setCriteria(category)
        setSort("dateCreated")
        setAsc(false)
        break
      default:
        setCriteria(category)
        setSort("dateCreated")
        setAsc(true)
        break
    }
  }
  return (
    <div className="productList product-load-more">
      <button
        type="button"
        className="btn btn-filter d-block d-md-none d-lg-none"
      >
        {" "}
        Product Filters
      </button>
      <div className="toolbar">
        {/* UI remains the same */}
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="filters-toolbar__input filters-toolbar__input--sort"
          defaultValue=""
        >
          <option value="" disabled>Sort</option>
          <option value="name-asc">Alphabetically, A–Z</option>
          <option value="name-desc">Alphabetically, Z–A</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="date-desc">Date, new to old</option>
          <option value="date-asc">Date, old to new</option>
        </select>
      </div>
      {/*<ProductListToolbar />*/}
      <div className="grid-products grid--view-items">
        <div className="row">
          {products.map((p: ProductT) => (
            <ProductItem key={p.id} p={p} />
          ))}
        </div>
      </div>
      {/*<ProductListGrid />*/}
    </div>
  )
}

export default ProductList
