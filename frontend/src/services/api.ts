const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL =>", API_URL);

export async function login(usuario: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, password }),
  });

  if (!response.ok) {
    throw new Error("Login incorrecto");
  }

  return response.json();
}
