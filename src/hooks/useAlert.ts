import { useState } from "react";

export default function useAlert() {
  const [state, setState] = useState<{
    variant: "warn" | "error";
    message: string;
  }>();

  const set = (variant: "warn" | "error", message: string) =>
    setState({ variant, message });

  const clear = () => setState(undefined);

  return { state, set, clear };
}
