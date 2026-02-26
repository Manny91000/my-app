"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Nombre y email válidos son requeridos.");
      return;
    }

    const res = await signIn("credentials", {
      name: form.name,
      email: form.email,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError(res?.error || "Error al autenticar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen grid place-items-center">
      <div className="max-w-md p-6 border rounded">
        <h1 className="text-2xl font-bold mb-4">Entrar / Registrar</h1>
        <label>Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="py-2 px-3 rounded border w-full mb-3"
          required
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="py-2 px-3 rounded border w-full mb-3"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="w-full py-2.5 bg-black text-white rounded" type="submit">Entrar</button>
      </div>
    </form>
  );
}
