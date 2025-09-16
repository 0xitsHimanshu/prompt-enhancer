import { publicProcedure, router } from "../lib/trpc";
import { z } from "zod";
import { enhanceWithAI } from "../lib/ai";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
 	enhance: publicProcedure
 		.input(
 			z.object({
 				prompt: z.string().min(1),
 				model: z.string().optional(),
 			}),
 		)
 		.mutation(async ({ input }) => {
 			const { enhanced } = await enhanceWithAI({ prompt: input.prompt, model: input.model });
 			return { enhanced };
 		}),
});
export type AppRouter = typeof appRouter;
