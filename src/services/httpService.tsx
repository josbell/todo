const BASE_URL = "http://localhost:3000/"
const HEADERS = {"Content-Type": "application/json"}

//get
export async function getHttp<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  return response.json()
}

//post
export async function postHttp<T>(endpoint: string, body: {}): Promise<T> {
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, options)
  return response.json()
}

//patch
export async function patchHttp<T>(endpoint: string, id: string, body: {}): Promise<T> {
  const options = {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(body)
  }
  const response = await fetch(`${BASE_URL}${endpoint}/${id}`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json()
}

//delete
export async function deleteHttp<T>(endpoint: string, id: string): Promise<T> {
  const options = {
    method: 'DELETE',
    headers: HEADERS
  }
  const response = await fetch(`${BASE_URL}${endpoint}/${id}`, options)
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json()
}

