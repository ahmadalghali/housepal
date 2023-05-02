import { useNavigate } from "react-router-dom";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import useUser from "../hooks/useUser";
import WorkEntry from "../components/WorkEntry";
import { DashboardStats, MinutesWorkedStatsDataDTO, WorkEntryDTO } from "../types";
import { useEffect, useState } from "react";
import { getRecentEntries, getUserStats } from "../service/work-entry.service";
import { formatMinutesToHours } from "../util/minutesFormatter";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [recentEntries, setRecentEntries] = useState<WorkEntryDTO[]>([]);
  const [userStats, setUserStats] = useState<DashboardStats>();

  useEffect(() => {
    getRecentEntries().then(setRecentEntries);
    getUserStats(user!.id).then(mapUserStatsDTOtoDashboardStats).then(setUserStats);
  }, []);

  const mapUserStatsDTOtoDashboardStats = (userStatsDTO: MinutesWorkedStatsDataDTO): DashboardStats => {
    const { minsWorkedAllTime, minsWorkedMonth, minsWorkedToday } = userStatsDTO;

    const today = formatMinutesToHours(minsWorkedToday);
    const month = formatMinutesToHours(minsWorkedMonth);
    const allTime = formatMinutesToHours(minsWorkedAllTime);

    return { allTime, month, today };
  };
  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-semibold'>Hello, {user?.firstname}.</h1>
        <p className='mt-5 mb-3 font-medium text-gray-500 text-lg'>Here's your breakdown</p>
        {userStats && <UserStatsView stats={userStats} compact />}

        <div className='mt-10 '>
          <div className='flex justify-between items-start'>
            <h2 className='text-3xl font-medium '>Recent entries</h2>
            <button
              onClick={() => navigate("/search")}
              className='bg-slate-200 rounded-full h-10 w-10 flex justify-center items-center'
            >
              <IconSearch />
            </button>
          </div>

          <div className='flex flex-col space-y-4  h-72 overflow-y-scroll overscroll-y-contain mt-3 pb-5 shadow-inner'>
            {recentEntries.length ? (
              recentEntries.map((entry) => <WorkEntry entry={entry} />)
            ) : (
              <p className='text-center mt-20 text-lg'>You have no recent entries.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function UserStatsView({ stats, compact }: { stats: DashboardStats; compact?: boolean }) {
  const { allTime, month, today } = stats;
  return (
    <>
      {compact ? (
        <div className='grid grid-cols-3 gap-x-3'>
          <div className='bg-slate-200 rounded-xl py-3 h-24'>
            <div className='flex flex-col h-full justify-between items-center text-center'>
              <p className='text-xl font-semibold'>{today}</p>
              <p className='font-semibold text-gray-500'>Today</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-xl py-3 h-24'>
            <div className='flex flex-col h-full justify-between items-center text-center'>
              <p className='text-xl font-semibold'>{month}</p>
              <p className='font-semibold text-gray-500'>This month</p>
            </div>
          </div>
          <div className='bg-slate-200 rounded-xl py-3 h-24'>
            <div className='flex flex-col h-full justify-between items-center text-center'>
              <p className='text-xl font-semibold'>{allTime}</p>
              <p className='font-semibold text-gray-500'>All time</p>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
