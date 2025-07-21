import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRedirect = () => {
  const { user, isLoading } = useUser(); // ⬅️ Grab isLoading
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // ⬅️ Wait until user is loaded

    if (!user?.role) {
      navigate("/login");
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "student":
        navigate("/student");
        break;
      case "parent":
        navigate("/parent");
        break;
      default:
        navigate("/login");
        break;
    }
  }, [user, navigate, isLoading]); // ⬅️ Add isLoading to deps

  return null;
};

export default RoleBasedRedirect;
