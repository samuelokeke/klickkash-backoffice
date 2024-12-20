import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  // Split the cookie string into individual "key=value" pairs
  const cookies = document.cookie.split(";");

  // Loop through the cookies to find the matching name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Remove leading/trailing spaces
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1); // Return the cookie's value
    }
  }

  return null;
}
