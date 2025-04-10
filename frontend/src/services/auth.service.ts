import { AuthResponse, LoginCredentials } from "@/store/types/auth.types";

export const loginUser = async (credentials: LoginCredentials) => {
  // Simulando um usuário hardcoded
  const validUser = {
    email: "admin@techhub.com",
    password: "12345",
  };

  if (
    credentials.email === validUser.email &&
    credentials.password === validUser.password
  ) {
    return {
      user: {
        id: '1',
        name: "Administrador",
        email: validUser.email,
        role: "admin",
        avatarUrl: "https://via.placeholder.com/150"
      },
      token: "fake-jwt-token",
    };
  } else {
    throw new Error("Credenciais inválidas");
  }
};

