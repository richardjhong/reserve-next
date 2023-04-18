import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        Open Table
      </Link>
      <div>
        <div className="flex">
          <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Sign In</button>
          <button className="text-gray-700 border p-1 px-4 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar