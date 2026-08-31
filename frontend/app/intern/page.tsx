"use client";
import KanbanBoard from "@/components/KanbanBoard";
import { getCurrentUserId } from "@/lib/auth";

export default function InternDashboard() {
  const userId = getCurrentUserId();

  if (!userId) {
    return <div className="p-8 text-slate-600">Unable to load user. Please log in again.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Tasks</h1>
      <KanbanBoard userId={userId} />
    </div>
  );
}