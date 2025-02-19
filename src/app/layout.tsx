import "../app/globals.css";
import DarkModeToggle from "../components/DarkModeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap App",
  description: "Track your learning progress with an interactive roadmap.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between">
          <h1 className="text-xl font-semibold">Roadmap App</h1>
          <DarkModeToggle />
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; {new Date().getFullYear()} Roadmap App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
