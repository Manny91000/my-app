import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const cliente = await prisma.customer.findFirst({
            where:
                { name: body.name }
        });

      if (cliente) {
        return NextResponse.json({message:'Ya existe este cliente'}, {status: 400});
        }

        await prisma.customer.create({ data: body });
        
        return NextResponse.json({message:'Cliente registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
