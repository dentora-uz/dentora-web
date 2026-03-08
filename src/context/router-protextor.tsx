// import { routePermissions } from "@/store/route-permission";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export default function RouterProtector() {
  const { token } = useAuthStore();
  //   const { pathname } = useLocation();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  //   const matched = routePermissions.find((r) => pathname.startsWith(r.path));

  //   if (matched && !matched.roles.includes(roleId)) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }

  return <Outlet />;
}
