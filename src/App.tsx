import { useAppSelector } from "./app/hooks.ts"
import "./App.css"
// import '../src/src/assets/scss/astro-ecommerce.scss'
import TopHeader from "./components/htm/TopHeader.tsx"
import Header from "./components/htm/Header.tsx"
import Main from "./components/Main.tsx"
import { baseUrlBlog, categories } from "./utils/constants.ts"
import { ProductT, ReceiptT } from "./utils/types.ts"
import { useEffect, useState } from "react"
import { ProductsContext } from "./utils/context.ts"
import Footer from "./components/htm/Footer.tsx"
import QuickViewPopup from "./components/htm/QuickViewPopup.tsx"

const App = () => {
  const [selectedId, setSelectedId] = useState<string>(
    categories[0]?.title || "",
  )
  const [products, setProducts] = useState([] as ProductT[])
  const [receipts, setReceipts] = useState([] as ReceiptT[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const token = useAppSelector(state => state.token)
  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch(`${baseUrlBlog}/posts`)
  //     if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
  //     const data: ProductT[] = await res.json()
  //     setProducts(data)
  //   } catch (e: any) {
  //     console.error(e)
  //     setError(e.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchReceipts = async () => {
    try {
      const res = await fetch(`${baseUrlBlog}/posts/receipts`, {
        method: "get",
        headers: { Authorization: token },
      })
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
      const data: ReceiptT[] = await res.json()
      setReceipts(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // fetchProducts()
    // fetchReceipts()
  }, [])
  return (
    <ProductsContext.Provider
      value={{
        selectedId,
        setSelectedId,

        products,
        setProducts,
        receipts,
        setReceipts,
      }}
    >
      <div className="emplate-index home2-default  container-fluid  p-0">
        <div className="pageWrapper row">
          {/*  <SearchForm/>*/}
          <TopHeader />
          <Header />

          {/*  <MobileMenu />*/}
          <Main />

          <Footer />
          <span
            id="site-scroll"
            className="fixed bottom-4 right-4 bg-black text-white p-2 rounded-full"
          >
            <i className="text-xl">↑</i>
          </span>
          <QuickViewPopup />
          {/*<NewsletterPopup />*/}
        </div>
      </div>
    </ProductsContext.Provider>
  )
}

export default App
