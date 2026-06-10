import type { ReactNode } from "react";
import type { AsyncStatus } from "./types";
import { SkeletonCardGrid } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";

interface AsyncStateProps {
  status: AsyncStatus;
  error?: string;
  onRetry?: () => void;
  /** Shown while loading */
  skeleton?: ReactNode;
  /** Shown when data is empty */
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  children: ReactNode;
}

/**
 * Unified async state wrapper — renders skeleton / empty / error / children.
 * Every data view must use this to guarantee all four states are covered.
 */
export function AsyncState({
  status,
  error,
  onRetry,
  skeleton,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  emptyAction,
  children,
}: AsyncStateProps) {
  if (status === "loading") {
    return <>{skeleton ?? <SkeletonCardGrid />}</>;
  }

  if (status === "error") {
    return (
      <ErrorState
        message={error ?? "Failed to load. Please try again."}
        onRetry={onRetry}
      />
    );
  }

  if (status === "empty") {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return <>{children}</>;
}
