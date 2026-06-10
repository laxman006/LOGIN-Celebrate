import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { pageVariants } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <motion.div
      variants={pageVariants}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <p className="text-6xl font-bold text-surface-3 font-mono mb-4">404</p>
      <h1 className="text-xl font-semibold text-text-primary mb-2">Page not found</h1>
      <p className="text-sm text-text-muted mb-8 max-w-xs">
        This page doesn&apos;t exist. Check the URL or head back to the registry.
      </p>
      <Button asChild variant="secondary">
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </motion.div>
  );
}
