import React, { useState } from 'react';
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/api/accountActions";

const Register = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login || !password || !firstName || !lastName) {
      alert("All fields are required.");
      return;
    }

    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    dispatch(registerUser({ login, password, firstName, lastName }));
  };

  return (
    <>
      <h2 className="mt-4 mb-4 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter your email"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              required
            />
            <span
              className="input-group-text"
              role="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`icon-eye${showPassword ? "-off" : ""}`}></i>
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.trim())}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.trim())}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsConditions"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="termsConditions">
            I agree to the terms and conditions
          </label>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-lg btn-primary">
            SIGN UP
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
