import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.config";

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        await prisma.model.update({
            where: { id: body.id },
            data: body,
        });

        return NextResponse.json({
            message: "Modelo actualizado con éxito.",
        }, { status: 200 });
    } catch (error) {
        console.log("error: ", error);

        return NextResponse.json({
            message: "Error interno del servidor: " + (error as Error).message,
        }, { status: 500 });
    }
}
