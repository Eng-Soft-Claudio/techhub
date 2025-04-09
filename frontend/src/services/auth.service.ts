import { AuthResponse, LoginCredentials } from "@/store/types/auth.types";

export async function loginUser({ email, password }: LoginCredentials): Promise<AuthResponse> {
  return {
    token: "fake_token",
    user: {
      id: "1",
      name: "Admin",
      email, 
      role: "admin", 
      avatarUrl: "https://i.pravatar.cc/150?u=admin" 
    }
  };
}
