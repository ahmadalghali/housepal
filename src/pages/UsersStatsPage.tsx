import { useEffect, useState } from "react";
import { MinutesWorkedStatsDataDTO } from "../types";
import { getAllUsersStats } from "../service/work-entry.service";
import UserStatsView from "../components/UserStatsView";

function UsersStatsPage() {
  const [usersStats, setUsersStats] = useState<MinutesWorkedStatsDataDTO[]>();

  useEffect(() => {
    getAllUsersStats().then(setUsersStats);
  }, []);

  return (
    <>
      <h1 className='text-3xl font-semibold mb-10'>Statistics</h1>
      <div className='space-y-6'>
        {usersStats &&
          usersStats.map((userStats) => (
            <div className='' key={userStats.user.id}>
              <p className='font-medium text-2xl mb-2'>{userStats.user.firstname}</p>
              <UserStatsView stats={userStats} compact />
            </div>
          ))}
      </div>
    </>
  );
}

export default UsersStatsPage;
