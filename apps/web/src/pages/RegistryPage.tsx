import { motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import { SkeletonCardGrid } from "@/components/async/Skeleton";

export function RegistryPage() {
  return (
    <motion.div
      variants={pageVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Registry</h1>
        <p className="text-sm text-text-muted mt-1">
          Browse skills, templates, hooks, commands, and MCP configs
        </p>
      </div>
      {/* Placeholder — full implementation in Step 3 */}
      <SkeletonCardGrid count={9} />
    </motion.div>
  );
}
