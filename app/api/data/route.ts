import prisma from "@/app/app";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const value = await prisma.product.findMany();
        return NextResponse.json(value);
        
    } catch (error) {
        console.error("Error in GET /api/data:", error);
        const debugEnabled = process.env.API_DEBUG === "true";
        return NextResponse.json(
            {
                error: "Failed to fetch products.",
                details: debugEnabled
                    ? (error instanceof Error ? error.message : String(error))
                    : undefined,
            },
            { status: 500 }
        );
    }

}