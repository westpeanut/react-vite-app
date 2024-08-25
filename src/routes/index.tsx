import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <span className="animate-bounce">🚀🚀🚀</span>
    </div>
  ),
});
