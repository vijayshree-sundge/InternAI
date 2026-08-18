"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function CreateTaskPage() {
  const [form, setForm] = useState({ title: "", description: "", type: "Coding", deadline: "", assignedToUserId: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/tasks", {
        ...form,
        assignedToUserId: form.assignedToUserId ? Number(form.assignedToUserId) : null
      });
      setMessage("Task created.");
    } catch {
      setMessage("Failed to create task.");
    }
  };

  return (
    <div className="p-8 max-w-md space-y-4">
      <h1 className="text-xl font-bold">Create Task</h1>
      <input className="border p-2 w-full rounded" placeholder="Title"
        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="border p-2 w-full rounded" placeholder="Description"
        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <select className="border p-2 w-full rounded"
        value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option>Coding</option><option>Research</option><option>Presentation</option>
      </select>
      <input className="border p-2 w-full rounded" type="date"
        value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="Assign to Intern ID"
        value={form.assignedToUserId} onChange={e => setForm({ ...form, assignedToUserId: e.target.value })} />
      <button className="bg-indigo-600 text-white w-full py-2 rounded" onClick={handleSubmit}>
        Create Task
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </div>
  );
}
