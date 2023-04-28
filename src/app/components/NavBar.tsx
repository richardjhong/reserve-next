"use client";

import Link from 'next/link'
import AuthModal from './AuthModal';
import { useValidUserQuery } from '@/generated/graphql-frontend';
import { getClient } from '../../../lib/client';
import { deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const client = getClient();

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInData = useValidUserQuery({ client });
  const { data, loading } = loggedInData;

  const handleLogout = async () => {
    await deleteCookie('jwt');
    setLoggedIn(false);
  };

  useEffect(() => {
    data ? setLoggedIn(true) : setLoggedIn(false);
  }, [data])

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        Dine Reserve
      </Link>
      <div>
        {loading ? null : 
        (loggedIn ? 
          <button className="bg-blue-400 text-white p-1 px-4 rounded mr-3" onClick={handleLogout}>Logout</button> : (
          <div className="flex">
            <AuthModal isSignin={true} onSuccess={loggedInData.refetch} />
            <AuthModal isSignin={false} onSuccess={loggedInData.refetch} />
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar;