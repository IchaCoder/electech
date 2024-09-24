export interface AuthResponseType<U> {
  message: string;
  token?: string;
  status: "success" | "error";
  user?: U;
}
