import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  /** Compact inline error for widgets (not full-page) */
  compact?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
  compact = false,
}: ErrorStateProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20",
          "text-xs text-destructive",
          className
        )}
        role="alert"
      >
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>{message ?? title}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto text-destructive/80 hover:text-destructive transition-colors"
            aria-label="Retry"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-8 text-center",
        className
      )}
      role="alert"
    >
      <AlertTriangle
        className="h-10 w-10 text-destructive/60 mb-4"
        strokeWidth={1.5}
      />
      <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
      {message && (
        <p className="text-xs text-text-muted max-w-xs mb-4">{message}</p>
      )}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}
