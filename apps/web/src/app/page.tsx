"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

export default function Home() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());
	const [prompt, setPrompt] = useState("");
	const [model, setModel] = useState("");
	const enhance = useMutation(trpc.enhance.mutationOptions());

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
			<div className="grid gap-6">
				<section className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span className="text-sm text-muted-foreground">
							{healthCheck.isLoading
								? "Checking..."
								: healthCheck.data
									? "Connected"
									: "Disconnected"}
						</span>
					</div>
				</section>
				<section className="rounded-lg border p-4">
					<h2 className="mb-3 font-medium">Try Enhance</h2>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="prompt">Prompt</Label>
							<Input
								id="prompt"
								placeholder="Type a prompt to enhance..."
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="model">Model (optional)</Label>
							<Input
								id="model"
								placeholder="e.g. gpt-4o-mini or claude-3-7-sonnet-20250219"
								value={model}
								onChange={(e) => setModel(e.target.value)}
							/>
						</div>
						<div>
							<Button
								onClick={async () => {
									if (!prompt.trim()) return;
									await enhance.mutateAsync({ prompt, model: model || undefined });
								}}
								disabled={enhance.isPending}
							>
								{enhance.isPending ? "Enhancing..." : "Enhance"}
							</Button>
						</div>
						{enhance.data?.enhanced && (
							<div className="grid gap-2">
								<Label>Result</Label>
								<pre className="rounded-md border bg-muted p-3 text-sm whitespace-pre-wrap">
									{enhance.data.enhanced}
								</pre>
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
