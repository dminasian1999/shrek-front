import React from "react"

const Logos = () => {
  return (
    <div className="store-feature section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <ul className="display-table store-info">
              {/*<li className="display-table-cell">*/}
              {/*  <i className="icon anm anm-truck-l"></i>*/}
              {/*  <h5>Shipping Information</h5>*/}
              {/*  <span className="sub-text">Shipping cost is separate from the product price</span>*/}
              {/*</li>*/}
              <li className="display-table-cell">
                <i className="icon anm anm-dollar-sign-r"></i>
                <h5>Money Guarantee</h5>
                <span className="sub-text">30 days money back guarantee</span>
              </li>
              <li className="display-table-cell">
                <i className="icon anm anm-comments-l"></i>
                <h5>Online Support</h5>
                <span className="sub-text">We support online 24/7 every day</span>
              </li>
              <li className="display-table-cell">
                <i className="icon anm anm-credit-card-front-r"></i>
                <h5>Secure Payments</h5>
                <span className="sub-text">All payments are secured and trusted</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logos
