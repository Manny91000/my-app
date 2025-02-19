import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const vehiculo = await prisma.vehicle.findFirst({
            where:
                { description: body.description }
        });

      if (vehiculo) {
        return NextResponse.json({message:'Ya existe este vehiculo'}, {status: 400});
        }

        await prisma.vehicle.create({ data: body });
        
        return NextResponse.json({message:'Vehiculo registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
