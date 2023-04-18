"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  return (
    <div className="overflow-hidden rounded text-left text-lg py-3 m-auto flex justify-center">
      <input 
        className="rounded text-lg mr-3 p-2 w-[450px] text-black" 
        type="text" 
        placeholder="State, City, or Town" 
        value={location}
        onChange={(e) =>setLocation(e.target.value)}
      />
      <button className="rounded bg-red-600 px-9 py-2" onClick={() => {
        if (location === 'banana') return;
        router.push("/search");
      }}>
        Let's go
      </button>
    </div>
  )
}

export default SearchBar;