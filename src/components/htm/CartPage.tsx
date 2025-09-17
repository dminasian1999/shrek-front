import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CartPageRow from "./CartPageRow"
import PayPalCheckout from "../../paymant/PayPalCheckout"
import { checkOut, estimateShipping } from "../../features/api/accountActions.ts"
import { AddressT, OrderT } from "../../utils/types.ts"
import CheckOut from "../CheckOut.tsx"
import { countries, LABELS } from "../../utils/constants.ts"

const CartPage = () => {

  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.user.profile)
  const country = useAppSelector(state => state.user.profile.address?.country)
  const total = useAppSelector(state => state.user.profile.cart.totalPrice)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const token = useAppSelector(state => state.token)
  const [shippingPrice, setShippingPrice] = useState(0)
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the terms to proceed.")
      return
    }

    const orderItems = profile.cart.items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }))

    const orderPayload: OrderT = {
      userId: profile.login,
      paymentMethod: "PayPal",
      shippingAddress: profile.address!,
      orderItems,
    }

    try {
      // Dispatch the async thunk instead of fetch
      const resultAction = await dispatch(checkOut(orderPayload))

      if (checkOut.fulfilled.match(resultAction)) {
        alert("Your order(s) have been successfully placed!")
        // TODO: clear cart or redirect user
      } else {
        throw new Error("Order creation failed.")
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "There was a problem placing your order.",
      )
    }
  }
  const countShipping = () => {}

  const [subtotal, setSubtotal] = useState(
    profile.cart.items.reduce(
      (total, t) => total + t.product.price * t.quantity,
      0,
    ),
  )
  const [weight, setWeight] = useState(
    profile.cart.items.reduce(
      (total, t) => total + t.product.weight * t.quantity,
      0,
    ),
  )
  const [zip, setZip] = useState("")
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // dispatch(estimateShipping({ country, weight }))
    // setShippingPrice(profile.cart.shippingPrice)
    // estimateShipping(country!,weight).then(setShippingPrice)
  }, [subtotal])


  const cartItems = profile?.cart?.items ?? [];

  // Derived (computed directly on render — no useMemo)
  // const subtotal = cartItems.reduce(
  //   (sum: number, t: any) => sum + (t.product?.price ?? 0) * (t.quantity ?? 0),
  //   0
  // );
  const totalWeight = cartItems.reduce(
    (sum: number, t: any) => sum + (t.product?.weight ?? 0) * (t.quantity ?? 0),
    0
  );

  // const [shippingPrice, setShippingPrice] = useState(0);
  // const [termsAccepted, setTermsAccepted] = useState(false);

  // Prefill address once
  const [addr, setAddr] = useState<AddressT>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const a = profile?.address;
    if (a) {
      setAddr({
        fullName: a.fullName ?? "",
        street: a.street ?? "",
        city: a.city ?? "",
        state: a.state ?? "",
        zipCode: a.zipCode ?? "",
        country: a.country ?? "",
        phone: a.phone ?? "",
      });
    }
  }, [profile?.address]);

  // Estimate shipping whenever country/weight change
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!addr.country || totalWeight <= 0) {
        setShippingPrice(0);
        return;
      }
      try {
        const price = await dispatch(
          estimateShipping({ country: addr.country, weight: totalWeight })
        ).unwrap();
        if (!cancelled) setShippingPrice(Number(price) || 0);
      } catch {
        if (!cancelled) setShippingPrice(0);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch, addr.country, totalWeight]);

  const grandTotal = subtotal + shippingPrice;

  const inputTypeFor = (field: keyof AddressT) => (field === "phone" ? "tel" : "text");

  const onAddrChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddr((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms to proceed.");
      return;
    }

    const orderItems = (profile?.cart?.items ?? []).map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    const orderPayload: OrderT = {
      userId: profile.login,
      paymentMethod: "PayPal",
      shippingAddress: addr,
      orderItems,
      // Optionally include:
      // shippingPrice,
      // totalAmount: grandTotal,
      // totalWeight,
    };

    try {
      const resultAction = await dispatch(checkOut(orderPayload));
      if (checkOut.fulfilled.match(resultAction)) {
        alert("Your order(s) have been successfully placed!");
        // TODO: clear cart or navigate
      } else {
        throw new Error("Order creation failed.");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "There was a problem placing your order.");
    }
  };
  const fmt = (n: number) => `₪${n.toFixed(2)}`;

  return (
    <div className="px-1">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Shopping Cart</h1>
      </div>

      <div className="alert alert-success text-center">
        <i className="fa fa-truck me-2" />
        <strong>Congratulations!</strong> You've got free shipping!
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle text-center">
          <thead className="table-light">
            <tr>
              <th colSpan={2}>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {profile.cart.items.map(item => (
              <CartPageRow key={item.cartItemId} cardItem={item} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <a
                  href="/"
                  className="btn btn-outline-secondary w-100 w-md-auto"
                >
                  Continue Shopping
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="row gy-4">
        {/*<ShippingEstimator />*/}

        <div className="col-12 col-md-12">
          <div className="border rounded p-4 shadow-sm h-100">
            {/*<CheckOut/>*/}
            <div className="row g-5">
              {/* Summary */}
              <div className="col-md-5 col-lg-4 order-md-last">
                <div className="border rounded p-4 shadow-sm h-100">
                  <h5 className="fw-bold mb-3">Cart Summary</h5>

                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span>Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span>Shipping</span>
                    <span>{ fmt(shippingPrice)}</span>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <span>Total Weight</span>
                    <span>{(totalWeight / 1000).toFixed(2)} kg</span>
                  </div>

                  <div className="d-flex justify-content-between border-bottom py-2 fw-bold">
                    <span>Grand Total</span>
                    <span>{fmt(grandTotal)}</span>
                  </div>

                  <div className="form-check my-3">
                    <input
                      type="checkbox"
                      className="form-check-inline me-2"
                      id="terms"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree with the terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              {/* Address + Payment */}
              <div className="col-md-7 col-lg-8">
                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                  <h5 className="mb-3">Billing & Shipping Details</h5>

                  <div className="row">
                    {(Object.keys(LABELS) as Array<keyof AddressT>).map((name) => (
                      <div key={name} className="col-sm-6 col-12 mb-3">
                        <label htmlFor={`addr-${name}`} className="form-label">
                          {LABELS[name]}
                        </label>

                        {name === "country" ? (
                          <select
                            id={`addr-${name}`}
                            name={name}
                            className="form-select"
                            value={addr[name]}
                            onChange={onAddrChange}
                            required
                          >
                            <option value="">Select country</option>
                            {countries.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`addr-${name}`}
                            name={name}
                            type={inputTypeFor(name)}
                            className="form-control"
                            value={addr[name]}
                            onChange={onAddrChange}
                            required={name !== "state"}
                            placeholder={
                              name === "zipCode"
                                ? "e.g. 94105"
                                : name === "phone"
                                  ? "e.g. +1 415 555 1234"
                                  : undefined
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="row g-3 mt-2">
                    {/* PayPal uses grand total */}
                    <PayPalCheckout amount={grandTotal.toFixed(2)} />
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3"
                      disabled={!termsAccepted}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
