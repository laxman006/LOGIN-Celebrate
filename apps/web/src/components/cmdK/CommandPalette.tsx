import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { Command } from "cmdk";
import { Dialog } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Code2,
  GitBranch,
  Hash,
  Package,
  Search,
  Settings,
  Zap,
} from "lucide-react";
import { scaleVariants, slideUpVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────
interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be inside CommandPaletteProvider");
  return ctx;
}

// ─── Built-in commands ────────────────────────────────────────────────────────
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  action: (navigate: (to: string) => void) => void;
  group: string;
  keywords?: string[];
}

const builtInCommands: CommandItem[] = [
  {
    id: "browse-skills",
    label: "Browse Skills",
    description: "Find ready-made skills for Claude Code",
    icon: <Zap className="h-4 w-4" />,
    group: "Registry",
    keywords: ["skill", "code-reviewer", "debug"],
    action: (nav) => nav("/registry/skills"),
  },
  {
    id: "browse-claude-md",
    label: "CLAUDE.md Templates",
    description: "Project-specific Claude instructions",
    icon: <BookOpen className="h-4 w-4" />,
    group: "Registry",
    keywords: ["template", "instructions", "context"],
    action: (nav) => nav("/registry/claude-md"),
  },
  {
    id: "browse-hooks",
    label: "Browse Hooks",
    description: "Automate Claude Code actions",
    icon: <GitBranch className="h-4 w-4" />,
    group: "Registry",
    keywords: ["hook", "format", "lint", "notify"],
    action: (nav) => nav("/registry/hooks"),
  },
  {
    id: "browse-commands",
    label: "Slash Commands",
    description: "Custom /commands for Claude Code",
    icon: <Hash className="h-4 w-4" />,
    group: "Registry",
    keywords: ["command", "slash", "review"],
    action: (nav) => nav("/registry/commands"),
  },
  {
    id: "browse-mcp",
    label: "MCP Configs",
    description: "Ready-made MCP server configurations",
    icon: <Settings className="h-4 w-4" />,
    group: "Registry",
    keywords: ["mcp", "server", "tools"],
    action: (nav) => nav("/registry/mcp"),
  },
  {
    id: "cli-install",
    label: "CLI: npx claude-hub",
    description: "Install anything from the terminal",
    icon: <Code2 className="h-4 w-4" />,
    group: "Install",
    keywords: ["cli", "npx", "install", "terminal"],
    action: (nav) => nav("/registry"),
  },
  {
    id: "browse-all",
    label: "Browse All",
    description: "See the full registry",
    icon: <Package className="h-4 w-4" />,
    group: "Navigate",
    keywords: ["all", "browse", "registry"],
    action: (nav) => nav("/registry"),
  },
  {
    id: "calculator",
    label: "Cost Calculator",
    description: "Estimate Claude API costs",
    icon: <Search className="h-4 w-4" />,
    group: "Tools",
    keywords: ["cost", "price", "tokens", "calculate"],
    action: (nav) => nav("/calculator"),
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </CommandPaletteContext.Provider>
  );
}

// ─── Palette UI ───────────────────────────────────────────────────────────────
interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSelect = useCallback(
    (item: CommandItem) => {
      onOpenChange(false);
      setQuery("");
      item.action(navigate);
    },
    [navigate, onOpenChange]
  );

  // Group commands
  const groups = builtInCommands.reduce<Record<string, CommandItem[]>>(
    (acc, item) => {
      const g = item.group;
      if (!acc[g]) acc[g] = [];
      acc[g]!.push(item);
      return acc;
    },
    {}
  );

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            <motion.div
              className={cn(
                "w-full max-w-xl mx-4",
                "bg-surface-1 rounded-xl border border-border-bright",
                "shadow-2xl shadow-black/50",
                "overflow-hidden"
              )}
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <VisuallyHidden.Root>
                <h2>Command Palette</h2>
                <p>Search commands and registry items</p>
              </VisuallyHidden.Root>

              <Command shouldFilter={true} loop>
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="h-4 w-4 text-text-muted shrink-0" />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search registry, commands, docs..."
                    className={cn(
                      "flex-1 bg-transparent text-sm text-text-primary outline-none",
                      "placeholder:text-text-muted"
                    )}
                    autoFocus
                  />
                  <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border text-2xs text-text-muted font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <Command.List className="max-h-[360px] overflow-y-auto p-2">
                  <Command.Empty className="py-10 text-center text-sm text-text-muted">
                    No results for &ldquo;{query}&rdquo;
                  </Command.Empty>

                  {Object.entries(groups).map(([group, items]) => (
                    <Command.Group
                      key={group}
                      heading={group}
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                    >
                      {items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={`${item.label} ${item.description ?? ""} ${(item.keywords ?? []).join(" ")}`}
                          onSelect={() => handleSelect(item)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm cursor-pointer",
                            "text-text-secondary",
                            "data-[selected=true]:bg-surface-2 data-[selected=true]:text-text-primary",
                            "transition-colors duration-100"
                          )}
                        >
                          <span className="text-text-muted shrink-0">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[13px] truncate">{item.label}</div>
                            {item.description && (
                              <div className="text-2xs text-text-muted truncate mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-2xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-border font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-border font-mono">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <kbd className="px-1 py-0.5 rounded border border-border font-mono">⌘K</kbd>
                    close
                  </span>
                </div>
              </Command>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

// ─── Trigger button ───────────────────────────────────────────────────────────
export function CommandPaletteTrigger() {
  const { toggle } = useCommandPalette();
  return (
    <motion.button
      onClick={toggle}
      className={cn(
        "flex items-center gap-2 px-3 h-8 rounded-md",
        "bg-surface-2 border border-border text-text-muted",
        "text-xs transition-colors duration-150",
        "hover:border-border-bright hover:text-text-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Open command palette"
      aria-keyshortcuts="Meta+K"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:flex items-center gap-0.5 ml-2 px-1 py-0.5 rounded border border-border text-2xs font-mono">
        ⌘K
      </kbd>
    </motion.button>
  );
}
