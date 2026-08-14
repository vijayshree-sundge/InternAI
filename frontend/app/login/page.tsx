// frontend/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    router.push(data.role === "Manager" ? "/manager" : "/intern");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-96 space-y-4">
        <h1 className="text-2xl font-bold">InternAI Login</h1>
        <input className="border p-2 w-full rounded" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}