import { Navbar } from "@/components/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});

function MainLayout() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
