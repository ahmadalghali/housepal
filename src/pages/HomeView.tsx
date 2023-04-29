import { useNavigate } from "react-router-dom";
import { logout } from "../service/auth.service";
import { IconLogout, IconPlus } from "@tabler/icons-react";
import useUser from "../hooks/useUser";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function HomeView() {
  const navigate = useNavigate();

  const [opened, { open: displayLogoutModal, close: dismissLogoutModal }] = useDisclosure(false);

  return (
    <>
      <LogoutModal onClose={dismissLogoutModal} opened={opened} />

      <div className='h-screen '>
        <Header displayLogoutModal={displayLogoutModal} />

        <div className='flex justify-center mt-20' onClick={() => navigate("/add-entry")}>
          <IconPlus className='rounded-full h-16 w-16 p-2 stroke-2 bg-brand-400 cursor-pointer' />
        </div>
      </div>
    </>
  );
}

function Header({ displayLogoutModal }: { displayLogoutModal: () => void }) {
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center mt-10'>
      <h1 className='text-4xl font-bold'>Hello, {user?.firstname}.</h1>
      <IconLogout className='h-10 w-10 cursor-pointer' onClick={displayLogoutModal} />
    </div>
  );
}

function LogoutModal({ onClose, opened }: { onClose: () => void; opened: boolean }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Modal opened={opened} title='Are you sure you want to logout?' onClose={onClose} centered>
      <div className='flex justify-around mt-5'>
        <button onClick={onClose} className='btn-primary text-sm shadow-sm w-32'>
          Cancel
        </button>
        <button onClick={handleLogout} className='btn bg-gray-300 text-sm shadow-sm w-32'>
          Logout
        </button>
      </div>
    </Modal>
  );
}
