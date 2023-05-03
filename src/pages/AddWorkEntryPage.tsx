import { useNavigate } from "react-router-dom";
import { logout } from "../service/auth.service";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { IconArrowLeft, IconLogout } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddWorkEntryRequestDTO, AddWorkEntryResponseDTO } from "../types";
import { submitWorkEntry } from "../service/work-entry.service";
import useUser from "../hooks/useUser";
import { Checkbox, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
      navigate("/dashboard");
      toast.success("Entry added successfully!");
    } else {
      toast.error("Failed to add entry, something went wrong, please try again later.");
    }
  };

  return (
    <div>
      {/* <IconArrowLeft className='h-10 w-10' onClick={() => navigate("/dashboard")} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <h2 className='text-2xl font-semibold'>How much did you work?</h2>
          <div className='flex justify-center items-baseline space-x-4'>
            <input
              type='number'
              className='input mt-5 w-full text-center'
              {...register("minutesWorked", {
                required: "Required",
                min: 0,
                value: 0,
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
    </div>
  );
}
