import React from "react"
import { logoImg, navItems } from "../../utils/constants.ts"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks.ts"

const Header = () => {
    const nav= useNavigate()
  const  cart = useAppSelector(state => state.user.profile.cart)
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
                  <a href={`/category/${item.route}`} className="nav-link">

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
            <div id="header-cart" className="block block-cart">
              <ul className="mini-products-list">
                {[
                  {
                    img: "src/images/product-images/cape-dress-1.jpg",
                    name: "Sleeve Kimono Dress",
                    variant: "Black / XL",
                    price: "$59.00",
                  },
                  {
                    img: "assets/images/product-images/cape-dress-2.jpg",
                    name: "Elastic Waist Dress",
                    variant: "Gray / XXL",
                    price: "$99.00",
                  },
                ].map((item, index) => (
                  <li className="item" key={index}>
                    <a className="product-image" href="#">
                      <img src={item.img} alt={item.name} />
                    </a>
                    <div className="product-details">
                      <a href="#" className="remove">
                        <i className="anm anm-times-l" />
                      </a>
                      <a href="#" className="edit-i remove">
                        <i className="anm anm-edit" />
                      </a>
                      <a className="pName" href="cart.html">
                        {item.name}
                      </a>
                      <div className="variant-cart">{item.variant}</div>
                      <div className="wrapQtyBtn">
                        <div className="qtyField">
                          <span className="label">Qty:</span>
                          <a className="qtyBtn minus" href="#">
                            <i className="fa anm anm-minus-r" />
                          </a>
                          <input
                            type="text"
                            name="quantity"
                            defaultValue="1"
                            className="product-form__input qty"
                          />
                          <a className="qtyBtn plus" href="#">
                            <i className="fa anm anm-plus-r" />
                          </a>
                        </div>
                      </div>
                      <div className="priceRow">
                        <div className="product-price">
                          <span className="money">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
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
