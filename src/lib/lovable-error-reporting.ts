type AppErrorOptions = Record<string, unknown>;

declare global {
  interface Window {
    __appErrorEvents?: { captureException?: (error: unknown, context?: AppErrorOptions) => void };
  }
}

export function reportAppError(error: unknown, context: AppErrorOptions = {}) {
  if (typeof window === "undefined") return;
  window.__appErrorEvents?.captureException?.(error, {
    source: "react_error_boundary",
    route: window.location.pathname,
    ...context,
  });
}
