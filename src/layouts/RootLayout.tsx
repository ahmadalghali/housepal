import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BottomNavigationBar from "../components/BottomNavigationBar";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
export default function RootLayout() {
  const { user } = useAuth();
  return (
    <MantineProvider>
      <Notifications />
      <Navbar />

      <main className='px-5 pt-5 mt-16 max-w-sm mx-auto '>
        <Outlet />
      </main>
      {user && <BottomNavigationBar />}

      {/* <div className='flex  max-h-screen fixed overflow-hidden w-full min-h-full'>
        <main className='px-8 max-w-md flex-grow pb-20 mx-auto overflow-y-auto overscroll-none'>
          <Outlet />
        </main>
        <BottomNavigationBar />
      </div> */}

      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </MantineProvider>
  );
}
