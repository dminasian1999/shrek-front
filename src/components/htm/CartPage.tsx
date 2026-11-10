import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import CartPageRow from "./CartPageRow"
import { cartSubtotal, money } from "../../utils/commerce"

const CartPage = () => {
  const token = useAppSelector(state => state.token)
  const { profile, errorMessage, loading } = useAppSelector(state => state.user)
  const items = profile.cart?.items ?? []
  return (
    <div className="container py-4 py-md-5">
      <h1 className="mb-4">Your shopping cart</h1>
      {!token ? (
        <div className="py-4">
          <p>Sign in to view your cart and save your favorite pieces.</p>
          <Link className="btn" to="/login">
            Sign in
          </Link>{" "}
          <Link className="btn btn-outline-secondary" to="/shop">
            Explore the shop
          </Link>
        </div>
      ) : !items.length ? (
        <div className="py-4">
          <p>Your cart is empty. Find something made to be treasured.</p>
          <Link className="btn" to="/shop">
            Explore the shop
          </Link>
        </div>
      ) : (
        <>
          {errorMessage && (
            <p className="alert alert-danger" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <caption className="visually-hidden">
                Products in your shopping cart
              </caption>
              <thead>
                <tr>
                  <th colSpan={2} scope="col">
                    Product
                  </th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">
                    <span className="visually-hidden">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <CartPageRow key={item.cartItemId} cardItem={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="row g-4">
            <div className="col-md-7">
              <Link to="/shop">← Continue shopping</Link>
              <p className="text-muted mt-3">
                We’ll calculate shipping and confirm the total at checkout.
              </p>
            </div>
            <div className="col-md-5">
              <section className="p-4 border rounded">
                <h2 className="h4">Order summary</h2>
                <div className="d-flex justify-content-between my-3">
                  <span>Subtotal</span>
                  <strong>{money(cartSubtotal(items))}</strong>
                </div>
                <p className="small text-muted">
                  Shipping is calculated at checkout.
                </p>
                <Link
                  className={`btn w-100 ${loading ? "disabled" : ""}`}
                  aria-disabled={loading}
                  to="/checkout"
                >
                  Proceed to checkout
                </Link>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default CartPage
