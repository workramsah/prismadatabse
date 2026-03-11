import prisma from "@/app/app";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id:string}>}){
    const {id} = await params;
    try {
        const deleted = await prisma.template.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json(deleted);
    } catch (error) {
        console.error("Error deleting template:", error);
        return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
    }
}