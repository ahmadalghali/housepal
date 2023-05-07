import { IconSearch } from "@tabler/icons-react";

export default function NotFoundView() {
  return (
    <div>
      <h1 className='font-medium text-3xl'>Page not found</h1>

      <p className='mt-10 text-lg'>Uh oh, looks like this page does not exist.</p>

      <div className='flex justify-center mt-10'>
        <IconSearch size='5rem' />
      </div>
    </div>
  );
}
