import { Navigate, Route, Routes } from "react-router-dom"
import { useAppSelector } from "../app/hooks.ts"
import Account from "./htm/Account.tsx"
import Guest from "./Guest"
import AddProduct from "./htm/AddProduct.tsx"
import ForgotPassword from "./ForgotPassword.tsx"
import FAQ from "./FAQ.tsx"
import Signup from "./Signup.tsx"
import { navItems } from "../utils/constants.ts"
import Home from "./pages/Home.tsx"
import Login from "./htm/Login.tsx"
import Shop from "./pages/Shop.tsx"
import ProductPage from "./htm/ProductPage.tsx"
import About from "./pages/About.tsx"
import CartPage from "./htm/CartPage.tsx"
import EditProduct from "./htm/EditProduct.tsx"
import { useContext } from "react"
import { ProductsContext } from "../utils/context.ts"
import Register from "./htm/Register.tsx"
import Collections from "./pages/Collections.tsx"
import ResetPassword from "./ResetPassword.tsx"
import OrderDetails from "./htm/OrderDetails.tsx"
import Contact from "./pages/Contact.tsx"
import SupportCenter from "./htm/SupportCenter.tsx"
import OrdersAndReturns from "./htm/OrdersAndReturns.tsx"
import TermsAndConditions from "./htm/TermsAndConditions.tsx"
import PrivacyPolicy from "./htm/PrivacyPolicy.tsx"
import AllOrders from "./pages/AllOrders.tsx"
import WishList from "./htm/WishList.tsx"

const Main = () => {
  const token = useAppSelector(state => state.token)
  const { language } = useContext(ProductsContext)

  return (
    <div className="container-fluid p-0">
      <Routes>
        {[`/`, `/${navItems[0].route}`].map(path => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        {/*<Route path="/products" element={<Products />} />*/}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/category/:id/:type" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/account" element={<Account />} />
        <Route path={"/login"} element={token ? <Navigate to={"/"} /> : <Login />}/>
        <Route path={"/register"} element={token ? <Navigate to={"/"} /> : <Register />}/>
        <Route path={"/forgot-password"} element={token ? <Navigate to={"/"} /> : <ForgotPassword />}/>
        <Route path={"/reset-password/:token"} element={token ? <Navigate to={"/"} /> : <ResetPassword />}/>
        <Route path={"/new"} element={token ? <AddProduct /> : <Guest />} />

        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/support-center" element={<SupportCenter />} />
        <Route path="/orders-and-returns" element={<OrdersAndReturns />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

export default Main
