import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { WorkEntryDTO } from "../types";
import WorkEntry from "./WorkEntry";

type Props = {
  title: string;
  entries: WorkEntryDTO[];
  className?: string;
};

function EntriesContainer({ title, entries, className }: Props) {
  const navigate = useNavigate();
  return (
    <div className={`${className}`}>
      <div className='flex justify-between items-start'>
        <h2 className='text-2xl font-medium '>{title}</h2>
        <button
          onClick={() => navigate("/search")}
          className='bg-slate-200 rounded-full h-10 w-10 flex justify-center items-center'
        >
          <IconSearch />
        </button>
      </div>

      <div className=' rounded-lg flex flex-col space-y-4  h-full flex-1 overflow-y-scroll overscroll-y-contain mt-3 pb-5 shadow-inner'>
        {entries.length ? (
          entries.map((entry) => (
            <>
              <WorkEntry entry={entry} />
            </>
          ))
        ) : (
          <p className='text-center mt-20 text-lg'>You have no recent entries.</p>
        )}
      </div>
    </div>
  );
}

export default EntriesContainer;
