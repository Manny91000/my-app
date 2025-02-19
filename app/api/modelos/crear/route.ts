import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const modelo = await prisma.model.findFirst({
            where:
                { description: body.description }
        });

      if (modelo) {
        return NextResponse.json({message:'Ya existe este modelo'}, {status: 400});
        }

        await prisma.model.create({ data: body });
        
        return NextResponse.json({message:'Modelo registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
