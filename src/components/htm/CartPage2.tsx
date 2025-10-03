import React, { useCallback, useEffect, useState, useMemo } from "react"
// Assuming these imports are necessary for Redux dispatch/actions in your actual project
import { useAppDispatch } from "../../app/hooks.ts"

// --- 1. Cart Item Data Structure ---
// Defines the expected structure of an item stored in the cart state/backend.
interface CartItemT {
  cartItemId: string // Unique identifier for the item/variant in the cart (e.g., "productId-sku-size")
  product: {
    id: string
    name: string
    price: number // Current price of the variant
    imageUrls?: string[]
    size: string // Specific variant detail (e.g., Ring size, T-shirt size)
    sku: string // Stock Keeping Unit
    oldPrice?: number // Optional old price for discount display
  }
  quantity: number
}

// Mock Cart Data to simulate a fetched list, mirroring the structure in the images
const MOCK_CART_DATA: CartItemT[] = [
  {
    cartItemId: "prod1-scroll-2823",
    product: {
      id: "prod1",
      name: '"Shaddai" Hebrew Protection scroll necklace',
      price: 28.23,
      imageUrls: ["/shaddai-scroll.jpg"], // Placeholder image URL
      size: "925 Sterling Silver", // Variant detail
      sku: "nec-001-925",
      oldPrice: 31.36, // For discount line-through
    },
    quantity: 1,
  },
  {
    cartItemId: "prod2-ring-5",
    product: {
      id: "prod2",
      name: "Four Hebrew Blessings Ring",
      price: 151.78,
      imageUrls: ["/hebrew-ring.jpg"], // Placeholder image URL
      size: "5",
      sku: "rin-c2-5",
      oldPrice: 168.64, // For discount line-through
    },
    quantity: 1,
  },
]
// ----------------------------------------------------------------------

/**
 * Renders the shopping cart page.
 * Displays individual cart items, manages quantity, removal, and calculates totals.
 */
const CartPage2 = () => {
  // const dispatch = useAppDispatch() // For real Redux usage
  const [cartItems, setCartItems] = useState<CartItemT[]>(MOCK_CART_DATA)
  const [loading, setLoading] = useState(false)

  // --- 2. Core Calculation Logic ---
  const { totalItems, productSubtotal } = useMemo(() => {
    // Only consider items with quantity > 0 for totals
    const activeItems = cartItems.filter(item => item.quantity > 0)

    const totalItems = activeItems.reduce((sum, item) => sum + item.quantity, 0)

    const productSubtotal = activeItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
    return { totalItems, productSubtotal }
  }, [cartItems])

  // Simulate fetching the cart list (optional, for demo structure)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      // In a real app: dispatch(fetchCartList()).then(data => setCartItems(data));
      setCartItems(MOCK_CART_DATA)
      setLoading(false)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  // --- 3. Handlers for Cart Actions ---

  // Handles incrementing/decrementing item quantity
  const handleQuantityChange = useCallback(
    (cartItemId: string, delta: number) => {
      setCartItems(prevItems =>
        prevItems.map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta
            // Enforce minimum of 1 (or 0 if you allow it, but we use a dedicated remove button here)
            // And a max stock limit (mocked at 99)
            if (newQty >= 1 && newQty <= 99) {
              // In a real app: dispatch(updateCartItemQuantity(cartItemId, newQty))
              return { ...item, quantity: newQty }
            }
          }
          return item
        }),
      )
    },
    [],
  )

  // Handles removing an item entirely from the cart
  const handleRemoveItem = useCallback(
    (cartItemId: string) => {
      // In a real app: dispatch(removeCartItem(cartItemId))
      setCartItems(prevItems =>
        prevItems.filter(item => item.cartItemId !== cartItemId),
      )
    },
    [],
  )

  // --- 4. Loading and Empty State ---

  if (loading) {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        />
        <p className="mt-3 fs-5 text-muted">Loading your cart...</p>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="container text-center mt-5">
        <h1 className="fw-light mb-4">Your cart is empty</h1>
        <p className="text-muted fs-5">
          You haven't added any items yet.
        </p>
        <button className="btn btn-primary mt-3">Continue shopping</button>
      </main>
    )
  }

  // --- 5. Main Cart JSX Structure ---

  return (
    <div className="container my-5" style={{ maxWidth: 1000 }}>
      <div className="d-flex justify-content-between align-items-baseline mb-4">
        <h1 className="fw-light">Your cart</h1>
        <a href="#" className="text-decoration-none">
          Continue shopping
        </a>
      </div>

      <div className="row border-bottom pb-2 mb-3 text-uppercase fw-bold text-muted d-none d-md-flex">
        <div className="col-6">Product</div>
        <div className="col-2 text-center">Quantity</div>
        <div className="col-4 text-end">Total</div>
      </div>

      {/* Cart Item List */}
      {cartItems.map(item => {
        const { product, quantity, cartItemId } = item
        const itemTotal = product.price * quantity

        return (
          <div
            key={cartItemId}
            className="row align-items-start py-3 border-bottom px-1 cart-item-row"
          >
            {/* Product Details (Image, Name, Variant) */}
            <div className="col-md-6 col-12 d-flex gap-3">
              <img
                src={product.imageUrls?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="img-thumbnail"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <div className="d-flex flex-column">
                <p className="mb-1 fw-bold fs-6">{product.name}</p>
                <small className="text-muted mb-0">{product.size}</small>
                {product.oldPrice && (
                  <small className="text-secondary text-decoration-line-through">
                    ${product.oldPrice.toFixed(2)}
                  </small>
                )}
                <small className="text-danger mt-1 d-md-none">
                  ${product.price.toFixed(2)} / ea
                </small>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="col-md-2 col-6 d-flex justify-content-md-center justify-content-start align-items-center mt-3 mt-md-0">
              <div className="input-group" style={{ width: 110 }}>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={() => handleQuantityChange(cartItemId, -1)}
                  disabled={quantity <= 1} // Disallow dropping below 1
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control form-control-sm text-center"
                  value={quantity}
                  readOnly
                  style={{ backgroundColor: "white" }}
                />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={() => handleQuantityChange(cartItemId, 1)}
                  disabled={quantity >= 99} // Max stock check
                >
                  +
                </button>
              </div>
            </div>

            {/* Item Total and Remove Button */}
            <div className="col-md-4 col-6 text-end d-flex flex-column align-items-end mt-3 mt-md-0">
              <span className="fw-bold fs-5 mb-1">${itemTotal.toFixed(2)}</span>
              <button
                className="btn btn-link text-danger p-0"
                onClick={() => handleRemoveItem(cartItemId)}
                aria-label="Remove item"
              >
                <i className="fa fa-trash me-1" />
                Remove
              </button>
            </div>
          </div>
        )
      })}

      {/* Cart Summary and Checkout */}
      <div className="row mt-4 justify-content-end">
        <div className="col-md-4 col-12 text-end">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold me-3 text-muted">Total items</span>
            <span className="fw-bold">{totalItems}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="me-3 fw-bold fs-5">Estimated total</span>
            <span className="fw-bold fs-5">${productSubtotal.toFixed(2)} USD</span>
          </div>

          <p className="text-muted small mb-3">
            Taxes, discounts and shipping calculated at checkout.
          </p>

          <button className="btn btn-primary btn-lg w-100 mb-2 py-3 check-out-button" style={{ backgroundColor: "#827167", borderColor: "#827167" }}>
            Check out
          </button>
          <button className="btn btn-warning btn-lg w-100 py-3 paypal-button" style={{ backgroundColor: "#FFC439", borderColor: "#FFC439" }}>
            PayPal
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage2
