import React, { useState } from "react";
import { baseUrl, logoImg } from "../utils/constants.ts";
import { useAppSelector } from "../app/hooks.ts";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const token = useAppSelector(state => state.token); // not used here but okay if needed later

  const send = async () => {
    if (!email) {
      setMessage("Email is required.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${baseUrl}/password/recovery/${email}`, {
        method: "GET",
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Password reset link sent! Please check your email.");
      } else {
        const errorData = await res.json();
        setStatus("error");
        setMessage(errorData.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error or server is unreachable.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
          <div className="d-flex my-5 gap-3 flex-column align-items-center justify-content-around">
            <img
              className="login-logo"
              src={logoImg}
              alt="Logo"
              height={100}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={send}
              disabled={status === "loading"}
              className="btn btn-primary w-100"
            >
              {status === "loading" ? "Sending..." : "SUBMIT"}
            </button>
            {status !== "idle" && (
              <div className={`alert ${status === "success" ? "alert-success" : "alert-danger"} w-100 text-center`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
