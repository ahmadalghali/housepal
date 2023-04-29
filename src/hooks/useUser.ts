import { useEffect, useState } from "react";
import { UserDTO } from "../types";

export default function useUser() {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const userOptional = localStorage.getItem("user");

    if (userOptional) {
      const user = JSON.parse(userOptional) as UserDTO;
      setUser(user);
    }
  }, []);

  return {
    user,
  };
}
