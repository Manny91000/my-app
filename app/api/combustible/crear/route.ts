import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const combustible = await prisma.fuelType.findFirst({
            where:
                { description: body.description }
        });

      if (combustible) {
        return NextResponse.json({message:'Ya existe este tipo de combustible'}, {status: 400});
        }

        await prisma.fuelType.create({ data: body });
        
        return NextResponse.json({message:'Tipo de combustible registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
