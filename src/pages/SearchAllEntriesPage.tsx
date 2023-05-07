import { useEffect, useState } from "react";
import { getAllEntries } from "../service/work-entry.service";
import EntriesList from "../components/EntriesList";
import useAuth from "../hooks/useAuth";
import useWorkEntries from "../hooks/useWorkEntries";
import { IconX } from "@tabler/icons-react";

function SearchAllEntriesPage() {
  const [onlyMe, setOnlyMe] = useState(false);
  const { user } = useAuth();

  const { allEntries, setAllEntries, getEntriesByUserId } = useWorkEntries();

  useEffect(() => {
    if (onlyMe) {
      getEntriesByUserId(user!.id).then(setAllEntries);
    } else {
      getAllEntries().then(setAllEntries);
    }
  }, [onlyMe]);
  return (
    <div className=''>
      {/* <h2 className='text-2xl font-medium '>All entries</h2> */}
      {/* <div className='flex mt-4 space-x-2'> */}
      {/* <div className='bg-gray-200 px-3 py-1 rounded-full'>Sort</div> */}
      {/* <Select
          data={[
            { value: "DATE_NEWEST", label: "Date newest" },
            { value: "DATE_OLDEST", label: "Date oldest" },
          ]}
        /> */}
      {/* <select name='sort-date' id='sort-date' className='bg-gray-200  rounded-full'>
          <option value=''>Sort</option>
          <option value=''>Date newest</option>
          <option value=''>Date oldest</option>
        </select> */}
      {/* <div className='bg-gray-200 px-3 py-1 rounded-full'>Filter</div> */}
      {/* </div> */}

      <div className=''>
        <h2 className='text-2xl font-medium '>All entries</h2>

        <div className='flex w-full justify-end mb-5'>
          {onlyMe ? (
            <div className='flex justify-between items-center bg-gray-900 text-white px-3 py-1 rounded-full space-x-2 cursor-pointer'>
              <button className='' onClick={() => setOnlyMe((preValue) => !preValue)}>
                Only me
              </button>
              <IconX size={"1.25rem"} />
            </div>
          ) : (
            <button className='bg-gray-200 px-3 py-1 rounded-full' onClick={() => setOnlyMe((preValue) => !preValue)}>
              Only me
            </button>
          )}
        </div>
      </div>
      {allEntries && <EntriesList entries={allEntries} />}
    </div>
  );
}

export default SearchAllEntriesPage;
