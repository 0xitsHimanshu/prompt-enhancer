import { test, expect } from "@playwright/test";

test("playground enhance flow", async ({ page }) => {
	await page.goto("/playground");
	await expect(page.locator("text=Raw Prompt")).toBeVisible();

	const raw = page.locator("textarea").first();
	await raw.fill("Summarize: The quick brown fox jumps over the lazy dog.");

	await page.getByRole("button", { name: "Enhance" }).click();
	await expect(page.getByText("Enhanced Prompt")).toBeVisible();

	// Wait for result to appear (basic heuristic)
	const enhanced = page.locator("section:has-text('Enhanced Prompt') textarea");
	await expect(enhanced).toHaveValue(/.+/ , { timeout: 15000 });
});
