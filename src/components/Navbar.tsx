import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function LogoutModal({ close, opened }: { close: () => void; opened: boolean }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

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
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [opened, { open: displayLogoutModal, close: dismissLogoutModal }] = useDisclosure(false);

  const navigate = useNavigate();

  return (
    <>
      <LogoutModal close={dismissLogoutModal} opened={opened} />

      <nav
        className={
          "h-16 bg-brand flex justify-between items-center text-white px-6 lg:px-20 fixed top-0 left-0 right-0 "
        }
      >
        <p className='text-3xl font-bold cursor-pointer' onClick={() => navigate("/dashboard")}>
          HousePal
        </p>
        {user && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.8 }}
            className='text-sm font-medium shadow-2xl cursor-pointer bg-accent-800 px-4 py-2 rounded-full'
            onClick={() => displayLogoutModal()}
          >
            Logout
          </motion.button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
