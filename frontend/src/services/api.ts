const API_URL = "https://logintest-oqud.onrender.com";

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
