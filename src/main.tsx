import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./app/store"
import "@fortawesome/fontawesome-free/css/all.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./css/style.css"
import "./index.css"
import App from "./App.tsx"

const container = document.getElementById("root")
if (!container) throw new Error("The application root is missing.")

createRoot(container).render(
  <BrowserRouter>
    <Provider store={store}><App /></Provider>
  </BrowserRouter>,
)
