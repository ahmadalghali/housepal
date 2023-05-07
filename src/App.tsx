import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { WorkEntriesProvider } from "./context/WorkEntryContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WorkEntriesProvider>
          <RouterProvider router={router} />
        </WorkEntriesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
