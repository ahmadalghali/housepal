import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import NotFoundView from "./pages/NotFoundView";
import LoginView from "./pages/LoginView";
import HomeView from "./pages/HomeView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path='' element={<HomeView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='*' element={<NotFoundView />} />
    </Route>
  )
);

export default router;
