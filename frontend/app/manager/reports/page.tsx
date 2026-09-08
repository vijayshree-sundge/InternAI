"use client";
import api from "@/lib/api";

export default function ReportsPage() {
  const downloadPdf = async () => {
    const res = await api.get("/reports/performance/pdf", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "InternAI_Performance_Report.pdf";
    a.click();
  };

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-xl font-bold text-slate-900 mb-4">Reports</h1>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={downloadPdf}>
        Download Performance Report (PDF)
      </button>
    </div>
  );
}
