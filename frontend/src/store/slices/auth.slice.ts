import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser } from '@/services/auth.service';
import type { AuthState, LoginCredentials, User } from '@/store/types/auth.types';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        try {
          const { user, token } = await loginUser(credentials);
          set({ user: user as User, token, isAuthenticated: true });
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({ user: null, token: null, isAuthenticated: false });      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
