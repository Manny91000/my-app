import { prisma } from "@/prisma/prisma.config";
import { NextResponse } from "next/server";

 
 export async function GET(){
    try { 
        const modelos = await prisma.model.findMany();

        return NextResponse.json({ modelos}, { status:200});
    } catch (error) {
        return NextResponse.json ({ error: (error as Error).message }, { status:500});
 }
}