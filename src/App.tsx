import {useAppSelector} from "./app/hooks.ts";
import {Navigate, Route, Routes} from "react-router-dom";
import Guest from "./components/Guest";
import Profile from "./components/Profile";
import './App.css';

const App = () => {
    const token = useAppSelector(state => state.token)

    return (
        <div className="container-fluid">

            <Routes>
                <Route path={'/'} element={token ? <Navigate to={'/profile'}/> : <Guest/>}></Route>
                <Route path={'/profile'} element={token ? <Profile/> : <Navigate to={"/"}/>}></Route>
            </Routes>
        </div>

    )
}

export default App
