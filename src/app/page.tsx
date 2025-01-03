import TicTacToe from "@/components/TicTacToe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900 dark:to-indigo-950 p-4">
      <TicTacToe />
    </main>
  );
}
