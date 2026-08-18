export type Task = {
  id: number;
  title: string;
  description: string;
  type: string;
  status: "ToDo" | "InProgress" | "Review" | "Done";
  deadline: string;
  assignedToUserId: number;
};