"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import api from "@/lib/api";
import { Task } from "@/lib/types";
import KanbanColumn from "./KanbanColumn";

const COLUMNS = ["ToDo", "InProgress", "Review", "Done"] as const;

export default function KanbanBoard({ userId }: { userId: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get(`/tasks/mine/${userId}`).then(res => setTasks(res.data));
  }, [userId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = String(over.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as Task["status"] } : t));

    try {
      await api.patch(`/tasks/${taskId}/status`, JSON.stringify(newStatus), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // revert on failure
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: task.status } : t));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <KanbanColumn key={col} status={col} tasks={tasks.filter(t => t.status === col)} />
        ))}
      </div>
    </DndContext>
  );
}