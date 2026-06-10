import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Copy, Terminal, Zap, BookOpen, GitBranch, Hash, Settings } from "lucide-react";
import { heroContainerVariants, heroItemVariants, cardGridVariants, cardItemVariants } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCommandPalette } from "@/components/cmdK/CommandPalette";

const categories = [
  {
    id: "skills",
    label: "Skills",
    icon: <Zap className="h-5 w-5" />,
    count: 15,
    description: "Reusable SKILL.md files that give Claude expertise",
    badge: "skill" as const,
  },
  {
    id: "claude-md",
    label: "CLAUDE.md",
    icon: <BookOpen className="h-5 w-5" />,
    count: 8,
    description: "Project-specific instruction templates",
    badge: "claude-md" as const,
  },
  {
    id: "hooks",
    label: "Hooks",
    icon: <GitBranch className="h-5 w-5" />,
    count: 6,
    description: "Automate actions on edit, commit, or completion",
    badge: "hook" as const,
  },
  {
    id: "commands",
    label: "Commands",
    icon: <Hash className="h-5 w-5" />,
    count: 6,
    description: "Slash commands that extend Claude Code",
    badge: "command" as const,
  },
  {
    id: "mcp",
    label: "MCP Configs",
    icon: <Settings className="h-5 w-5" />,
    count: 25,
    description: "Ready-made MCP server configurations",
    badge: "mcp" as const,
  },
];

export function HomePage() {
  const { toggle } = useCommandPalette();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
      {/* Hero */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={heroItemVariants} className="mb-5">
          <Badge variant="accent" className="text-xs px-3 py-1">
            <Zap className="h-3 w-3" />
            Plug-and-play registry for Claude Code
          </Badge>
        </motion.div>

        <motion.h1
          variants={heroItemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1] mb-5"
        >
          Everything you need for{" "}
          <span className="gradient-text">Claude Code</span>,{" "}
          <br className="hidden sm:block" />
          installed in seconds.
        </motion.h1>

        <motion.p
          variants={heroItemVariants}
          className="text-lg text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Browse skills, templates, hooks, commands, and MCP configs. Copy one line or
          run <code className="font-mono text-accent text-sm">npx claude-hub add</code>.
        </motion.p>

        <motion.div
          variants={heroItemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link to="/registry">
              Browse Registry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" onClick={toggle}>
            <Terminal className="h-4 w-4" />
            <span>
              npx claude-hub add skill
            </span>
          </Button>
        </motion.div>

        {/* CLI preview */}
        <motion.div
          variants={heroItemVariants}
          className="mt-10 mx-auto max-w-lg rounded-lg bg-surface-1 border border-border overflow-hidden text-left"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface-2/50">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-warning/60" />
            <div className="h-3 w-3 rounded-full bg-success/60" />
            <span className="ml-2 text-2xs text-text-muted font-mono">Terminal</span>
          </div>
          <div className="p-4 font-mono text-xs leading-relaxed">
            <div className="text-text-muted">$ <span className="text-accent">npx</span> <span className="text-text-primary">claude-hub add skill code-reviewer</span></div>
            <div className="mt-1 text-success">✓ Installed skill: code-reviewer</div>
            <div className="text-text-muted mt-0.5">  → .claude/skills/code-reviewer/SKILL.md</div>
            <div className="mt-2 text-text-muted">$ <span className="text-accent">npx</span> <span className="text-text-primary">claude-hub add claude-md nextjs</span></div>
            <div className="mt-1 text-success">✓ Created CLAUDE.md from nextjs template</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Category grid */}
      <motion.section
        className="mt-24"
        variants={heroContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          variants={heroItemVariants}
          className="text-center text-2xl font-semibold text-text-primary mb-10"
        >
          What's in the registry
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={cardGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={cardItemVariants}>
              <Link
                to={`/registry/${cat.id}`}
                className="group block rounded-lg bg-surface-1 border border-border p-5 hover:border-border-bright hover:bg-surface-2/50 transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-md bg-surface-2 text-text-secondary group-hover:text-accent transition-colors duration-150">
                    {cat.icon}
                  </div>
                  <Badge variant={cat.badge}>{cat.count} items</Badge>
                </div>
                <h3 className="font-semibold text-sm text-text-primary mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Browse
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Install methods card */}
          <motion.div variants={cardItemVariants}>
            <div className="rounded-lg bg-surface-1 border border-border p-5">
              <h3 className="font-semibold text-sm text-text-primary mb-3">3 install methods</h3>
              <div className="space-y-2.5">
                {[
                  { icon: <Copy className="h-3.5 w-3.5" />, label: "Copy button", sub: "One click, works everywhere" },
                  { icon: <Terminal className="h-3.5 w-3.5" />, label: "CLI", sub: "npx claude-hub add ..." },
                  { icon: <Hash className="h-3.5 w-3.5" />, label: "Plugin marketplace", sub: "/plugin marketplace add ..." },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-surface-2 text-text-muted">{icon}</div>
                    <div>
                      <div className="text-xs font-medium text-text-secondary">{label}</div>
                      <div className="text-2xs text-text-muted">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
