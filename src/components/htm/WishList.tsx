import React from "react"

const WishList = () => {
  return (
    <div id="page-content">
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper"><h1 className="page-width">Wish List</h1></div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            <form action="#">
              <div className="wishlist-table table-content table-responsive">
                <table className="table table-bordered">
                  <thead>
                  <tr>
                    <th className="product-name text-center alt-font">Remove</th>
                    <th className="product-price text-center alt-font">Images</th>
                    <th className="product-name alt-font">Product</th>
                    <th className="product-price text-center alt-font">Unit Price</th>
                    <th className="stock-status text-center alt-font">Stock Status</th>
                    <th className="product-subtotal text-center alt-font">Add to Cart</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="product-remove text-center" valign="middle"><a href="#"><i
                      className="icon icon anm anm-times-l"></i></a></td>
                    <td className="product-thumbnail text-center">
                      <a href="#"><img src=" src/images/product-images/product-image8.jpg" alt="" title="" /></a>
                    </td>
                    <td className="product-name"><h4 className="no-margin"><a href="#">Minerva Dress black</a></h4></td>
                    <td className="product-price text-center"><span className="amount">$165.00</span></td>
                    <td className="stock text-center">
                      <span className="in-stock">in stock</span>
                    </td>
                    <td className="product-subtotal text-center">
                      <button type="button" className="btn btn-small">Add To Cart</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-remove text-center" valign="middle"><a href="#"><i
                      className="icon icon anm anm-times-l"></i></a></td>
                    <td className="product-thumbnail text-center">
                      <a href="#"><img src=" src/images/product-images/product-image4.jpg" alt="" title="" /></a>
                    </td>
                    <td className="product-name"><h4 className="no-margin"><a href="#">Sueded Cotton Pant in Khaki</a>
                    </h4></td>
                    <td className="product-price text-center"><span className="amount">$150.00</span></td>
                    <td className="stock text-center">
                      <span className="out-stock">Out Of stock</span>
                    </td>
                    <td className="product-subtotal text-center">
                      <button type="button" className="btn btn-small">Add To Cart</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-remove text-center" valign="middle"><a href="#"><i
                      className="icon icon anm anm-times-l"></i></a></td>
                    <td className="product-thumbnail text-center">
                      <a href="#"><img src=" src/images/product-images/product-image5.jpg" alt="" title="" /></a>
                    </td>
                    <td className="product-name"><h4 className="no-margin"><a href="#">Woven Solid Midi Shirt Dress</a>
                    </h4></td>
                    <td className="product-price text-center"><span className="amount">$150.00</span></td>
                    <td className="stock text-center">
                      <span className="in-stock">in stock</span>
                    </td>
                    <td className="product-subtotal text-center">
                      <button type="button" className="btn btn-small">Add To Cart</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  )
}

export default WishList
