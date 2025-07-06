import  { useContext } from "react"
import ProductItem from "./ProductItem.tsx"
import { ProductsContext } from "../../utils/context.ts"

const NewArrivals = () => {
  const { products } = useContext(ProductsContext)

  return (
    <div className="product-rows section py-8">
      <div className="container mx-auto px-4">
        <div className="section-header text-center">
          <h2 className="h2 text-3xl font-bold">New Arrivals</h2>
          <p>Grab these new items before they are gone!</p>
        </div>
        <div className="grid-products grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 d-flex">
          {products.map(p => (
            <ProductItem p={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="shop-left-sidebar.html"
            className="btn bg-black text-white px-4 py-2"
          >
            View all
          </a>
        </div>
      </div>
    </div>
  )
}
export default NewArrivals
