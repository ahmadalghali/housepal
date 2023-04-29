import { useNavigate } from "react-router-dom";
import { logout } from "../service/auth.service";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { IconArrowLeft, IconDoorExit, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddWorkEntryRequestDTO, AddWorkEntryResponseDTO } from "../types";
import { submitWorkEntry } from "../service/work-entry.service";
import useUser from "../hooks/useUser";
import { Checkbox, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { toast } from "react-toastify";

export default function AddWorkEntryPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [minsWorked, setMinsWorked] = useState(0);
  const navigate = useNavigate();

  const [opened, { open: displayLogoutModal, close: dismissLogoutModal }] = useDisclosure(false);
  const [isToday, setIsToday] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    if (isToday) {
      setDate(new Date());
    }
  }, [isToday]);
  type Inputs = {
    minutesWorked: number;
    dateOfWork: Date;
    notes?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ dateOfWork, minutesWorked, notes }: Inputs) => {
    const addWorkEntryRequestDTO: AddWorkEntryRequestDTO = {
      dateOfWork,
      minutesWorked,
      userId: user!.id,
      notes,
    };

    submitWorkEntry(addWorkEntryRequestDTO).then((res) => handleAddWorkEntryResponse(res));
  };

  const handleAddWorkEntryResponse = ({ message, workEntry }: AddWorkEntryResponseDTO) => {
    if (message === "Added") {
      toast.success("Entry added successfully!");
    }
  };

  return (
    <>
      <LogoutModal onClose={dismissLogoutModal} opened={opened} />

      <div className='h-screen grid  pt-6'>
        <div className='flex'>
          <IconArrowLeft className='h-14 w-14' onClick={() => navigate("/")} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=''>
            <h2 className='text-2xl font-semibold'>How much did you work?</h2>
            <div className='flex justify-center items-baseline space-x-4'>
              <input
                type='number'
                min={0}
                value={minsWorked}
                onChange={(e) => setMinsWorked(e.target.value)}
                className='input mt-5 w-full text-center'
                {...register("minsWorked", {
                  required: "Required",
                })}
              />
              <p className='text-lg font-semibold'>mins</p>
            </div>
          </div>

          <div className='mt-10'>
            <h2 className='text-2xl font-semibold'>When?</h2>
            <div className='flex justify-between space-x-10 items-center mt-5'>
              <DatePickerInput
                placeholder='Pick date'
                value={date}
                onChange={(_date) => setDate(_date)}
                styles={{ input: { border: "none" } }}
                className='rounded-full w-full flex justify-center px-4 py-2 font-bold input-bg'
                disabled={isToday}
                // {...register("dateOfWork", {
                //   required: "Required",
                // })}
              />

              <Checkbox
                label='Today'
                styles={{ label: { fontSize: "1.2rem", fontWeight: "600" } }}
                checked={isToday}
                onChange={() => setIsToday(!isToday)}
              />
              {/* <label htmlFor='today'>Today</label>
              <input id='today' name='today' type='checkbox' /> */}
            </div>
          </div>

          <div className='mt-10'>
            <h2 className='text-2xl font-semibold'>
              Notes <span className='text-sm text-gray-500'>(Optional)</span>
            </h2>
            <div className='flex justify-center mt-5'>
              <textarea
                className='w-full rounded-2xl resize-none h-40 shadow-md px-5 py-4 outline-primary-400 outline-offset-3'
                placeholder='Write something...'
              ></textarea>
            </div>
          </div>

          <button className='btn-primary w-full mt-20' type='submit'>
            submit
          </button>
        </form>

        {/* <button onClick={handleLogout} className='btn-secondary'>
          Logout
        </button> */}
      </div>
    </>
  );
}

function Header({ displayLogoutModal }: { displayLogoutModal: () => void }) {
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center mt-10'>
      <h1 className='text-4xl font-bold'>Hello, {user?.firstname}.</h1>
      <IconLogout className='h-10 w-10 cursor-pointer' onClick={displayLogoutModal} />
    </div>
  );
}

function LogoutModal({ onClose, opened }: { onClose: () => void; opened: boolean }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Modal opened={opened} title='Are you sure you want to logout?' onClose={onClose} centered>
      <div className='flex justify-around mt-5'>
        <button onClick={onClose} className='btn-primary text-sm shadow-sm w-32'>
          Cancel
        </button>
        <button onClick={handleLogout} className='btn bg-gray-300 text-sm shadow-sm w-32'>
          Logout
        </button>
      </div>
    </Modal>
  );
}
