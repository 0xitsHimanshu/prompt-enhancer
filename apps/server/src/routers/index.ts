import { publicProcedure, router } from "../lib/trpc";
import { z } from "zod";
import { enhanceWithAI } from "../lib/ai";
import { getEnhancementHistory } from "../lib/logger";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
 	enhance: publicProcedure
 		.input(
 			z.object({
 				prompt: z.string().min(1),
 				model: z.string().optional(),
 				userId: z.string().optional(),
 			}),
 		)
 		.mutation(async ({ input }) => {
 			const { enhanced } = await enhanceWithAI({ 
 				prompt: input.prompt, 
 				model: input.model,
 				userId: input.userId 
 			});
 			return { enhanced };
 		}),
	history: publicProcedure
		.input(
			z.object({
				userId: z.string().optional(),
				limit: z.number().min(1).max(100).default(50),
			}),
		)
		.query(async ({ input }) => {
			const history = await getEnhancementHistory(input.userId, input.limit);
			return { history };
		}),
});
export type AppRouter = typeof appRouter;
