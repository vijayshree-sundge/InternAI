
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import StatCard from "@/components/StatCard";
import AvgScoreChart from "@/components/AvgScoreChart";

type Stats = { totalInterns: number; activeTasks: number; avgScore: number };

export default function ManagerDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get("/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Manager Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Interns" value={stats.totalInterns} />
        <StatCard label="Active Tasks" value={stats.activeTasks} />
        <StatCard label="Avg Score" value={`${stats.avgScore.toFixed(1)}/100`} />
      </div>
      <AvgScoreChart />
    </div>
  );
}
