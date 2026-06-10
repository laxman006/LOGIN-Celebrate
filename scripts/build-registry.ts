#!/usr/bin/env tsx
/**
 * Compiles packages/registry-content/ → apps/web/public/registry.json
 * Validates every item's meta.json with zod; exits 1 if any item is invalid.
 * Run: pnpm build:registry
 */
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "packages/registry-content");
const OUT_DIR = join(ROOT, "apps/web/public");
const OUT_FILE = join(OUT_DIR, "registry.json");

// ─── Schemas ──────────────────────────────────────────────────────────────────

const CategorySchema = z.enum(["skill", "claude-md", "hook", "command", "mcp"]);

const BaseMetaSchema = z.object({
  name: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/, "kebab-case only"),
  title: z.string().min(1).max(80),
  description: z.string().min(10).max(200),
  category: CategorySchema,
  tags: z.array(z.string()).min(1).max(10),
  triggers: z.array(z.string()).optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/).optional(),
});

type BaseMeta = z.infer<typeof BaseMetaSchema>;

interface RegistryItem extends BaseMeta {
  content: string;
  installPath: string;
  relatedItems?: string[];
}

interface Registry {
  version: string;
  generatedAt: string;
  items: RegistryItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function readJsonSafe<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  const raw = await readFile(path, "utf-8");
  const parsed: unknown = JSON.parse(raw);
  return schema.parse(parsed);
}

async function dirExists(path: string): Promise<boolean> {
  return existsSync(path);
}

async function collectItems(category: string): Promise<RegistryItem[]> {
  const dir = join(CONTENT_DIR, category);
  if (!(await dirExists(dir))) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const items: RegistryItem[] = [];
  const errors: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const itemDir = join(dir, entry.name);

    try {
      const metaPath = join(itemDir, "meta.json");
      const meta = await readJsonSafe(metaPath, BaseMetaSchema);

      // Content file varies by category
      const contentFile =
        category === "skill" ? "SKILL.md" :
        category === "claude-md" ? "CLAUDE.md" :
        category === "hook" ? "README.md" :
        category === "command" ? "command.md" :
        "config.json";

      const contentPath = join(itemDir, contentFile);
      let content = "";
      try {
        content = await readFile(contentPath, "utf-8");
      } catch {
        errors.push(`  [${category}/${entry.name}] Missing content file: ${contentFile}`);
        continue;
      }

      const installPath =
        category === "skill" ? `.claude/skills/${meta.name}/SKILL.md` :
        category === "claude-md" ? "CLAUDE.md" :
        category === "hook" ? ".claude/settings.json (hooks section)" :
        category === "command" ? `.claude/commands/${meta.name}.md` :
        ".claude/settings.json (mcpServers section)";

      items.push({ ...meta, content, installPath });
    } catch (err) {
      errors.push(`  [${category}/${entry.name}] ${String(err)}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\nValidation errors in ${category}:`);
    errors.forEach((e) => console.error(e));
    process.exit(1);
  }

  return items;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Building registry...");

  const categories = ["skills", "claude-md", "hooks", "commands", "mcp-configs"];

  // Map folder names to category values
  const folderToCategory: Record<string, string> = {
    skills: "skill",
    "claude-md": "claude-md",
    hooks: "hook",
    commands: "command",
    "mcp-configs": "mcp",
  };

  const allItems: RegistryItem[] = [];

  for (const folder of categories) {
    const category = folderToCategory[folder] ?? folder;
    const dir = join(CONTENT_DIR, folder);
    if (!(await dirExists(dir))) {
      console.log(`  ${folder}/ not found, skipping`);
      continue;
    }
    const items = await collectItems(folder);
    // Ensure each item has the right category from the folder mapping
    const categorized = items.map((item) => ({ ...item, category: category as BaseMeta["category"] }));
    allItems.push(...categorized);
    console.log(`  ${folder}: ${items.length} items`);
  }

  const registry: Registry = {
    version: "1",
    generatedAt: new Date().toISOString(),
    items: allItems,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`\nWrote ${allItems.length} items → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
