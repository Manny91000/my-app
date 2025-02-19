import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
      const marca = await prisma.brand.findFirst({ where: { description: body.description } });

      if (marca) {
        return NextResponse.json({message:'Ya existe esta marca'}, {status: 400});
        }

        await prisma.brand.create({ data: body});
        return NextResponse.json({message:'marca registrada exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
