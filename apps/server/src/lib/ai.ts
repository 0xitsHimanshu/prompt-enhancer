import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { logEnhancement } from "./logger";

export type EnhanceParams = {
	prompt: string;
	model?: string;
	userId?: string;
};

export async function enhanceWithAI({ prompt, model, userId }: EnhanceParams): Promise<{ enhanced: string }> {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "OPENAI_API_KEY is not set" });
	}
	const client = new OpenAI({ apiKey });
	const targetModel = model && model.trim().length > 0 ? model : "gpt-4o-mini";
	const system = `
				You are a prompt enhancer that rewrites vague user requests into a structured, developer-ready task brief. 

				Always reframe the prompt like this:

				1. Start with a persona-based statement: "You are a [developer type] who wants to [goal]. Please provide a comprehensive guide that includes:"

				2. Add a **Requirements** section:
				- Bullet points summarizing what the solution must cover.

				3. Add a **Please cover these specific areas:** section with detailed numbered subtopics.
				- Include config setup, step-by-step implementations, code snippets, and best practices.

				4. Add an **Output Format** section:
				- What the final answer must include (code, file names, troubleshooting tips, etc.)

				Rules:
				- Always return content in Markdown.
				- Always expand vague requests into explicit, practical tasks.
				- Always include copy-paste ready code snippets and file structure where relevant.
				- Do not ask clarifying questions — assume sensible defaults instead.
			`;

	try {
		const completion = await client.chat.completions.create({
			model: targetModel,
			messages: [
				{ role: "system", content: system },
				{ role: "user", content: prompt },
			],
			temperature: 0.3,
		});
		const enhanced = completion.choices?.[0]?.message?.content?.trim();
		if (!enhanced) {
			throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "OpenAI returned no content" });
		}

		// Log the enhancement to database (non-blocking)
		logEnhancement({
			userId,
			rawPrompt: prompt,
			enhanced,
			model: targetModel,
		}).catch((error) => {
			console.error("Failed to log enhancement:", error);
		});

		return { enhanced };
	} catch (err: any) {
		const message = err?.message ?? "OpenAI SDK error";
		throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
	}
}
