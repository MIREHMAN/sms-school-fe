// src/components/RoleBasedRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const role = user?.role.toLowerCase() || "";

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "teacher") {
      navigate("/teacher");
    } else if (role === "student") {
      navigate("/student");
    } else if (role === "parent") {
      navigate("/parent");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null; // Optionally return a loading spinner
};

export default RoleBasedRedirect;
