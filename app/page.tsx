import { prisma } from '@/prisma/prisma.config'
import React from 'react'

const Home = async () => {
  const modelos = await prisma.model.findMany();
  console.log(modelos);

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

export default Home