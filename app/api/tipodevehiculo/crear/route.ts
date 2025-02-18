import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
      const marca = await prisma.vehicleType.findFirst({ where: { description: body.description } });

      if (marca) {
        return NextResponse.json({message:'Ya existe este tipo de vehiculo'}, {status: 400});
        }

        await prisma.vehicleType.create({ data: body});
        return NextResponse.json({message:'tipo de vehiculo registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}