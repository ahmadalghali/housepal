import { DashboardStats, MinutesWorkedStatsDataDTO } from "../types";
import { formatMinutes } from "../util/minutesFormatter";

export default function UserStatsView({
  stats,
  compact = true,
}: {
  stats: MinutesWorkedStatsDataDTO;
  compact?: boolean;
}) {
  const mapUserStatsDTOtoDashboardStats = (userStatsDTO: MinutesWorkedStatsDataDTO): DashboardStats => {
    const { minsWorkedAllTime, minsWorkedMonth, minsWorkedToday } = userStatsDTO;

    const today = formatMinutes(minsWorkedToday);
    const month = formatMinutes(minsWorkedMonth);
    const allTime = formatMinutes(minsWorkedAllTime);

    return { allTime, month, today };
  };

  const { allTime, month, today } = mapUserStatsDTOtoDashboardStats(stats);
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
