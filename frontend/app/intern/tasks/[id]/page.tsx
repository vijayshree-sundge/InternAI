"use client";
import { useParams } from "next/navigation";
import SubmissionChat from "@/components/SubmissionChat";

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = Number(params.id);

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-slate-900 mb-4">Task #{taskId}</h1>
      <SubmissionChat taskId={taskId} />
    </div>
  );
}