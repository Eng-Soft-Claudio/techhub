import { NavLink } from "react-router-dom";
import { LayoutDashboard, Boxes, Settings } from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/categorias", label: "Categorias", icon: Boxes },
  { to: "/admin/produtos", label: "Produtos", icon: Boxes },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden md:block w-64 bg-muted h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-8">Admin</h2>
      <nav className="space-y-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted-foreground/10"
              }`
            }
            aria-label={label}
            aria-current={(({ isActive }) => (isActive ? "page" : undefined))({ isActive: true })} // Calcule o valor aqui
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
