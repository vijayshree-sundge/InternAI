import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  nameid: string; // ASP.NET Core's default claim name for NameIdentifier when serialized to JWT
  role: string;
};

export function getCurrentUserId(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return Number(decoded.nameid);
  } catch {
    return null;
  }
}

export function getCurrentUserRole(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role;
  } catch {
    return null;
  }
}