"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/types";

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const router = useRouter();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      onClick={() => router.push(`/intern/tasks/${task.id}`)}
      className="bg-white border border-slate-200 rounded p-3 mb-2 shadow-sm cursor-move hover:border-indigo-300">
      <p className="font-medium text-sm text-slate-900">{task.title}</p>
      <p className="text-xs text-slate-500 mt-1">{task.type}</p>
    </div>
  );
}