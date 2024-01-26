"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const UserProfile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className='flex justify-center items-center mt-12'>
      <div className='flex flex-col gap-4'>
        <p> Profile Page </p>
        <button className='rounded-md border border-blue-800 font-medium' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default UserProfile