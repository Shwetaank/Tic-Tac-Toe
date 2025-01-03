import { XIcon, CircleIcon, UserIcon, CpuIcon } from "lucide-react";

type GameInfoProps = {
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  scores: { X: number; O: number; draw: number };
  gameMode: "human" | "easyAI" | "mediumAI" | "hardAI";
  setGameMode: (mode: "human" | "easyAI" | "mediumAI" | "hardAI") => void;
};

export const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  winner,
  scores,
  gameMode,
  setGameMode,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <XIcon className="h-6 w-6 text-red-500" />
          <span className="text-lg font-semibold">{scores.X}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{scores.draw}</span>
          <span className="text-lg font-semibold">Draws</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{scores.O}</span>
          <CircleIcon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      {!winner && (
        <div className="text-center text-lg font-semibold">
          Current Player:{" "}
          {currentPlayer === "X" ? (
            <XIcon className="inline h-6 w-6 text-red-500" />
          ) : (
            <CircleIcon className="inline h-6 w-6 text-blue-500" />
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {(["human", "easyAI", "mediumAI", "hardAI"] as const).map((mode) => (
          <button
            key={mode}
            className={`px-3 py-1 rounded-full transition-colors ${
              gameMode === mode
                ? "bg-indigo-500 text-white"
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            }`}
            onClick={() => setGameMode(mode)}
          >
            {mode === "human" ? (
              <>
                <UserIcon className="h-5 w-5 inline mr-1" /> vs{" "}
                <UserIcon className="h-5 w-5 inline ml-1" />
              </>
            ) : (
              <>
                <UserIcon className="h-5 w-5 inline mr-1" /> vs{" "}
                <CpuIcon className="h-5 w-5 inline ml-1" />{" "}
                {mode.replace("AI", "")}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
