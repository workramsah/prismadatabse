import prisma from "@/app/app";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const templates = await prisma.template.findMany();
        return NextResponse.json(templates);
    } catch (error) {
        console.error("Error fetching templates:", error);
        return NextResponse.json(
            { error: "Failed to fetch templates" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, language, category, Header, Message, Footer, Buttons } =
            body;
        const template = await prisma.template.create({
            data: {
                name,
                language,
                category: category ?? "general",
                Header,
                Message,
                Footer,
                Buttons,
            },
        });
        return NextResponse.json(template);
    } catch (error) {
        console.error("Error creating template:", error);
        return NextResponse.json(
            { error: "Failed to create template" },
            { status: 500 }
        );
    }
}
