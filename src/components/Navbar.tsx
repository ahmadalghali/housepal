import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { logout } from "../service/auth.service";
type Props = {
  className?: string;
};

export default function Navbar({ className }: Props) {
  const { user } = useUser();

  const [isLoggedIn, setIsLoggedIn] = useState(user != null);
  const [opened, { open: displayLogoutModal, close: dismissLogoutModal }] = useDisclosure(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <>
      <LogoutModal close={dismissLogoutModal} opened={opened} />

      <nav
        className={
          "h-16 bg-brand flex justify-between items-center text-white px-6 lg:px-20 fixed top-0 left-0 right-0 " +
          className
        }
      >
        <p className='text-3xl font-bold cursor-pointer' onClick={() => navigate("/dashboard")}>
          H C L
        </p>
        <div className='flex space-x-5 items-center'>
          {isLoggedIn ? (
            <button
              className='text-sm font-medium shadow-2xl cursor-pointer bg-accent-800 px-4 py-2 rounded-full'
              onClick={() => displayLogoutModal()}
            >
              Logout
            </button>
          ) : (
            <button
              className='text-sm font-medium shadow-2xl cursor-pointer bg-accent-800 px-4 py-2 rounded-full'
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

function LogoutModal({ close, opened }: { close: () => void; opened: boolean }) {
  const navigate = useNavigate();
  // const { handleLogout } = useLogout();
  const handleLogout = () => {
    logout();
    navigate("/login");
    close();
  };

  return (
    <Modal opened={opened} title='Are you sure you want to logout?' onClose={close} centered>
      <div className='flex justify-around mt-5'>
        <button onClick={close} className='btn-primary text-sm shadow-sm w-32'>
          Cancel
        </button>
        <button onClick={() => handleLogout()} className='btn bg-gray-300 text-sm shadow-sm w-32'>
          Logout
        </button>
      </div>
    </Modal>
  );
}
