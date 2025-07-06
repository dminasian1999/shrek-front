import React, { useContext, useEffect, useState } from "react"
import { searchPosts } from "../../features/api/postActions.tsx"
import { ProductsContext } from "../../utils/context.ts"
import { useParams } from "react-router-dom"

const ProductListToolbar = () => {
  const { products, setProducts } = useContext(ProductsContext)
 const {id } = useParams()
  const category = id! ;
const [criteria,setCriteria]=useState('')
const [sort,setSort]=useState('')
const [asc,setAsc]=useState(true)
  // ✅ Fetch on mount with default sort
  useEffect(() => {
    searchPosts(category, "dateCreated", true).then(setProducts) // default: date descending (newest)
    // handleSortChange()
  }, [category])

  const handleSortChange = (value: string) => {
    switch (value) {
      case "name-asc":
        searchPosts(category, "name", true).then(setProducts)
        break
      case "name-desc":
        searchPosts(category, "name", false).then(setProducts)
        break
      case "price-asc":
        searchPosts(category, "sell", true).then(setProducts)
        break
      case "price-desc":
        searchPosts(category, "sell", false).then(setProducts)
        break
      case "date-asc":
        searchPosts(category, "dateCreated", true).then(setProducts)
        break
      case "date-desc":
        searchPosts(category, "dateCreated", false).then(setProducts)
        break
      default:
        break
    }
  }

  return (
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
  )
}

export default ProductListToolbar
