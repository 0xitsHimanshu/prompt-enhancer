import { NextRequest, NextResponse } from "next/server";
import { enhanceWithAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const prompt: string | undefined = body?.prompt;
		const model: string | undefined = body?.model;
		const userId: string | undefined = body?.userId;
		
		if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
			return NextResponse.json({ error: "prompt is required" }, { status: 400 });
		}
		
		const { enhanced } = await enhanceWithAI({ prompt, model, userId });
		return NextResponse.json({ enhanced }, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			}
		});
	} catch (error: any) {
		return NextResponse.json({ error: error?.message ?? "Internal error" }, { 
			status: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			}
		});
	}
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		}
	});
}
