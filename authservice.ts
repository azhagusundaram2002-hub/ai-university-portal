import api from "../api";

export interface LoginRequest {
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER";
  employeeId?: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: "STUDENT" | "TEACHER";
  employeeId?: string;
  createdAt: string;
}

export const login = async (
  data: LoginRequest
): Promise<UserResponse> => {
  const response = await api.post<UserResponse>("/users", data);
  return response.data;
};