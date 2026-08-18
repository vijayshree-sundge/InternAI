"use client";
import KanbanBoard from "@/components/KanbanBoard";

export default function InternDashboard() {
  // TODO Day 8: pull real userId from JWT/localStorage instead of hardcoding
  const userId = 1;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Tasks</h1>
      <KanbanBoard userId={userId} />
    </div>
  );
}