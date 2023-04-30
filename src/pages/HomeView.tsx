import { useNavigate } from "react-router-dom";
import { logout } from "../service/auth.service";
import { IconLogout, IconPlus, IconSearch } from "@tabler/icons-react";
import useUser from "../hooks/useUser";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WorkEntry from "../components/WorkEntry";

export default function HomeView() {
  const navigate = useNavigate();

  const [opened, { open: displayLogoutModal, close: dismissLogoutModal }] = useDisclosure(false);

  return (
    <>
      <LogoutModal onClose={dismissLogoutModal} opened={opened} />

      <div className=''>
        <Header displayLogoutModal={displayLogoutModal} />

        <div className='grid grid-cols-2 gap-4 mt-10'>
          <div className='bg-slate-200 h-20 w-20 rounded-3xl p-3'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>20</span> mins
              </p>
              <p className='self-end text-xl'>Today</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-3xl p-3'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>145</span> mins
              </p>
              <p className='self-end text-xl'>This week</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-3xl p-3'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>20</span> mins
              </p>
              <p className='self-end text-xl'>This month</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-3xl p-3'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>33.5</span> Hours
              </p>
              <p className='self-end text-xl'>All time</p>
            </div>
          </div>
        </div>

        {/* <AddWorkEntryButton onClick={() => navigate("/add-entry")} /> */}

        <div className='mt-20 '>
          <div className='flex justify-between items-start '>
            <h2 className='text-3xl font-medium '>Recent entries</h2>
            <button
              onClick={() => navigate("/search")}
              className='bg-gray-200 rounded-full h-10 w-10 flex justify-center items-center'
            >
              <IconSearch />
            </button>
          </div>

          <div className='flex flex-col space-y-4 mt-5'>
            <WorkEntry />
            <WorkEntry />
            <WorkEntry />
            <WorkEntry />
            <WorkEntry />
            <WorkEntry />
            <WorkEntry />
          </div>
        </div>
      </div>
    </>
  );
}

function Header({ displayLogoutModal }: { displayLogoutModal: () => void }) {
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center'>
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

function AddWorkEntryButton({ onClick }: { onClick: () => void }) {
  return (
    <div className='flex justify-center mt-10' onClick={onClick}>
      <IconPlus className='rounded-full h-16 w-16 p-2 stroke-2 bg-brand-400 cursor-pointer' />
    </div>
  );
}
