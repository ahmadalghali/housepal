import useAuth from "../hooks/useAuth";
import { MinutesWorkedStatsDataDTO } from "../types";
import { useEffect, useState } from "react";
import { getRecentEntries, getUserStats } from "../service/work-entry.service";
import UserStatsView from "../components/UserStatsView";
import EntriesContainer from "../components/EntriesContainer";
import useWorkEntries from "../hooks/useWorkEntries";

export default function DashboardPage() {
  const { user } = useAuth();

  const [userStats, setUserStats] = useState<MinutesWorkedStatsDataDTO>();

  const { recentEntries, setRecentEntries } = useWorkEntries();

  useEffect(() => {
    Promise.all([getRecentEntries(), getUserStats(user!.id)]).then(([recentEntries, userStats]) => {
      setRecentEntries(recentEntries);
      setUserStats(userStats);
    });
  }, []);

  return (
    <>
      <h1 className='text-3xl font-semibold'>Hello, {user?.firstname}.</h1>
      <p className='mt-5 mb-3 font-medium text-gray-500 text-lg'>Here's your breakdown</p>
      {userStats && <UserStatsView stats={userStats} compact />}
      {recentEntries && <EntriesContainer entries={recentEntries} title='Recent entries' className='mt-10 h-80' />}
      {/* <EntriesContainer entries={myEntries} title='My entries' className='mt-10' /> */}
    </>
  );
}
