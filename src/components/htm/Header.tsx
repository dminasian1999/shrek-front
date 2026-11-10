import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { logoImg } from "../../utils/constants.ts"
import { useAppSelector } from "../../app/hooks.ts"

const links = [
  ["/", "Home"],
  ["/shop", "Shop"],
  ["/collections", "Collections"],
  ["/about", "Our story"],
  ["/contact", "Contact"],
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const cart = useAppSelector(state => state.user.profile.cart)
  const count = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className="store-header" onKeyDown={event => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }}>
      <div className="container header-layout">
        <Link className="store-brand" to="/" aria-label="Gejekoushian’s Armenian Ceramics home">
          <img src={logoImg} width="54" height="54" alt="" />
          <span><strong>GEJEKOUSHIAN’S</strong><small>Armenian ceramics & gifts</small></span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(value => !value)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onKeyDown={event => {
            if (event.key === "Escape") {
              setMenuOpen(false)
              toggle.current?.focus()
            }
          }}
        >
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <Link className="header-icon" to="/wishlist" aria-label="Wishlist" title="Wishlist">
            <i className="fa-regular fa-heart" aria-hidden="true" />
          </Link>
          <Link className="header-icon" to="/cart" aria-label={`Shopping bag, ${count} items`} title="Shopping bag">
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            <span className="bag-count" aria-hidden="true">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
