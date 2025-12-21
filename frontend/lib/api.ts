import { BACKEND_URL } from "./config"

export async function postJSON<T>(
  path: string,
  body: Record<string, any>
): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${path} failed: ${text}`)
  }

  return res.json()
}

export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${path} failed: ${text}`)
  }

  return res.json()
}
