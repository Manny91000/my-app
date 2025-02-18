import { prisma } from "@/prisma/prisma.config";

import { NextResponse } from "next/server";

export async function DELETE (req: Request) {
    try {
      const id = Number(new URL(req.url).searchParams.get('id'));
      //Busca marca existente.
      const tipodevehiculo = await prisma.vehicleType.findFirst({ where: { id } });

      if (!tipodevehiculo) {
        return NextResponse.json({message:'No existe el vehiculo que ha puesto'}, {status: 400});
        }

        await prisma.vehicleType.delete({ where: {id} });
        return NextResponse.json({message:'vehiculo borrado con exitoso'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}