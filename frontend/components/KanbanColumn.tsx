"use client";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";

const LABELS: Record<string, string> = {
  ToDo: "To Do", InProgress: "In Progress", Review: "Review", Done: "Done",
};

export default function KanbanColumn({ status, tasks }: { status: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="bg-slate-50 rounded-lg p-3 min-h-[300px]">
      <h4 className="font-semibold text-sm mb-3 text-slate-700">{LABELS[status]} · {tasks.length}</h4>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </SortableContext>
    </div>
  );
}