import formatList from "./formatList";

export interface RequestParams {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  data?: unknown;
}

export interface RequestResult<T> {
  data: T;
}

export class RequestError extends Error {
  type: "warn" | "error";

  constructor(message: string, status: number) {
    super(message);
    this.name = "RequestError";
    this.type = status < 500 ? "warn" : "error";
  }
}

export default async function request<T>(
  params: RequestParams
): Promise<RequestResult<T>> {
  const headers = new Headers(params.headers);
  const init: RequestInit = { headers };

  if (params.method) init.method = params.method;

  if (params.data !== undefined) {
    headers.set("content-type", "application/json");
    init.body = JSON.stringify(params.data);
  }

  const response = await fetch(params.url, init);

  const contentType = response.headers.get("content-type");
  const json = contentType && contentType.includes("json");
  const data = json ? await response.json() : undefined;

  if (!response.ok) {
    throw new RequestError(
      data.message
        ? Array.isArray(data.message)
          ? formatList(data.message)
          : data.message
        : `Request failed with status code ${response.status}`,
      response.status
    );
  }

  return { data };
}
