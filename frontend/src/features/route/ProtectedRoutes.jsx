import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedRoutes({ children, isAdmin }) {
  const navigate = useNavigate();
  const { authenticate, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!authenticate) {
      navigate("/login", { replace: true });
    }
    if (isAdmin && user?.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticate, navigate, isAdmin, user]);

  return <>{children}</>;
}

export default ProtectedRoutes;
