import prisma from "@/app/app";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const template = await prisma.template.findUnique({
            where: { id: parseInt(id) },
        });
        if (!template) {
            return NextResponse.json(
                { error: "Template not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(template);
    } catch (error) {
        console.error("Error fetching template:", error);
        return NextResponse.json(
            { error: "Failed to fetch template" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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