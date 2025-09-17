import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { checkOut, estimateShipping } from "../features/api/accountActions.ts";
import PayPalCheckout from "../paymant/PayPalCheckout.tsx";
import { AddressT, OrderT } from "../utils/types.ts";
import { countries } from "../utils/constants.ts";

const LABELS: Record<keyof AddressT, string> = {
  fullName: "Full Name",
  street: "Street Address",
  city: "City",
  state: "State / Region",
  zipCode: "Postal Code",
  country: "Country",
  phone: "Phone Number",
};

const fmt = (n: number) => `₪${n.toFixed(2)}`;

const CheckOut = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.user.profile);
  const cartItems = profile?.cart?.items ?? [];

  // Derived (compute directly on render)
  const subtotal = cartItems.reduce(
    (sum: number, t: any) => sum + (t.product?.price ?? 0) * (t.quantity ?? 0),
    0
  );
  const totalWeight = cartItems.reduce(
    (sum: number, t: any) => sum + (t.product?.weight ?? 0) * (t.quantity ?? 0),
    0
  );

  const [shippingPrice, setShippingPrice] = useState(0);
  const [isEstimating, setIsEstimating] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Address (prefill from profile once available)
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

  // Prevent stale async updates: only the latest request can set state
  const reqIdRef = useRef(0);

  useEffect(() => {
    const hasInputs = !!addr.country && totalWeight > 0;

    if (!hasInputs) {
      // No estimation needed: show dash in UI and reset price to 0
      setIsEstimating(false);
      setShippingPrice(0);
      return;
    }

    const id = ++reqIdRef.current; // mark this as the latest request
    setIsEstimating(true);

    (async () => {
      try {
        const price = await dispatch(
          estimateShipping({ country: addr.country, weight: totalWeight })
        ).unwrap();

        // Only update if this is still the latest request
        if (reqIdRef.current === id) {
          setShippingPrice(Number(price) || 0);
        }
      } catch {
        if (reqIdRef.current === id) {
          setShippingPrice(0);
        }
      } finally {
        if (reqIdRef.current === id) {
          setIsEstimating(false);
        }
      }
    })();
  }, [dispatch, addr.country, totalWeight]);

  const grandTotal = subtotal + shippingPrice;

  const inputTypeFor = (field: keyof AddressT) =>
    field === "phone" ? "tel" : "text";

  const onAddrChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      alert(
        error instanceof Error
          ? error.message
          : "There was a problem placing your order."
      );
    }
  };

  const showDash = !addr.country || totalWeight <= 0 || isEstimating;

  return (
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
            <span>{showDash ? "—" : fmt(shippingPrice)}</span>
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

          {/*<div className="row">*/}
          {/*  {(Object.keys(LABELS) as Array<keyof AddressT>).map((name) => (*/}
          {/*  ))}*/}
          {/*</div>*/}
          <div className="row">
            {/* Full Name */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-fullName" className="form-label">
                {LABELS.fullName}
              </label>
              <input
                id="addr-fullName"
                name="fullName"
                type="text"
                className="form-control"
                value={addr.fullName}
                onChange={onAddrChange}
                required
                autoComplete="name"
              />
            </div>

            {/* Street */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-street" className="form-label">
                {LABELS.street}
              </label>
              <input
                id="addr-street"
                name="street"
                type="text"
                className="form-control"
                value={addr.street}
                onChange={onAddrChange}
                required
                autoComplete="street-address"
              />
            </div>

            {/* City */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-city" className="form-label">
                {LABELS.city}
              </label>
              <input
                id="addr-city"
                name="city"
                type="text"
                className="form-control"
                value={addr.city}
                onChange={onAddrChange}
                required
                autoComplete="address-level2"
              />
            </div>

            {/* State */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-state" className="form-label">
                {LABELS.state}
              </label>
              <input
                id="addr-state"
                name="state"
                type="text"
                className="form-control"
                value={addr.state}
                onChange={onAddrChange}
                autoComplete="address-level1"
              />
            </div>

            {/* Zip Code */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-zipCode" className="form-label">
                {LABELS.zipCode}
              </label>
              <input
                id="addr-zipCode"
                name="zipCode"
                type="text"
                className="form-control"
                value={addr.zipCode}
                onChange={onAddrChange}
                required
                placeholder="e.g. 94105"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="\d*"
              />
            </div>

            {/* Country */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-country" className="form-label">
                {LABELS.country}
              </label>
              <select
                id="addr-country"
                name="country"
                className="form-select"
                value={addr.country}
                onChange={onAddrChange}
                required
                autoComplete="country-name"
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="addr-phone" className="form-label">
                {LABELS.phone}
              </label>
              <input
                id="addr-phone"
                name="phone"
                type="tel"
                className="form-control"
                value={addr.phone}
                onChange={onAddrChange}
                required
                placeholder="e.g. +1 415 555 1234"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
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
  );
};

export default CheckOut;
