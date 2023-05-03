import useUser from "../hooks/useUser";
import { MinutesWorkedStatsDataDTO, WorkEntryDTO } from "../types";
import { useEffect, useState } from "react";
import { getRecentEntries, getUserStats } from "../service/work-entry.service";
import UserStatsView from "../components/UserStatsView";
import EntriesContainer from "../components/EntriesContainer";

export default function DashboardPage() {
  const { user } = useUser();

  const [recentEntries, setRecentEntries] = useState<WorkEntryDTO[]>([]);
  // const [myEntries, setMyEntries] = useState<WorkEntryDTO[]>([]);
  const [userStats, setUserStats] = useState<MinutesWorkedStatsDataDTO>();

  useEffect(() => {
    getRecentEntries().then(setRecentEntries);
    // getMyEntries(user!.id).then(setMyEntries);
    getUserStats(user!.id).then(setUserStats);
  }, []);

  return (
    <>
      <h1 className='text-3xl font-semibold'>Hello, {user?.firstname}.</h1>
      <p className='mt-5 mb-3 font-medium text-gray-500 text-lg'>Here's your breakdown</p>
      {userStats && <UserStatsView stats={userStats} compact />}

      <EntriesContainer entries={recentEntries} title='Recent entries' className='mt-10 h-80' />

      {/* <EntriesContainer entries={myEntries} title='My entries' className='mt-10' /> */}
    </>
  );
}
