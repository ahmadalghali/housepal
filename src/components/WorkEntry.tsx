import { IconNotes, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import useMinsFormatter from "../hooks/useMinsFormatter";
import { WorkEntryDTO } from "../types";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { ReactNode } from "react";
import { deleteEntry } from "../service/work-entry.service";
import { toast } from "react-toastify";

type Props = {
  entry: WorkEntryDTO;
};

function WorkEntry({ entry }: Props) {
  const { dateOfWork, minutesWorked, user, notes } = entry;
  const [{ timeAndFormatString }] = useMinsFormatter(minutesWorked);
  const dateOfWork_dayMonthYearFormat = dateOfWork.toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const [viewEntryModalOpened, { open: openViewEntryModal, close: closeViewEntryModal }] = useDisclosure(false);

  return (
    <>
      <ViewEntryModal
        entry={entry}
        opened={viewEntryModalOpened}
        close={closeViewEntryModal}
        open={openViewEntryModal}
      />

      <div className='bg-slate-200 rounded-xl p-3 flex justify-around cursor-pointer' onClick={openViewEntryModal}>
        <p>{user.firstname}</p>
        <p>{timeAndFormatString}</p>
        <p>{dateOfWork_dayMonthYearFormat}</p>
        <IconNotes visibility={notes ? "visible" : "hidden"} />
      </div>
    </>
  );
}

function ViewEntryModal({
  entry,
  opened,
  close,
  open,
}: {
  entry: WorkEntryDTO;
  close: () => void;
  opened: boolean;
  open: () => void;
}) {
  const { id, dateOfWork, minutesWorked, user, notes } = entry;

  const [deleteDialogOpened, { open: openDeleteDialog, close: closeDeleteDialog }] = useDisclosure(false);

  const [{ timeAndFormatString }] = useMinsFormatter(minutesWorked);

  const dateMonth = dateOfWork.toLocaleDateString("en-GB", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <DeleteEntryDialog
        title={
          <p className='leading-8 font-medium break-words'>
            Are you sure you want to delete
            <span className='font-semibold bg-gray-300 rounded-full px-3 mx-1  inline-block'>
              {" "}
              {`${timeAndFormatString}`}
            </span>{" "}
            on <span className='font-semibold bg-gray-300 rounded-full px-3 mx-1 inline-block'>{`${dateMonth}`}</span>?
          </p>
        }
        close={closeDeleteDialog}
        opened={deleteDialogOpened}
        openPreviousDialog={open}
        entryId={entry.id}
      />
      <Modal
        opened={opened}
        onClose={close}
        title={`${user.firstname} - ${timeAndFormatString} on ${dateMonth}`}
        centered
      >
        <p className='bg-slate-100 p-4 rounded-md h-40 overflow-y-scroll'>{notes}</p>
        <div className='flex justify-end space-x-3 mt-5'>
          <IconPencil fill='black' size='40' className='bg-slate-100 rounded-full p-2 cursor-pointer' />
          <IconTrashFilled
            style={{ color: "#ed4e4e" }}
            size='40'
            className='bg-slate-100 rounded-full p-2 cursor-pointer'
            onClick={() => {
              openDeleteDialog();
              close();
            }}
          />
        </div>
      </Modal>
    </>
  );
}

function DeleteEntryDialog({
  title,
  opened,
  close,
  openPreviousDialog,
  entryId,
}: {
  title: ReactNode | string;
  close: () => void;
  opened: boolean;
  openPreviousDialog: () => void;
  entryId: number;
}) {
  const handleDeleteEntry = () => {
    deleteEntry(entryId).then((deleted) => {
      if (deleted) {
        toast.success("Entry deleted");
      } else {
        toast.error("Failed to delete entry, please try again.");
      }
      close();
    });
  };
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        openPreviousDialog();
      }}
      title={title}
      withCloseButton={false}
      centered
    >
      <div className='flex justify-around mt-5'>
        <button
          onClick={() => {
            close();
            openPreviousDialog();
          }}
          className='btn bg-gray-300 text-sm shadow-sm w-32'
        >
          Cancel
        </button>
        <button onClick={handleDeleteEntry} className='btn bg-rose-700 text-white text-sm shadow-sm w-32'>
          Delete
        </button>
      </div>
    </Modal>
  );
}
export default WorkEntry;
