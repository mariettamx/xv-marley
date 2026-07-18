type AppErrorOptions = Record<string, unknown>;

export function reportAppError(error: unknown, context: AppErrorOptions = {}) {
  console.error("Unhandled app error", error, context);
}
