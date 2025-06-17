import {Navigate, Route, Routes} from "react-router-dom";
import {useAppSelector} from "../app/hooks.ts";
import Account from "./Account.tsx";
import Guest from "./Guest";
import Products from "./Products.tsx";
import AddProduct from "./AddProduct.tsx";
import Store from "./Store.tsx";
import Login from './Guest/Login.tsx';
import ReceiptsList from "./ReceiptsList.tsx";
import ContactUs from "./ContactUs.tsx";
import ForgotPassword from "./ForgotPassword.tsx";
import FAQ from "./FAQ.tsx";
import Signup from "./Signup.tsx";
import Reports from "./Reports.tsx";
import Sells from "./Sells.tsx";


const Main = () => {
    const token=useAppSelector(state => state.token)

    return (
        <main >
            <Routes>
                <Route path={'/'} element={token ? <Navigate to={'/store'}/> : <Guest/>}/>
                <Route path={'/store'} element={token ? <Store/> :<Guest/>}/>
                <Route path={'/store/:id'} element={token ? <Store /> :<Guest/>}/>
                <Route path={'/sells'} element={token ? <Sells /> :<Guest/>}/>
                <Route path={'/new'} element={token ? <AddProduct/> :<Guest/>}/>

                <Route path="/login"                       element={<Login />} />
                <Route path="/receipts"                    element={<ReceiptsList />} />
                <Route path="/contact-us"                  element={<ContactUs />} />
                <Route path="/forgot-password"             element={<ForgotPassword />} />
                <Route path="/faq"                         element={<FAQ />} />
                <Route path="/signup"                      element={<Signup />} />
                <Route path="/reports"                     element={<Reports />} />
                <Route path="/products"                    element={<Products />} />
                <Route path="/account"                     element={<Account />} />
            </Routes>
        </main>
    );
};

export default Main;
