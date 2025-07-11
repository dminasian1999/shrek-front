import React, { useContext } from "react"
import { categories, logoImg, navItems } from "../../utils/constants.ts"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks.ts"
import { ProductsContext } from "../../utils/context.ts"

const Header = () => {
    const nav= useNavigate()
  const  cart = useAppSelector(state => state.user.profile.cart)
  const {language} = useContext(ProductsContext)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container ">
        <button
          className="navbar-toggler btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <a className="navbar-brand" href="/">
          <img
            className={"rounded-circle"}
            height={70}
            src={logoImg}
            alt="Belle Multipurpose Html Template"
            title="Belle Multipurpose Html Template"
          />
        </a>

        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Close Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body ">
            <ul className="navbar-nav justify-content-center flex-grow-1  hidearrow ">
              {navItems.map(item => (
                <li className="nav-item">
                  <a href={`/${item.route}`} className="nav-link">

                    <h4 className={'fw-bolder me-5'}>{item.title}</h4>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-block mt-3">
          <div className="site-cart">
            {cart &&
              <Link to="/cart" className="site-header__cart" title="Cart">
                <i className="icon anm anm-bag-l"></i>
                <span
                  id="CartCount"
                  className="site-header__cart-count"
                  data-cart-render="item_count"
                >
                  {cart.items.length}
                </span>
              </Link>
            }
          </div>
          {cart &&
            <div className="site-header__search">
              <button onClick={()=>nav('/wishList')} type="button" className="search-trigger">
                <i className="icon anm anm-heart-r"></i>
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Header
