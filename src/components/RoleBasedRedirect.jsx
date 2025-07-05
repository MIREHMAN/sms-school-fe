import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const RoleBasedRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [user, navigate]);

  return null;
};

export default RoleBasedRedirect;
