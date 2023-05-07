import { ReactNode, createContext, useEffect, useState } from "react";
import { WorkEntryDTO } from "../types";

type Props = {
  children?: ReactNode;
};

type IWorkEntriesContext = {
  recentEntries: WorkEntryDTO[];
  setRecentEntries: React.Dispatch<React.SetStateAction<WorkEntryDTO[]>>;
  allEntries: WorkEntryDTO[];
  setAllEntries: React.Dispatch<React.SetStateAction<WorkEntryDTO[]>>;
  getEntriesByUserId: (userId: number) => Promise<WorkEntryDTO[]>;
};
const initialValue: IWorkEntriesContext = {
  recentEntries: [],
  setRecentEntries: () => {},
  allEntries: [],
  setAllEntries: () => {},
  getEntriesByUserId: (userId: number) => Promise.resolve([]),
};

const WorkEntriesContext = createContext<IWorkEntriesContext>(initialValue);

const WorkEntriesProvider = ({ children }: Props) => {
  const [recentEntries, setRecentEntries] = useState<WorkEntryDTO[]>([]);
  const [allEntries, setAllEntries] = useState<WorkEntryDTO[]>([]);

  useEffect(() => {}, [recentEntries]);

  const getEntriesByUserId = (userId: number): Promise<WorkEntryDTO[]> => {
    return new Promise((resolve) => {
      const myEntry = allEntries.filter((entry) => entry.user.id === userId);
      resolve(myEntry);
    });
  };

  return (
    <WorkEntriesContext.Provider
      value={{ recentEntries, setRecentEntries, allEntries, setAllEntries, getEntriesByUserId }}
    >
      {children}
    </WorkEntriesContext.Provider>
  );
};

export { WorkEntriesContext, WorkEntriesProvider };
