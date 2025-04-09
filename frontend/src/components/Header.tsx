import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo ou nome do site */}
        <h1 className="text-xl font-bold text-blue-600">TechHub</h1>

        {/* Barra de busca */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-600 transition-colors">
            <User />
          </button>
          <button className="hover:text-blue-600 transition-colors">
            <ShoppingCart />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
