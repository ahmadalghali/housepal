import { useContext, useEffect } from "react";
import { UserDTO } from "../types";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      login(JSON.parse(user));
    }
  }, []);

  const isLoggedInUser = (userId: number) => {
    return user ? user.id == userId : false;
  };

  const login = (_user: UserDTO) => {
    localStorage.setItem("user", JSON.stringify(_user));
    setUser(_user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    isLoggedInUser,
    login,
    logout,
  };
}
