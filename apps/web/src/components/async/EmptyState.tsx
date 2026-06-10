import { PackageOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-8 text-center",
        className
      )}
      role="status"
      aria-label={title}
    >
      <div className="mb-4 text-text-muted opacity-60">
        {icon ?? <PackageOpen className="h-10 w-10" strokeWidth={1.5} />}
      </div>
      <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
      {description && (
        <p className="text-xs text-text-muted max-w-xs">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      icon={<Search className="h-10 w-10" strokeWidth={1.5} />}
      title={`No results for "${query}"`}
      description="Try different keywords or browse by category."
    />
  );
}
