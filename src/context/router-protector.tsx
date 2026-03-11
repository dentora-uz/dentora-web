import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
export default function RouterProtector() {
  const token = Cookies.get("access_token")

  if (!token) {
    console.log("token: ", token)
    return <Navigate to="/auth" replace />;
  }

  console.log("outlet")
  return <Outlet />;
}
