import { IconChartBar, IconHome2, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
export default function BottomNavigationBar() {
  const navigate = useNavigate();
  return (
    <div className='h-16 bg-accent-900 text-white fixed bottom-0 left-0 right-0'>
      <div className='flex justify-around h-full items-center w-full text-3xl'>
        <IconHome2 className='h-8 w-8 cursor-pointer' onClick={() => navigate("/dashboard")} />
        <IconPlus
          className='h-12 w-12 bg-brand cursor-pointer p-1 text-white rounded-full'
          onClick={() => navigate("/add-entry")}
        />
        <IconChartBar className='h-8 w-8 cursor-pointer' onClick={() => navigate("/stats")} />
      </div>
    </div>
  );
}
