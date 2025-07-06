import React, { useEffect, useState } from "react"
import ProductItem from "./ProductItem.tsx"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { ProductT } from "../../utils/types.ts"
import { useParams } from "react-router-dom"
import { searchPosts } from "../../features/api/postActions.ts"

const ProductListGrid = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  // const [products,setProducts]= useState([] as ProductT[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const  products  = useAppSelector(state => state.posts.products)
  useEffect(() => {
    dispatch(searchPosts({category:id}))
  }, [id])


  return (
    <div className="grid-products grid--view-items">
      <div className="row">
        {products.map((p: ProductT) => (
          <ProductItem p={p} />
        ))}
      </div>
    </div>
  )
}

export default ProductListGrid
