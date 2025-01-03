import { motion } from "framer-motion";

type GameHistoryProps = {
  history: ("X" | "O" | null)[][];
  jumpTo: (move: number) => void;
  currentMove: number;
  darkMode: boolean;
};

export const GameHistory: React.FC<GameHistoryProps> = ({
  history,
  jumpTo,
  currentMove,
  darkMode,
}) => {
  return (
    <div className="mt-8 w-full max-w-md">
      <h2 className="mb-4 text-2xl font-bold text-white">Game History</h2>
      <div className="max-h-60 overflow-y-auto">
        {history.map((_, move) => (
          <motion.button
            key={move}
            className={`mb-2 w-full rounded px-4 py-2 text-left transition-colors duration-300 ${
              move === currentMove
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => jumpTo(move)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {move === 0 ? "Game Start" : `Move #${move}`}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
