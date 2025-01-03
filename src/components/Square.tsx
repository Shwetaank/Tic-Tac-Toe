import { motion, AnimatePresence } from "framer-motion";
import { XIcon, CircleIcon } from "lucide-react";

type SquareProps = {
  value: "X" | "O" | null;
  onClick: () => void;
};

export const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <motion.button
      className="flex h-20 w-20 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900 text-4xl font-bold text-indigo-800 dark:text-indigo-200 transition-colors duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {value === "X" ? (
              <XIcon className="h-12 w-12 text-red-500" />
            ) : (
              <CircleIcon className="h-12 w-12 text-blue-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
