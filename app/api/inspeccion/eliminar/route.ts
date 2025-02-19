import { prisma } from "@/prisma/prisma.config";

import { NextResponse } from "next/server";

export async function DELETE (req: Request) {
    try {
      const id = Number(new URL(req.url).searchParams.get('id'));

        await prisma.inspection.delete({ where: { id } });
        
        return NextResponse.json({message:'Inspeccion borrado con exitoso'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message:'error del servidor: ' +(error as Error).message}, {status: 500});
    }
}
