import { Outlet } from "react-router-dom";
import { useAuth } from "@/store/slices/auth.slice";
import AdminSidebar from "./AdminSidebar";


export default function AdminLayout() {
  const { logout } = useAuth();

  
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Painel de Administração</h1>
          </div>
          {children}
        </div>
      </div>
    );
  };
  
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

