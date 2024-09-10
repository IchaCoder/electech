/**
 * Retrieves the token from the local storage.
 * @returns {string | null} The token value if it exists, otherwise null.
 */
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

/**
 * Calculates the status of an event based on its start and due dates.
 * @param start_date - The start date of the event.
 * @param start_time - The start time of the event.
 * @param due_date - The due date of the event.
 * @param due_time - The due time of the event.
 * @returns The status of the event, which can be "ended", "ongoing", or "not started".
 */
export function getEventStatus(
  start_date: string,
  start_time: string,
  due_date: string,
  due_time: string
): "ended" | "ongoing" | "not started" {
  const currentDateTime = new Date();
  const startDateTime = new Date(`${start_date.split("T")[0]}T${start_time}:00.000Z`);
  const dueDateTime = new Date(`${due_date.split("T")[0]}T${due_time}:00.000Z`);

  if (currentDateTime > dueDateTime) {
    return "ended";
  } else if (currentDateTime >= startDateTime && currentDateTime <= dueDateTime) {
    return "ongoing";
  } else {
    return "not started";
  }
}

// function to that receives time and converts it to AM or PM
export const convertTimeToAMOrPM = (time: string) => {
  // Validate input format
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    throw new Error("Invalid time format. Please provide time in HH:MM format.");
  }

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hoursIn12 = hours % 12 || 12;
  return `${hoursIn12}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
};
