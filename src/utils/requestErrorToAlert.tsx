import { AlertState } from "../hooks/useAlert";
import { RequestError } from "./request";

export default function requestErrorToAlert(error: unknown): AlertState {
  return {
    variant: error instanceof RequestError ? error.type : "error",
    message: error instanceof Error ? error.message : String(error),
  };
}
