import { LoginRequestDTO, LoginResponseDTO } from "./../types";
import { api } from "./api";

async function login({ email, password }: LoginRequestDTO): Promise<LoginResponseDTO> {
  return api.post<LoginResponseDTO>(`/auth/login?email=${email}&password=${password}`).then((res) => res.data);
}

function logout() {
  localStorage.removeItem("user");
}

export { login, logout };
