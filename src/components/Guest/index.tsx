import { Navigate } from "react-router-dom"

export default function Guest() {
  return <Navigate to="/login" replace />
}
