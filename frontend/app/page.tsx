import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <span className="font-bold text-xl">InternAI</span>
        <Link href="/login" className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500">
          Sign In
        </Link>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-8 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          AI-Powered Internship Management
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          Kanban task tracking, chat-based code submissions, and automated AI code
          evaluation \u2014 built for Strides Software Solutions.
        </p>
        <Link href="/login" className="inline-block bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500">
          Get Started
        </Link>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-8 pb-24">
        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase text-indigo-300 mb-2">Feature 1</p>
          <h3 className="text-xl font-bold mb-2">Kanban Dashboard</h3>
          <p className="text-slate-400 text-sm">
            Per-intern board with a four-state workflow \u2014 To Do, In Progress, Review, Done.
          </p>
        </div>
        <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-white/10 rounded-2xl p-6">
          <p className="text-xs uppercase text-indigo-300 mb-2">Feature 2</p>
          <h3 className="text-xl font-bold mb-2">Chat-Based Submission</h3>
          <p className="text-slate-400 text-sm">
            Submit code, get AI score and suggestions inline, all in one thread per task.
          </p>

 </div>
      </section>
    </main>
  );
}
