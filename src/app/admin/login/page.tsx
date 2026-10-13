import Image from "next/image";
import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form action={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <Image src="/images/logo.png" alt="" width={72} height={72} className="mx-auto rounded-full" preload />
        <h1 className="mt-4 text-center font-serif text-lg tracking-widest uppercase">Viñales · Admin</h1>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="label">Usuario</label>
            <input id="username" name="username" type="text" required autoComplete="username" className="input" />
          </div>
          <div>
            <label htmlFor="password" className="label">Contraseña</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red">Usuario o contraseña incorrectos.</p>}

        <button type="submit" className="btn-primary mt-6 w-full py-3">Entrar</button>
      </form>
    </div>
  );
}
