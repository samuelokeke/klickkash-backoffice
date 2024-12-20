import { cookies } from "next/headers";

const token = cookies().get("token");

export async function get(url: string, query?: unknown) {
  const apiUrl = query ? `${url}?${query}` : url;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function post(url: string, body: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
}

export async function put(url: string) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function del(url: string) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
