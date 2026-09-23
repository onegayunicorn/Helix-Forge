import { Link, useRouterState } from "@tanstack/react-router";
import { Dna, FlaskConical, GitCompare, Info, Menu, ScanSearch, Spline } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Wordmark } from "@/components/helix/logo";
import { Disclaimer } from "@/components/helix/disclaimer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Locus", icon: Dna },
  { to: "/analyze", label: "Analyzer", icon: ScanSearch },
  { to: "/protein", label: "Protein", icon: Spline },
  { to: "/concordance", label: "Concordance", icon: GitCompare },
  { to: "/lab", label: "Lab", icon: FlaskConical },
  { to: "/about", label: "About", icon: Info },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="shrink-0">
            <Wordmark compact />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} active={pathname === item.to} />
            ))}
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mb-6">
                <Wordmark />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-md px-3 text-sm text-muted hover:bg-elevated hover:text-fg",
                      pathname === item.to && "bg-elevated text-fg",
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <Disclaimer />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10">
        {children}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-5">
          {NAV.slice(0, 5).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] text-muted",
                pathname === item.to && "text-fg",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Dna;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm text-muted transition-colors duration-150 hover:text-fg",
        active && "bg-elevated text-fg",
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </Link>
  );
}
