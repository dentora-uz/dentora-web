import AppLayout from "@/components/custom/app-layout";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
