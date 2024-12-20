import axios from "axios";
// import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const token = 'cookies().get("token")?.value';

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      // session has expired
    }

    return response;
  },
  (error) => {
    return new Promise((_, reject) => {
      reject(error);
    });
  }
);

/** create an axios instance */
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    common: {
      "X-Frame-Options": "sameorigin",
      Authorization: `Bearer ${token}`,
    },
  },
});

export default instance;
