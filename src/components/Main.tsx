import { Navigate, Route, Routes } from "react-router-dom"
import { useAppSelector } from "../app/hooks.ts"
import Account from "./htm/Account.tsx"
import Guest from "./Guest"
import AddProduct from "./htm/AddProduct.tsx"
import Store from "./Store.tsx"
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
import CarrPage from "./htm/CarrPage.tsx"
import CheckOut from "./htm/CheckOut.tsx"
import About from "./htm/About.tsx"
import Contact from "./htm/Contact.tsx"
import WishList from "./htm/WishList.tsx"
import Products from "./htm/Products.tsx"

const Main = () => {
  const token = useAppSelector(state => state.token)

  return (
    <main>
      <Routes>
        {[`/`, `/${navItems[0].route}`].map(path => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CarrPage />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AddProduct />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route
          path={"/login"}
          element={token ? <Navigate to={"/"} /> : <Login />}
        ></Route>
        <Route
          path={"/register"}
          element={token ? <Navigate to={"/profile"} /> : <Register />}
        ></Route>
        <Route path={"/store/:id"} element={token ? <Store /> : <Guest />} />
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
