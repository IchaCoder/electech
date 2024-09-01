export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("e_token");
};

export const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem("e_token", token);
};

const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
export const isProd = process.env.NODE_ENV === "production" && vercelEnv === "production";

// export const url = isProd ? "https://electech.vercel.app" : "http://localhost:3000";
export const url = "http://localhost:3000";
