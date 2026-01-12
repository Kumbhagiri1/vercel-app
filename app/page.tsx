export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
        📚 School AI
      </h1>

      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Your AI-powered school assistant. Ask questions, learn concepts, and
        explore your study materials intelligently.
      </p>

      <div className="mt-8">
        <button className="rounded-xl bg-black px-6 py-3 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
          Start Learning
        </button>
      </div>
    </main>
  );
}
