import prisma from "../db";
import { TRPCError } from "@trpc/server";

export type LogEnhancementParams = {
  userId?: string;
  rawPrompt: string;
  enhanced: string;
  model?: string;
};

export async function logEnhancement({
  userId,
  rawPrompt,
  enhanced,
  model,
}: LogEnhancementParams): Promise<void> {
  try {
    await prisma.promptEnhancement.create({
      data: {
        userId: userId || null,
        rawPrompt,
        enhanced,
        model: model || null,
      },
    });
  } catch (error) {
    // Log the error but don't fail the enhancement request
    console.error("Failed to log enhancement:", error);
    // In production, you might want to use a proper logging service
    // For now, we'll just log to console and continue
  }
}

export async function getEnhancementHistory(
  userId?: string,
  limit: number = 50
): Promise<Array<{
  id: string;
  rawPrompt: string;
  enhanced: string;
  model: string | null;
  createdAt: Date;
}>> {
  try {
    const enhancements = await prisma.promptEnhancement.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        rawPrompt: true,
        enhanced: true,
        model: true,
        createdAt: true,
      },
    });
    return enhancements;
  } catch (error) {
    console.error("Failed to fetch enhancement history:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch enhancement history",
    });
  }
}
