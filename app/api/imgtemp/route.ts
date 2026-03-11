import { NextResponse } from "next/server";

const META_GRAPH_URL = "https://graph.facebook.com/v18.0/2821828158157500/message_templates";

export async function POST(request: Request) {
    const token = process.env.META_ACCESS_TOKEN;
    if (!token) {
        return NextResponse.json(
            { error: { message: "META_ACCESS_TOKEN is not set in .env" } },
            { status: 500 }
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: { message: "Invalid JSON body" } },
            { status: 400 }
        );
    }

    const res = await fetch(META_GRAPH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
}
