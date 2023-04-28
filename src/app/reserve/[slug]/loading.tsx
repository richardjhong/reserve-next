"use client";

import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
  return (
    <main>
      <div className="border-t h-screen text-black">
        <div className="py-9 w-3/5 m-auto">
          <Skeleton variant="rectangular" width={660} height={450} />
        </div> 
      </div>
    </main>
  )
}

export default Loading;