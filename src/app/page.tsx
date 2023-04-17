"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  return (
    <main className="bg-gray-200 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
      {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <a href="" className="font-bold text-gray-700 text-2xl">
            Open Table
          </a>
          <div>
            <div className="flex">
              <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Sign In</button>
              <button className="text-gray-700 border p-1 px-4 rounded">Sign Up</button>
            </div>
          </div>
        </nav>
      {/* NAVBAR */}
      <main>
        {/* HEADER */}
        <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
          <div className="text-center mt-10">
            <h1 className="text-5xl font-bold mb-2">Find your table for any occasion</h1>
            {/* SEARCHBAR */}
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
            {/* SEARCHBAR */}
          </div>
        </div>
        {/* HEADER */}
        {/* CARDS */}
        <div className="py-3 px-36 mt-10 flex flex-wrap text-black">
          {/* CARD */}
          <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
            <Link href="/restaurant/milestones-grill">
              <img src="https://resizer.otstatic.com/v2/photos/wide-huge/2/31852905.jpg" alt="" className="w-full h-36" />
              <div className="p-1">
                <h3 className="font-bold text-2xl mb-2">Milestones Grill</h3>
                <div className="flex items-start">
                  <div className="flex mb-2">
                    ****
                  </div>
                  <p className="ml-2">77 Reviews</p>
                </div>
                <div className="flex text-reg font-light">
                  <p className="mr-3 capitalize">Mexican</p>
                  <p className="mr-3">$$$$</p>
                  <p>Toronto</p>
                </div>
                <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
              </div>
            </Link>
          </div>
          {/* CARD */}
        </div>
        {/* CARDS */}
      </main>
      </main>
    </main>
  );
};
