import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { baseUrl } from "../utils/constants";
import { changePassword } from "../features/api/accountActions.ts"
import { useAppDispatch } from "../app/hooks.ts"

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const {token} = useParams()
  const dispatch=useAppDispatch();

  const submit = async () => {
    if (!password || !token) {
      setMessage("Invalid token or empty password.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    // dispatch(changePassword({newPassword:password,oldPassword:password}))

    try {

      const res = await fetch(`${baseUrl}/password/recovery/${token}`, {
        method: "Put",
        headers: {
          "Authorization": token,
          "X-Password": password,
        },
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Password reset successful. You may now log in.");
      } else {
        const errorData = await res.json();
        setStatus("error");
        setMessage(errorData.message || "Reset failed.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Reset Your Password</h2>
      <div className="form-group">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={submit} disabled={status === "loading"}>
        {status === "loading" ? "Resetting..." : "Reset Password"}
      </button>
      {status !== "idle" && (
        <div className={`alert mt-3 ${status === "success" ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
