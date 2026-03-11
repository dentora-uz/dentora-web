import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/server/auth";

export default function RouterProtector() {
  const { isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    refetchOnWindowFocus:false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
