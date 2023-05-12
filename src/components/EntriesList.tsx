import { AnimatePresence, motion } from "framer-motion";
import WorkEntry from "./WorkEntry";
import { WorkEntryDTO } from "../types";

type Props = {
  entries: WorkEntryDTO[];
};

function EntriesList({ entries }: Props) {
  return (
    <motion.ul className='rounded-lg h-96 overflow-y-scroll overscroll-y-contain overscroll-x-none overflow-x-visible space-y-4 pb-5'>
      <AnimatePresence>
        {entries.map((entry, _) => (
          <motion.li
            // initial={{ scale: 0.01, opacity: 0.2, y: 200 }}
            // animate={{ scale: 1, opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay: (i + 1) * 0.2 }}
            // exit={{ opacity: 0 }}
            layoutId={entry.id + ""}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            key={entry.id}
          >
            <WorkEntry key={entry.id} entry={entry} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default EntriesList;
