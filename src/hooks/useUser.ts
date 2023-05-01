import { useEffect, useState } from "react";
import { UserDTO } from "../types";

export default function useUser() {
  const [user, setUser] = useState<UserDTO | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const isLoggedInUser = (userId: number) => {
    return userId === user?.id;
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return {
    user,
    isLoggedInUser,
  };
}
