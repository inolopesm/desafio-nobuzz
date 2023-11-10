import request, { RequestParams } from "../utils/request";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (BASE_URL === undefined) {
  throw new Error("VITE_API_BASE_URL is a required field");
}

export default async function api<T>(params: RequestParams) {
  return await request<T>({ ...params, url: `${BASE_URL}/${params.url}` });
}
