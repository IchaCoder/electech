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

// remove 0 from the beginning of phone number and replace with 233
export const formatPhoneNumber = (number: string) => {
  if (number.startsWith("0")) {
    return `233${number.slice(1)}`;
  }
  return number;
};
