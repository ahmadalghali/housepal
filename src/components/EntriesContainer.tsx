import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { WorkEntryDTO } from "../types";
import EntriesList from "./EntriesList";
type Props = {
  title: string;
  entries: WorkEntryDTO[];
  className?: string;
};

function EntriesContainer({ title, entries, className }: Props) {
  const navigate = useNavigate();
  return (
    <div className={`${className}`}>
      <div className='flex justify-between items-start mb-5'>
        <h2 className='text-2xl font-medium '>{title}</h2>
        <button
          onClick={() => navigate("/search")}
          className='bg-slate-200 rounded-full h-10 w-10 flex justify-center items-center'
        >
          <IconSearch />
        </button>
      </div>

      {entries.length ? (
        <EntriesList entries={entries} />
      ) : (
        <p className='text-center mt-20 text-lg'>You have no recent entries.</p>
      )}
    </div>
  );
}

export default EntriesContainer;
