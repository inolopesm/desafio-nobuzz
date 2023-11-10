import { useMemo, useState } from "react";

export interface AlertState {
  variant: "warn" | "error";
  message: string;
}

export default function useAlert() {
  const [state, set] = useState<AlertState>();

  const warn = (message: string) => set({ variant: "warn", message });
  const error = (message: string) => set({ variant: "error", message });
  const clear = () => set(undefined);

  return useMemo(() => ({ state, set, warn, error, clear }), [state]);
}
