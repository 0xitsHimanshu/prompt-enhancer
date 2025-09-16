import { NextRequest, NextResponse } from "next/server";
import { enhanceWithAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const prompt: string | undefined = body?.prompt;
		const model: string | undefined = body?.model;
		if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
			return NextResponse.json({ error: "prompt is required" }, { status: 400 });
		}
		const { enhanced } = await enhanceWithAI({ prompt, model });
		return NextResponse.json({ enhanced });
	} catch (error: any) {
		return NextResponse.json({ error: error?.message ?? "Internal error" }, { status: 500 });
	}
}
