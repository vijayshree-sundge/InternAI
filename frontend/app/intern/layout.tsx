import RequireRole from "@/components/RequireRole";

export default function InternLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="Intern">
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 px-8 py-4 flex gap-6">
          <a href="/intern" className="font-bold text-slate-900">InternAI</a>
          <a href="/intern" className="text-sm text-slate-600 hover:text-slate-900">Tasks</a>
          <a href="/intern/profile" className="text-sm text-slate-600 hover:text-slate-900">Profile</a>
        </nav>
        {children}
      </div>
    </RequireRole>
  );
}