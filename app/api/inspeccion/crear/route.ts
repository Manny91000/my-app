import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const inspeccion = await prisma.inspection.findFirst({
            where:
                { vehicleId: body.vehicleId }
        });

      if (inspeccion) {
        return NextResponse.json({message:'Ya existe una inspeccion para este vehiculo'}, {status: 400});
        }

        await prisma.inspection.create({ data: body });
        
        return NextResponse.json({message:'inspeccion registrada exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
