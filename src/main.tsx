import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "./app/store"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import "./index.css"
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById("root")

if (container) {
    const root = createRoot(container)

    root.render(
        // <StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        // </StrictMode>
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
