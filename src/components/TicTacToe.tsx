"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Square } from "./Square";
import { GameInfo } from "./GameInfo";
import { XIcon, CircleIcon, RefreshCwIcon } from "lucide-react";
import { checkWinner, getBestMove } from "../utils/ai";
import { useWindowSize } from "../hooks/useWindowSize";

type Player = "X" | "O" | null;
type GameMode = "human" | "easyAI" | "mediumAI" | "hardAI";
type Board = Player[];

const initialBoard: Board = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player | "draw">(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("human");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const { width, height } = useWindowSize();

  const handleGameEnd = useCallback((result: Player | "draw") => {
    setWinner(result);
    setScores((prev) => ({
      ...prev,
      [result as "X" | "O" | "draw"]: prev[result as "X" | "O" | "draw"] + 1,
    }));
    if (result !== "draw") {
      setShowConfetti(true);
    }
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        handleGameEnd(newWinner);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, winner, handleGameEnd]
  );

  const resetGame = useCallback(() => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setShowConfetti(false);
  }, []);

  useEffect(() => {
    if (gameMode !== "human" && currentPlayer === "O" && !winner) {
      const timer = setTimeout(() => {
        const difficulty = gameMode.replace("AI", "").toLowerCase() as
          | "easy"
          | "medium"
          | "hard";
        const aiMove = getBestMove(board, difficulty);
        handleClick(aiMove);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, gameMode, winner, handleClick]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
        Tic Tac Toe
      </h1>
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <GameInfo
        currentPlayer={currentPlayer}
        winner={winner}
        scores={scores}
        gameMode={gameMode}
        setGameMode={setGameMode}
      />
      <motion.button
        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
        onClick={resetGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCwIcon className="h-5 w-5" />
      </motion.button>
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            {winner === "draw" ? (
              "It's a draw!"
            ) : (
              <>
                Winner:{" "}
                {winner === "X" ? (
                  <XIcon className="inline h-8 w-8 text-red-500" />
                ) : (
                  <CircleIcon className="inline h-8 w-8 text-blue-500" />
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </div>
  );
}
