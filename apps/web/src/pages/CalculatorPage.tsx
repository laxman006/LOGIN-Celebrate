import { motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";
import { EmptyState } from "@/components/async/EmptyState";
import { Calculator } from "lucide-react";

export function CalculatorPage() {
  return (
    <motion.div
      variants={pageVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Cost Calculator</h1>
        <p className="text-sm text-text-muted mt-1">Estimate Claude API costs</p>
      </div>
      <EmptyState
        icon={<Calculator className="h-10 w-10" strokeWidth={1.5} />}
        title="Coming in Phase 3"
        description="Live Claude pricing with token sliders, model comparison, and monthly projections."
      />
    </motion.div>
  );
}
