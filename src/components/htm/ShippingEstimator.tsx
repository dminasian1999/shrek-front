import React, { useState } from "react";

const ShippingEstimator = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setRates([]);

    try {
      const response = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state, zip }),
      });
      if (!response.ok) throw new Error("Failed to fetch rates");

      const data = await response.json();
      setRates(data.rates || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              <option>Armenia</option>
              <option>United States</option>
              <option>Germany</option>
              <option>France</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input
              type="text"
              id="state"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">Postal Code</label>
            <input
              type="text"
              id="zip"
              className="form-control"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
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
