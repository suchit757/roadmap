"use client";
import { useEffect, useState } from "react";
import Roadmap from "../components/Roadmap";

export default function Home() {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage & apply it
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md">

      <h1 className="text-4xl font-bold pb-6 m-6 shadow-md w-full text-center">Welcome to the Project</h1>
      <Roadmap />
    </main>
  );
}
