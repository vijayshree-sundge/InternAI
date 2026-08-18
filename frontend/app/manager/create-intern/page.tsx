"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function CreateInternPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", batchId: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/users/intern", {
        ...form,
        batchId: form.batchId ? Number(form.batchId) : null
      });
      setMessage("Intern created successfully.");
      setForm({ name: "", email: "", password: "", batchId: "" });
    } catch {
      setMessage("Failed to create intern.");
    }
  };

  return (
    <div className="p-8 max-w-md space-y-4">
      <h1 className="text-xl font-bold">Create Intern</h1>
      <input className="border p-2 w-full rounded" placeholder="Name"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full rounded" type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Batch ID (optional)"
        value={form.batchId} onChange={e => setForm({ ...form, batchId: e.target.value })} />
      <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={handleSubmit}>
        Create Intern
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </div>
  );
}