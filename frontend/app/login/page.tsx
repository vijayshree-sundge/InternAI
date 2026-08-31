"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      router.push(data.role === "Manager" ? "/manager" : "/intern");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-96 space-y-4">
        <h1 className="text-2xl font-bold">InternAI Login</h1>
        <input className="border p-2 w-full rounded" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full rounded" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={handleLogin}>
          Sign In
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
