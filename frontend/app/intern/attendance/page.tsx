"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getCurrentUserId } from "@/lib/auth";

type AttendanceRecord = { id: number; date: string; status: string; note: string | null };

export default function AttendancePage() {
  const userId = getCurrentUserId();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    if (!userId) return;
    api.get(`/attendance/${userId}`).then(res => setRecords(res.data));
  }, [userId]);

  if (!userId) return <div className="p-8 text-slate-600">Please log in again.</div>;

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-slate-900 mb-4">My Attendance</h1>
      <div className="bg-white rounded-lg border divide-y">
        {records.length === 0 && <p className="p-4 text-sm text-slate-400">No attendance records yet.</p>}
        {records.map(r => (
          <div key={r.id} className="flex justify-between p-3 text-sm">
            <span>{r.date}</span>
            <span className={
              r.status === "Present" ? "text-emerald-600 font-medium" :
              r.status === "Absent" ? "text-red-600 font-medium" : "text-amber-600 font-medium"
            }>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
