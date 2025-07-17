'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home = () => {
  const { status } = useSession();
  
  if (status === 'authenticated') {
    redirect('/dashboard');
  } else {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mt-6">
          <button className="w-full py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300">
            Usuario Logeado
          </button>
        </div>
      </div>
    </div>
  )
}


import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})




export default Home