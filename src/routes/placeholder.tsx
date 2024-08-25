import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/placeholder")({
  component: () => (
    <div className="flex h-screen w-screen items-center justify-center text-muted-foreground">
      placeholder
    </div>
  ),
});
