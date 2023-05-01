import { useNavigate } from "react-router-dom";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import useUser from "../hooks/useUser";
import WorkEntry from "../components/WorkEntry";
import useMinsFormatter from "../hooks/useMinsFormatter";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [time, format, { formattedStr }] = useMinsFormatter(799);

  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-semibold'>Hello, {user?.firstname}.</h1>

        <div className='grid grid-cols-2 gap-y-4 gap-x-6 mt-10'>
          <div className='bg-slate-200 rounded-xl p-3 h-24'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>20</span>
                <span className='font-medium text-xl '> mins</span>
              </p>
              <p className='self-end font-medium text-gray-500'>Today</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-xl p-3 h-24'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>2.3</span>
                <span className='font-medium text-xl '> Hrs</span>
              </p>
              <p className='self-end font-medium text-gray-500'>This week</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-xl p-3 h-24'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>4.8</span>
                <span className='font-medium text-xl '> Hrs</span>
              </p>
              <p className='self-end font-medium text-gray-500'>This month</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-xl p-3 h-24'>
            <div className='flex flex-col h-full justify-between'>
              <p>
                <span className='text-3xl font-semibold'>33.5</span>
                <span className='font-medium text-xl '> Hrs</span>
              </p>
              <p className='self-end font-medium text-gray-500'>All time</p>
            </div>
          </div>
        </div>

        {/* <AddWorkEntryButton onClick={() => navigate("/add-entry")} /> */}

        <div className='mt-10 '>
          <div className='flex justify-between items-start'>
            <h2 className='text-3xl font-medium '>Recent entries</h2>
            <button
              onClick={() => navigate("/search")}
              className='bg-gray-200 rounded-full h-10 w-10 flex justify-center items-center'
            >
              <IconSearch />
            </button>
          </div>

          <div className='flex flex-col space-y-4  h-72 overflow-y-scroll overscroll-y-contain mt-3 pb-5 shadow-inner'>
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

function AddWorkEntryButton({ onClick }: { onClick: () => void }) {
  return (
    <div className='flex justify-center mt-10' onClick={onClick}>
      <IconPlus className='rounded-full h-16 w-16 p-2 stroke-2 bg-brand-400 cursor-pointer' />
    </div>
  );
}
