import { WorkEntryDTO } from "../types";
import WorkEntry from "../components/WorkEntry";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { getRecentEntries } from "../service/work-entry.service";
import { Select } from "@mantine/core";

function SearchAllEntriesPage() {
  // const { id } = useParams();

  const [entries, setEntries] = useState<WorkEntryDTO[]>([]);

  useEffect(() => {
    getRecentEntries().then(setEntries);
  }, []);
  return (
    <div>
      <h2 className='text-2xl font-medium '>All entries</h2>

      <div className='flex mt-4 space-x-2'>
        {/* <div className='bg-gray-200 px-3 py-1 rounded-full'>Sort</div> */}
        <Select
          data={[
            { value: "DATE_NEWEST", label: "Date newest" },
            { value: "DATE_OLDEST", label: "Date oldest" },
          ]}
        />
        {/* <select name='sort-date' id='sort-date' className='bg-gray-200  rounded-full'>
          <option value=''>Sort</option>
          <option value=''>Date newest</option>
          <option value=''>Date oldest</option>
        </select> */}
        <div className='bg-gray-200 px-3 py-1 rounded-full'>Filter</div>
        <div className='bg-gray-200 px-3 py-1 rounded-full'>Only me</div>
      </div>

      <div className='flex flex-col space-y-4 mt-5'>
        {entries &&
          entries.map((entry) => (
            <>
              <WorkEntry entry={entry} />
            </>
          ))}
      </div>
    </div>
  );
}

export default SearchAllEntriesPage;
