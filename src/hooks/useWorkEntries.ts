import { useContext } from "react";
import { WorkEntriesContext } from "../context/WorkEntryContext";

function useWorkEntries() {
  return useContext(WorkEntriesContext);
}

export default useWorkEntries;
