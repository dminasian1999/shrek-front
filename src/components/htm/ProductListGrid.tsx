import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../utils/context.ts"
import ProductItem from "./ProductItem.tsx"
import { useParams } from "react-router-dom"
import { ProductT } from "../../utils/types.ts"
import { baseUrlBlog } from "../../utils/constants.ts"

const ProductListGrid = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState( null)
  const { products, setProducts } = useContext(ProductsContext)

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        id ? `${baseUrlBlog}/posts/category/${id}` : `${baseUrlBlog}/posts`,
      )
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
      const data: ProductT[] = await res.json()
      setProducts(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change

    fetchProducts()
  }, [id])

  return (
    <div className="grid-products grid--view-items">
      <div className="row">
        {products.map(p => (
          <ProductItem p={p} />
        ))}
      </div>
    </div>
  )
}

export default ProductListGrid
