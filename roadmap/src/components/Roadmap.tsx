"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const MIN_STEPS = 8;

const generateSteps = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Step ${index + 1}`,
    description: `Description for Step ${index + 1}`,
  }));
};

export default function Roadmap() {
  // Load data from localStorage correctly
  const [steps, setSteps] = useState(() => {
    const storedSteps = localStorage.getItem("steps");
    return storedSteps ? JSON.parse(storedSteps) : generateSteps(MIN_STEPS);
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("completedSteps") || "[]");
  });

  const [currentStep, setCurrentStep] = useState<number>(completedSteps.length ? Math.max(...completedSteps) + 1 : 1);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Ensure steps & completed steps persist after a refresh
  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [steps, completedSteps]);

  // Sync Dark Mode with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Handle step click
  const handleStepClick = (id: number) => {
    if (id > currentStep) return; // Prevent skipping steps
    setSelectedStep(id);

    if (!completedSteps.includes(id)) {
      setCompletedSteps((prevSteps) => {
        const updatedSteps = [...prevSteps, id];
        localStorage.setItem("completedSteps", JSON.stringify(updatedSteps)); 
        return updatedSteps;
      });
      setCurrentStep(id + 1);
      toast.success(`Step ${id} completed! Moving to Step ${id + 1} 🚀`);
    }
  };

  // Reset function (clears localStorage)
  const reset = () => {
    toast.error(`All project reset!`);
    localStorage.clear();
    location.reload();
  };

  // Infinite Scroll: Load more steps when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setTimeout(() => {
          setSteps((prevSteps: any) => {
            const newSteps = [
              ...prevSteps,
              ...generateSteps(3).map((step) => ({
                ...step,
                id: prevSteps.length + step.id,
              })),
            ];
            localStorage.setItem("steps", JSON.stringify(newSteps)); 
            return newSteps;
          });
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Reset Button */}
      <div
        className="fixed bottom-0 right-0 m-4 w-16 h-16 flex items-center justify-center bg-red-400 dark:bg-red-600 rounded-full shadow-md cursor-pointer"
        onClick={reset}
      >
        Reset
      </div>

      <h2 className="text-2xl font-bold mb-6">Project Roadmap</h2>

      <div className="relative w-full flex flex-col items-center gap-8">
        {steps.map((step: any, index: any) => (
          <div key={step.id} className={`flex w-full max-w-lg items-center gap-4 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            {/* Step Circle */}
            <div
              className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full shadow-md border-2
                ${completedSteps.includes(step.id) ? "bg-green-500 text-white border-green-600" : "bg-blue-500 text-white border-blue-600"}
                ${step.id > currentStep ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              `}
              onClick={() => handleStepClick(step.id)}
            >
              {step.id}
              {(currentStep === step.id || selectedStep === step.id) && (
                <motion.div
                  className="absolute w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white"
                  layoutId="avatar"
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  🚀
                </motion.div>
              )}
            </div>

            {/* Step Content */}
            <div
              className={`flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-64 border 
                ${completedSteps.includes(step.id) ? "border-green-500" : "border-gray-300 dark:border-gray-700"}
                ${step.id > currentStep ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              onClick={() => handleStepClick(step.id)}
            >
              <h3 className="text-lg font-semibold">Chapter {step.id}</h3>
              <p className="text-gray-700 dark:text-gray-300">Description for {step.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
