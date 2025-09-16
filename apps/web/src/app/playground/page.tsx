"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PlaygroundPage() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());
	const enhance = useMutation(trpc.enhance.mutationOptions());
	const [raw, setRaw] = useState("");
	const [enhanced, setEnhanced] = useState("");
	const [model, setModel] = useState("");
	const [history, setHistory] = useState<string[]>([]);

	function pushHistory(value: string) {
		setHistory((prev) => [...prev, value]);
	}

	function undoOnce() {
		setHistory((prev) => {
			if (prev.length === 0) return prev;
			const copy = [...prev];
			const last = copy.pop() as string;
			setRaw(last);
			return copy;
		});
	}

	return (
		<div className="container mx-auto max-w-6xl px-4 py-6">
			<div className="mb-4 flex items-center gap-2">
				<div className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`} />
				<span className="text-sm text-muted-foreground">
					{healthCheck.isLoading ? "Checking..." : healthCheck.data ? "Connected" : "Disconnected"}
				</span>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<section className="rounded-lg border p-4">
					<h2 className="mb-3 font-medium">Raw Prompt</h2>
					<textarea
						className="min-h-[280px] w-full resize-vertical rounded-md border bg-background p-3 font-mono text-sm"
						placeholder="Type your prompt here..."
						value={raw}
						onChange={(e) => setRaw(e.target.value)}
					/>
					<div className="mt-3 grid gap-2">
						<Label htmlFor="model">Model (optional)</Label>
						<Input
							id="model"
							placeholder="e.g. gpt-4o-mini"
							value={model}
							onChange={(e) => setModel(e.target.value)}
						/>
					</div>
					<div className="mt-4 flex gap-2">
						<Button
							onClick={async () => {
								if (!raw.trim()) return;
								const res = await enhance.mutateAsync({ prompt: raw, model: model || undefined });
								setEnhanced(res.enhanced);
							}}
							disabled={enhance.isPending}
						>
							{enhance.isPending ? "Enhancing..." : "Enhance"}
						</Button>
						<Button variant="outline" onClick={undoOnce} disabled={history.length === 0}>
							Undo
						</Button>
					</div>
				</section>

				<section className="rounded-lg border p-4">
					<h2 className="mb-3 font-medium">Enhanced Prompt</h2>
					<textarea
						className="min-h-[280px] w-full resize-vertical rounded-md border bg-muted p-3 font-mono text-sm"
						placeholder="Enhanced prompt will appear here..."
						value={enhanced}
						onChange={(e) => setEnhanced(e.target.value)}
					/>
					<div className="mt-4 flex flex-wrap gap-2">
						<Button
							variant="secondary"
							onClick={() => setEnhanced("")}
						>
							Clear
						</Button>
						<Button
							onClick={() => {
								pushHistory(raw);
								setRaw(enhanced);
						}}
							variant="outline"
						>
							Replace Raw
						</Button>
						<Button
							onClick={async () => {
								if (!enhanced.trim()) return;
								pushHistory(raw);
								setRaw(enhanced);
								setEnhanced("");
							}}
						>
							Accept
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
