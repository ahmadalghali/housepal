import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../types";

type Props = {
  children?: ReactNode;
};

type IAuthContext = { user: UserDTO | null; setUser: (newUser: UserDTO | null) => void };
const initialValue: IAuthContext = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)

  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
