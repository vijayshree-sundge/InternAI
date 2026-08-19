import { useEffect, useState } from "react";
import api from "@/lib/api";

type Msg = {
  id: number;
  taskItemId: number;
  senderUserId: number;
  content: string;
  type: "text" | "code" | "ai_feedback";
  sentAt: string;
};

export default function SubmissionChat({ taskId }: { taskId: number }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [msgType, setMsgType] = useState<"text" | "code">("text");

  useEffect(() => {
    api.get(`/tasks/${taskId}/messages`).then(res => setMessages(res.data));
  }, [taskId]);

  const send = async () => {
    if (!input.trim()) return;
    const { data } = await api.post(`/tasks/${taskId}/messages`, { content: input, type: msgType });
    setMessages(prev => [...prev, data]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg bg-white">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map(m => (
          <div key={m.id}
            className={m.type === "ai_feedback" ? "bg-indigo-50 p-2 rounded" : "bg-slate-100 p-2 rounded"}>
            <pre className="text-xs whitespace-pre-wrap font-sans">{m.content}</pre>
          </div>
        ))}
        {messages.length === 0 && <p className="text-xs text-slate-400">No messages yet.</p>}
      </div>
      <div className="border-t p-2 space-y-2">
        <div className="flex gap-2 text-xs">
          <button onClick={() => setMsgType("text")}
            className={msgType === "text" ? "font-bold text-indigo-600" : "text-slate-500"}>Text</button>
          <button onClick={() => setMsgType("code")}
            className={msgType === "code" ? "font-bold text-indigo-600" : "text-slate-500"}>Code</button>
        </div>
        <div className="flex gap-2">
          <textarea className="flex-1 border rounded p-1 text-sm" rows={2}
            value={input} onChange={e => setInput(e.target.value)} />
          <button className="bg-indigo-600 text-white px-3 rounded" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}