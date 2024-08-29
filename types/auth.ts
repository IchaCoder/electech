export interface AuthResponseType<U> {
  message: string;
  token?: string;
  status: string;
  user?: U;
}
