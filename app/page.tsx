import { prisma } from '@/prisma/prisma.config'
import React from 'react'

const Home = async () => {
  const modelos = await prisma.model.findMany();
  console.log(modelos);
  return (
    <div>
      Usuario Logeado 
    </div>
  )
}

export default Home
