import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex items-center gap-5 text-sm font-medium md:gap-6 lg:gap-6">
        <Link
          to="/"
          className="text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
        >
          Generator
        </Link>
        <Link
          to="/scanner"
          className="text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
        >
          Scanner
        </Link>
      </nav>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
};
