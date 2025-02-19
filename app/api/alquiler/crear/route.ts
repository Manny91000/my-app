import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const alquiler = await prisma.rent.findFirst({
            where: {
                vehicleId: body.vehicleId,
            }
        });

      if (alquiler) {
        return NextResponse.json({message:'Ya se encuentra un alquiler para este vehiculo'}, {status: 400});
      }

        await prisma.rent.create({ data: body });

        return NextResponse.json({message:'Aquiler registrada exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
