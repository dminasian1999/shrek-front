import React from "react"

const LookBook = () => {
  return (
    <div id="page-content">
      <div className="lookbook-1">
        <div className="lookbook grid grid-masonary">
          <div className="grid-sizer"></div>
          <div className="grid-lookbook grid-item">
            <img src="src/images/lookbook-2.jpg" alt="" />
            <div className="caption">
              <h2>Women's Winter wear</h2>
              <a className="btn" href="#">Shop The Collectons <i className="fa fa-caret-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="grid-lookbook grid-item">
            <img src="src/images/lookbook-3.jpg" alt="" />
            <div className="caption">
              <h2>Collection 2017 special</h2>
              <a className="btn" href="#">Shop The Collectons <i className="fa fa-caret-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="grid-lookbook grid-item">
            <img src="src/images/lookbook-4.jpg" alt="" />
            <div className="caption">
              <h2>Summer Collection</h2>
              <a className="btn" href="#">Shop The Collectons <i className="fa fa-caret-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="grid-lookbook grid-item">
            <img src="src/images/lookbook-5.jpg" alt="" />
            <div className="caption">
              <h2>Kids Wear</h2>
              <a className="btn" href="#">Shop The Collectons <i className="fa fa-caret-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="grid-lookbook grid-item">
            <img src="src/images/lookbook-6.jpg" alt="" />
            <div className="caption">
              <h2>lingerie collection</h2>

              <a className="btn" href="#">Shop The Collectons <i className="fa fa-caret-right" aria-hidden="true"></i>
              </a>

            </div>
            <a className="overlay" href="#"></a></div>
        </div>
      </div>

    </div>
  )
}

export default LookBook
