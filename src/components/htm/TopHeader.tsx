import { useContext } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { deleteUser } from "../../features/slices/userSlice.ts"
import { deleteToken } from "../../features/slices/tokenSlice.ts"
import { ProductsContext } from "../../utils/context.ts"

const TopHeader = () => {
  const { language, setLanguage } = useContext(ProductsContext)
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.token)

  return (
    <div className="utility-bar">
      <div className="container utility-layout">
        <span className="utility-location">From the Old City of Jerusalem</span>
        <div className="utility-actions">
          <label className="language-picker">
            <span className="visually-hidden">Content language</span>
            <select value={language} onChange={event => setLanguage(event.target.value)}>
              <option>English</option><option>Russian</option><option>Armenian</option>
            </select>
          </label>
          {token ? <>
            <Link to="/account">My account</Link>
            <button type="button" onClick={() => { dispatch(deleteUser()); dispatch(deleteToken()) }}>Sign out</button>
          </> : <Link to="/login">Sign in <span aria-hidden="true">→</span></Link>}
        </div>
      </div>
    </div>
  )
}

export default TopHeader
