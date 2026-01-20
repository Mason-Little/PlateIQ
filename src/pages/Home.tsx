export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold">React Gym</h1>
        <p className="mt-2 text-slate-600">
          One page, one component. Clean starting point.
        </p>
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">
            Start here: edit <span className="font-medium">Home</span> and add
            UI.
          </p>
        </div>
      </section>
    </main>
  );
}
