import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100">
      <Outlet />
    </main>
  );
}