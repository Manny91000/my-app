import { prisma } from '@/prisma/prisma.config'
import { NextResponse } from 'next/server'

export async function GET() {
  const combustibles = await prisma.fuelType.findMany()
  return NextResponse.json({ ok: true, datos: combustibles })
}

export async function POST() {
  const nuevo = await prisma.customer.create({
    data: {
      cedula: '001-0000001-1',
      name: 'Cliente',
      apellido: 'Prueba',
      status: true,
    }
  })
  return NextResponse.json({ ok: true, cliente: nuevo })
}