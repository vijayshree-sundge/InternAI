"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "@/lib/api";

type BatchStat = { batchId: number; internCount: number };

export default function AvgScoreChart() {
  const [data, setData] = useState<BatchStat[]>([]);

  useEffect(() => {
    api.get("/stats/by-batch").then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-72">
      <p className="text-sm font-semibold text-slate-700 mb-2">Interns per Batch</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="batchId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="internCount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
