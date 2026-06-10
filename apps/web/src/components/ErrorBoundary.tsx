import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "./async/ErrorState";

interface Props {
  children: ReactNode;
  /** Custom fallback — defaults to ErrorState */
  fallback?: ReactNode;
  /** Called when error is caught */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Used for compact inline error display */
  compact?: boolean;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
    // In production, pipe to error reporting here
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  override render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorState
          title="Something went wrong"
          message={this.state.error.message}
          onRetry={this.reset}
          compact={this.props.compact}
        />
      );
    }
    return this.props.children;
  }
}

/** Convenience wrapper with automatic compact detection */
export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export function WidgetErrorBoundary({ children }: { children: ReactNode }) {
  return <ErrorBoundary compact>{children}</ErrorBoundary>;
}
