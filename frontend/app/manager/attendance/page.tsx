"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type Intern = { id: number; name: string };

export default function ManagerAttendancePage() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/stats/by-batch").then(() => {});
    // Reuse users list; simplest: fetch all users and filter client-side
    api.get("/users").then(res => setInterns(res.data.filter((u: any) => u.role === "Intern"))).catch(() => {});
  }, []);

  const mark = async (userId: number, status: string) => {
    await api.post("/attendance/mark", { userId, date, status });
    setMessage(`Marked ${status} for user ${userId} on ${date}`);
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-slate-900 mb-4">Mark Attendance</h1>
      <input type="date" className="border p-2 rounded mb-4" value={date} onChange={e => setDate(e.target.value)} />
      <div className="bg-white rounded-lg border divide-y">
        {interns.map(i => (
          <div key={i.id} className="flex justify-between items-center p-3 text-sm">
            <span>{i.name}</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded" onClick={() => mark(i.id, "Present")}>Present</button>
              <button className="px-2 py-1 bg-red-100 text-red-700 rounded" onClick={() => mark(i.id, "Absent")}>Absent</button>
              <button className="px-2 py-1 bg-amber-100 text-amber-700 rounded" onClick={() => mark(i.id, "Leave")}>Leave</button>
            </div>
          </div>
        ))}
      </div>
      {message && <p className="text-sm text-slate-500 mt-3">{message}</p>}
    </div>
  );
}
