import { useNavigate } from "react-router-dom";
import { logout } from "../service/auth.service";

export default function useLogout() {
  const navigate = useNavigate();
  const handleLogout = (): Promise<void> => {
    return new Promise(() => {
      logout();
      navigate("/login");
    });
  };
  return { handleLogout };
}
