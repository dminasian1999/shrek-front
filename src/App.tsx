import { useAppSelector } from "./app/hooks.ts"

import "./App.css"
import TopHeader from "./components/htm/TopHeader.tsx"
import Header from "./components/htm/Header.tsx"
import Main from "./components/Main.tsx"
import { baseUrlBlog } from "./utils/constants.ts"
import { ProductT, ReceiptT } from "./utils/types.ts"
import { useEffect, useState } from "react"
import { ProductsContext } from "./utils/context.ts"
import Footer from "./components/htm/Footer.tsx"
import { useLocation } from "react-router-dom"

const App = () => {
  // const [selectedId, setSelectedId] = useState<string>(
  //   categories("Armenian")[0]?.title || "",
  // )
  const [products, setProducts] = useState([] as ProductT[])
  const [receipts, setReceipts] = useState([] as ReceiptT[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [language, setLanguage] = useState("English")
  const token = useAppSelector(state => state.token)

  const location = useLocation()

  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch(${baseUrlBlog}/posts)
  //     if (!res.ok) throw new Error(Fetch error: ${res.status})
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
    window.scroll(0, 0)
  }, [location.pathname])
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        receipts,
        setReceipts,
        language,
        setLanguage,
      }}
    >
      <div className="container-fluid p-0 ">
        <TopHeader />
        <Header />
        <Main />
        <Footer />
        {/*<QuickViewPopup />*/}
      </div>
    </ProductsContext.Provider>
  )
}

export default App
