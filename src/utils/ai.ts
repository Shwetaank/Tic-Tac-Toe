type Player = "X" | "O" | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export function checkWinner(board: Board): Player | "draw" | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every((cell) => cell !== null) ? "draw" : null;
}

function getAvailableMoves(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

function evaluateBoard(board: Board, depth: number): number {
  const winner = checkWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  return 0;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): { score: number; move?: number } {
  const winner = checkWinner(board);
  if (winner !== null || depth === 0) {
    return { score: evaluateBoard(board, depth) };
  }

  const availableMoves = getAvailableMoves(board);
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove: number | undefined;

  for (const move of availableMoves) {
    board[move] = isMaximizing ? "O" : "X";
    const { score } = minimax(board, depth - 1, !isMaximizing, alpha, beta);
    board[move] = null;

    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
      beta = Math.min(beta, bestScore);
    }

    if (beta <= alpha) break; // Alpha-beta pruning
  }

  return { score: bestScore, move: bestMove };
}

export function getBestMove(
  board: Board,
  difficulty: "easy" | "medium" | "hard"
): number {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    throw new Error("No available moves");
  }

  switch (difficulty) {
    case "easy":
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    case "medium":
      return Math.random() < 0.5
        ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
        : minimax(board, 3, true).move!;
    case "hard":
      return minimax(board, 9, true).move!;
    default:
      throw new Error("Invalid difficulty level");
  }
}
