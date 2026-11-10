import { Navigate, Route, Routes, Link, useLocation } from "react-router-dom"
import type { ReactNode } from "react"
import { useAppSelector } from "../app/hooks.ts"
import Account from "./htm/Account.tsx"
import AddProduct from "./htm/AddProduct.tsx"
import ReceiptsList from "./ReceiptsList.tsx"
import ContactUs from "./ContactUs.tsx"
import ForgotPassword from "./ForgotPassword.tsx"
import FAQ from "./FAQ.tsx"
import Reports from "./Reports.tsx"
import Sells from "./Sells.tsx"
import Home from "./pages/Home.tsx"
import Login from "./htm/Login.tsx"
import Shop from "./htm/Shop.tsx"
import ProductPage from "./htm/ProductPage.tsx"
import CheckOut from "./htm/CheckOut.tsx"
import About from "./htm/About.tsx"
import WishList from "./htm/WishList.tsx"
import CartPage from "./htm/CartPage.tsx"
import EditProduct from "./htm/EditProduct.tsx"
import Register from "./htm/Register.tsx"
import Collections from "./htm/Collections.tsx"

const Main = () => {
  const token = useAppSelector(state => state.token)
  const roles = useAppSelector(state => state.user.profile.roles) ?? []
  const location = useLocation()
  const canManage = roles.some(role => ["ADMINISTRATOR", "MODERATOR", "ROLE_ADMINISTRATOR", "ROLE_MODERATOR"].includes(role))
  const protect = (page: ReactNode, management = false) => {
    if (!token) return <Navigate to="/login" state={{ from: location.pathname }} replace />
    if (management && !canManage) return <section className="container public-page"><h1>Access restricted</h1><p>This page is available to store staff.</p><Link className="btn store-button" to="/shop">Continue shopping</Link></section>
    return page
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/category/:category" element={<Shop />} />
        <Route path="/category/:id/:type" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product/edit/:id" element={protect(<EditProduct />, true)} />
        <Route path="/checkout" element={protect(<CheckOut />)} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/account" element={protect(<Account />)} />
        <Route path="/profile" element={<Navigate to="/account" replace />} />
        <Route path="/login" element={token ? <Navigate to="/account" replace /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/account" replace /> : <Register />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />
        <Route path="/sells" element={protect(<Sells />, true)} />
        <Route path="/new" element={protect(<AddProduct />, true)} />
        <Route path="/receipts" element={protect(<ReceiptsList />, true)} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reports" element={protect(<Reports />, true)} />
        <Route path="*" element={<section className="container public-page not-found"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>Let’s find your way back.</h1><p>The page you’re looking for may have moved.</p><Link className="btn store-button" to="/shop">Explore the shop <span aria-hidden="true">→</span></Link></section>} />
      </Routes>
    </main>
  )
}

export default Main
