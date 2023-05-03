import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }: { element: any }): React.ReactElement | null {
  const user = localStorage.getItem("user");

  return user ? <Route {...rest} element={<Component />} /> : <Navigate to='/login' replace />;
}
