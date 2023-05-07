import { Route, createBrowserRouter, createRoutesFromElements, useNavigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NotFoundView from "./pages/NotFoundView";
import LoginView from "./pages/LoginView";
import DashboardPage from "./pages/DashboardPage";
import AddWorkEntryPage from "./pages/AddWorkEntryPage";
import SearchAllEntriesPage from "./pages/SearchAllEntriesPage";
import UsersStatsPage from "./pages/UsersStatsPage";
import ProtectedRoutes from "./service/routes/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path='/' element={<LoginView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='*' element={<NotFoundView />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/add-entry' element={<AddWorkEntryPage />} />
        <Route path='/search' element={<SearchAllEntriesPage />} />
        <Route path='/stats' element={<UsersStatsPage />} />
      </Route>
    </Route>
  )
);

export default router;
