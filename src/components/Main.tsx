import { Navigate, Route, Routes } from "react-router-dom"
import { useAppSelector } from "../app/hooks.ts"
import Account from "./htm/Account.tsx"
import Guest from "./Guest"
import AddProduct from "./htm/AddProduct.tsx"
import ReceiptsList from "./ReceiptsList.tsx"
import ContactUs from "./ContactUs.tsx"
import ForgotPassword from "./ForgotPassword.tsx"
import FAQ from "./FAQ.tsx"
import Signup from "./Signup.tsx"
import Reports from "./Reports.tsx"
import Sells from "./Sells.tsx"
import { navItems } from "../utils/constants.ts"
import Home from "./pages/Home.tsx"
import Register from "./htm/Register.tsx"
import Login from "./htm/Login.tsx"
import Shop from "./htm/Shop.tsx"
import ProductPage from "./htm/ProductPage.tsx"
import CheckOut from "./htm/CheckOut.tsx"
import About from "./htm/About.tsx"
import WishList from "./htm/WishList.tsx"
import CartPage from "./htm/CartPage.tsx"
import EditProduct from "./htm/EditProduct.tsx"

const Main = () => {
  const token = useAppSelector(state => state.token)

  return (
    <main>
      <Routes>
        {[`/`, `/${navItems[0].route}`].map(path => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        {/*<Route path="/products" element={<Products />} />*/}
        <Route path="/cart" element={<CartPage />} />

        {/*<Route path="/category" element={<Shop />} />*/}
        <Route path="/category/:id" element={<Shop />} />
        <Route path="/category/:id/:type" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/account" element={<Account />} />
        <Route
          path={"/login"}
          element={token ? <Navigate to={"/"} /> : <Login />}
        ></Route>
        <Route
          path={"/register"}
          element={token ? <Navigate to={"/profile"} /> : <Register />}
        ></Route>
        <Route path={"/sells"} element={token ? <Sells /> : <Guest />} />
        <Route path={"/new"} element={token ? <AddProduct /> : <Guest />} />

        <Route path="/receipts" element={<ReceiptsList />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </main>
  )
}

export default Main
