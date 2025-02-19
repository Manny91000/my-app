import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
      const body = await req.json();
      
      //Busca marca existente.
        const empleado = await prisma.employee.findFirst({
            where:
                { name: body.name }
        });

      if (empleado) {
        return NextResponse.json({message:'Ya existe este empleado'}, {status: 400});
        }

        await prisma.employee.create({ data: body });
        
        return NextResponse.json({message:'Empleado registrado exitosamente'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
