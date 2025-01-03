import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Tic Tac Toe",
  description:
    "A modern, responsive Tic Tac Toe game with AI opponent and sleek design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-purple-100 dark:bg-purple-950 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
