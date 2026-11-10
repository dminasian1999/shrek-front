import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./App.css"
import TopHeader from "./components/htm/TopHeader.tsx"
import Header from "./components/htm/Header.tsx"
import Main from "./components/Main.tsx"
import Footer from "./components/htm/Footer.tsx"
import { ProductT, ReceiptT } from "./utils/types.ts"
import { ProductsContext } from "./utils/context.ts"

const App = () => {
  const [products, setProducts] = useState<ProductT[]>([])
  const [receipts, setReceipts] = useState<ReceiptT[]>([])
  const [language, setLanguage] = useState("English")
  const location = useLocation()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const updateScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener("scroll", updateScroll, { passive: true })
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const titles: Record<string, string> = {
      shop: "Shop", collections: "Collections", about: "Our story", contact: "Contact", "contact-us": "Contact", faq: "Frequently asked questions", cart: "Shopping bag", checkout: "Checkout", login: "Sign in", register: "Create an account", account: "My account", wishlist: "Wishlist", "forgot-password": "Password help", product: "Product",
    }
    const segment = location.pathname.split("/")[1]
    document.title = titles[segment] ? `${titles[segment]} | Gejekoushian’s Armenian Ceramics` : "Gejekoushian’s Armenian Ceramics & Gifts | Jerusalem"
  }, [location.pathname])

  return (
    <ProductsContext.Provider value={{ products, setProducts, receipts, setReceipts, language, setLanguage }}>
      <div className="store-app">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <TopHeader />
        <Header />
        <Main />
        <Footer />
        {showBackToTop && <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>↑</button>}
      </div>
    </ProductsContext.Provider>
  )
}

export default App
