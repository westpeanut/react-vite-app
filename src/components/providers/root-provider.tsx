import { routeTree } from "@/__generated__/route-tree.gen";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  parseSearchWith,
  stringifySearchWith,
} from "@tanstack/react-router";
import * as jsurl from "jsurl2";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  parseSearch: parseSearchWith(jsurl.parse),
  stringifySearch: stringifySearchWith(jsurl.stringify),
  defaultPendingMs: 0,
  defaultPendingMinMs: 0,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const RootProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} context={{ queryClient }} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
