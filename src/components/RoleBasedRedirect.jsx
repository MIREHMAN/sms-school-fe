// src/components/RoleBasedRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "teacher") {
      navigate("/teacher");
    } else if (user?.role === "student") {
      navigate("/student");
    } else if (user?.role === "parent") {
      navigate("/parent");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null; // Optionally return a loading spinner
};

export default RoleBasedRedirect;
