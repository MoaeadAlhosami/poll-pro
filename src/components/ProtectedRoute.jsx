// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    // لا يوجد توكن → إعادة التوجيه للـ Login
    return <Navigate to="/login" replace />;
  }

  // يوجد توكن → عرض الصفحة المطلوبة
  return children;
}
