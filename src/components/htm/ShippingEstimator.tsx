import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { estimateShipping } from "../../features/api/accountActions.ts"

const ShippingEstimator = () => {
  const user = useAppSelector(state => state.user.profile)
  const [country, setCountry] = useState(user.address!.country);

  const [weight, setWeight] = useState(user.cart.items.reduce((total, t) => total + (t.product.weight * t.quantity), 0));
  const [zip, setZip] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.token)


  const handleCalculate = async () => {
    dispatch(estimateShipping({ token, country, weight }))
    setLoading(true);
    setError(null);
    setRates([]);

  };


  return (
    <div className="col-12 col-md-6">
      <div className="border rounded p-4 h-100 shadow-sm">
        <h5 className="fw-bold mb-3">Estimate Shipping and Tax</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
        >
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <select
              className="form-select"
              id="country"
              value={user.address!.country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option>{user.address?.country}</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Weight</label>
            <input
              type="number"
              id="weight"
              className="form-control"
              value={user.cart.items.reduce((total, t) => total + (t.product.weight * t.quantity), 0)}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
            {loading ? "Calculating..." : "Calculate Shipping"}
          </button>
        </form>

        {error && <div className="mt-3 text-danger">Error: {error}</div>}

        {rates.length > 0 && (
          <div className="mt-3">
            <h6>Shipping Rates:</h6>
            <ul className="list-group">
              {/*{rates.map((rate) => (*/}
              {/*  <li key={rate.object_id} className="list-group-item d-flex justify-content-between align-items-center">*/}
              {/*    {rate.provider} - {rate.servicelevel.name}*/}
              {/*    <span>{rate.currency} {rate.amount}</span>*/}
              {/*  </li>*/}
              {/*))}*/}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingEstimator;
