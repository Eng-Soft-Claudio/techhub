import { Outlet } from "react-router-dom";
import { useAuth } from "@/store/useAuth";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-background">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Painel Admin</h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Sair
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
