import { AppShell, Avatar, Header, MantineProvider } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function RootLayout() {
  return (
    <MantineProvider>
      <Notifications />
      <main className='px-8 max-w-md  mx-auto '>
        <Outlet />
      </main>
      <ToastContainer
        position='top-right'
        autoClose={3000}
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
