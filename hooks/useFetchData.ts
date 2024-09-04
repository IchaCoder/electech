import useSWR, { SWRResponse } from "swr";
import { API_RESPONSE } from "@/lib/types";

type UseConditionalFetchDataTypes = {
  condition: any;
  endpoint: string;
  token: string;
};

const fetcher = async (url: string, token?: string) => {
  let headers = {};

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const res = await response.json();
    const error = {
      message: res.message || response.statusText || "An error occurred",
    };
    throw error;
  }

  return response.json();
};

export const useFetchEvents = <ReturnData>(endpoint: string) => {
  const { data, error, mutate, isLoading } = useSWR<API_RESPONSE<ReturnData>>(`/api/${endpoint}`, fetcher, {
    keepPreviousData: true,
  });
  return { data, error, mutate, isLoading };
};
