import useSWR, { SWRResponse } from "swr";
import { API_RESPONSE } from "@/lib/types";

type UseConditionalFetchDataTypes = {
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

// export const useFetchEvents = <ReturnData>(endpoint: string) => {
//   const { data, error, mutate, isLoading } = useSWR<API_RESPONSE<ReturnData>>(`/api/${endpoint}`, fetcher, {
//     keepPreviousData: true,
//   });
//   console.log(data);
//   console.log(error);

//   return { data, error, mutate, isLoading };
// };

export const useConditionalFetchData = <ReturnData>(props: UseConditionalFetchDataTypes) => {
  const { endpoint, token } = props;

  const fetchWithToken = ([url, token]: [string, string]) => fetcher(url, token);

  const { data, error, mutate, isLoading } = useSWR([`/api/${endpoint}`, token], fetchWithToken, {
    keepPreviousData: true,
  }) as SWRResponse<API_RESPONSE<ReturnData>>;

  return { data, error, mutate, isLoading };
};
