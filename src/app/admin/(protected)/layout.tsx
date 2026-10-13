import { redirect } from "next/navigation";
import { db } from "@/db";
import { isAuthenticated } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "./actions";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen md:flex">
      <AdminNav logout={logout} />
      <main className="flex-1 px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-4xl">
          {!db ? (
            <div className="card border-red/30 p-6 text-sm">
              <p className="font-semibold text-red">Falta conectar la base de datos.</p>
              <p className="mt-2 text-ink/70">
                Configura <code>DATABASE_URL</code> y corre <code>npm run db:setup</code>.
              </p>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
