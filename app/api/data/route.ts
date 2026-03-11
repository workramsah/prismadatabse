import prisma from "@/app/app";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const value = await prisma.product.findMany();
        return NextResponse.json(value);
        
    } catch (error) {
        return NextResponse.json({error:"there is error."})
    }

}