import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  // Leer datos
  const combustibles = await prisma.combustibles.findMany()
  return NextResponse.json({ ok: true, datos: combustibles })
}

export async function POST() {
  // Insertar dato de prueba
  const nuevo = await prisma.clientes.create({
    data: {
      Cedula: '001-0000001-1',
      Nombre: 'Cliente',
      Apellido: 'Prueba',
      Estado: true,
    }
  })
  return NextResponse.json({ ok: true, cliente: nuevo })
}