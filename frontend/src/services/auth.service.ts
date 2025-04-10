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
        name: "Administrador",
        email: validUser.email,
      },
      token: "fake-jwt-token",
    };
  } else {
    throw new Error("Credenciais inválidas");
  }
};

