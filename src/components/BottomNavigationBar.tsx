import { IconChartBar, IconPlus, IconSearch } from "@tabler/icons-react";
export default function BottomNavigationBar() {
  return (
    <div className='h-16 bg-accent-900 text-white fixed bottom-0 left-0 right-0'>
      <div className='flex justify-around h-full items-center w-full text-3xl'>
        <IconSearch className='h-8 w-8 cursor-pointer' />
        <IconPlus className='h-12 w-12 bg-brand cursor-pointer p-1 text-white rounded-full' />
        <IconChartBar className='h-8 w-8 cursor-pointer' />
      </div>
    </div>
  );
}
