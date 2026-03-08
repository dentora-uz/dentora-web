import ProtectedLayout from "@/context/protected-layout";
import RouterProtector from "@/context/router-protextor";
import { AuthForm } from "@/pages/auth";
import { Dashboard } from "@/pages/dashboard";
import { Profile } from "@/pages/profile";
import ServiceCategories from "@/pages/service-categories/service-categories";
import { Routes, Route, Navigate } from "react-router-dom";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthForm />} />

      <Route element={<RouterProtector />}>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="service-categories" element={<ServiceCategories />} />
          {/* Cart */}
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
