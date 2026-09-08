"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type Entry = { userId: number; name: string; avgScore: number };

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    api.get("/leaderboard").then(res => setEntries(res.data));
  }, []);

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-slate-900 mb-4">Leaderboard</h1>
      <div className="bg-white rounded-lg border divide-y">
        {entries.map((e, i) => (
          <div key={e.userId} className="flex justify-between items-center p-3 text-sm">
            <span className="flex items-center gap-3">
              <span className="w-6 text-center font-bold text-slate-400">{i + 1}</span>
              {e.name}
            </span>
            <span className="font-semibold text-indigo-600">{e.avgScore}/100</span>
          </div>
        ))}
        {entries.length === 0 && <p className="p-4 text-sm text-slate-400">No scores yet.</p>}
      </div>
    </div>
  );
}
