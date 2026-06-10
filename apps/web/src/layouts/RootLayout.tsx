import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Zap } from "lucide-react";
import { CommandPaletteProvider, CommandPaletteTrigger } from "@/components/cmdK/CommandPalette";
import { pageVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/registry", label: "Registry" },
  { to: "/calculator", label: "Calculator" },
];

export function RootLayout() {
  const location = useLocation();

  return (
    <CommandPaletteProvider>
    <div className="min-h-screen flex flex-col bg-base">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-accent transition-colors duration-150"
            >
              <div className="flex items-center justify-center h-7 w-7 rounded-md bg-accent/15 border border-accent/25">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              Claude Hub
            </NavLink>

            {/* Nav links */}
            <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-1.5 rounded-md text-sm transition-colors duration-150",
                      isActive
                        ? "text-text-primary bg-surface-2"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-2/60"
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <CommandPaletteTrigger />
              <a
                href="https://github.com/laxman006/login-celebrate"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-muted hover:text-text-secondary hover:bg-surface-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Page content with transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>Claude Hub — plug-and-play registry for Claude Code</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/laxman006/login-celebrate/blob/main/CONTRIBUTING.md"
              className="hover:text-text-secondary transition-colors"
            >
              Contribute
            </a>
            <span>·</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
    </CommandPaletteProvider>
  );
}
