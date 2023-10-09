import { auth } from "@/utils/auth";
import { Outlet, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
export default function ProtectedRoute() {
  if (!auth.isAuthenticated()) {
    <Toaster />;
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
