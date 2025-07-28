// src/quiz/QuizModalContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  Suspense,
  lazy,
} from "react";

// Map of quiz keys to dynamic import functions (add more as you create quizzes)
const quizImportMap = {
  "code-overhaul": () => import("./CodeOverhaulDemoQuiz"),
  "code-audit": () => import("./CodeTestingDemoQuiz"),
  "ai-chatbot": () => import("./ChatbotDemoQuiz"),
  "workflow-automation": () => import("./WorkflowDemoQuiz"),
  "saas-dashboard": () => import("./SaaSDashboardDemoQuiz"),
  "test-dashboard": () => import("./TestingDemoQuiz"),
  "user-guide": () => import("./TechWritingDemoQuiz"),
  "leadership-training": () => import("./LeadershipDemoQuiz"),
  "it-assessment": () => import("./ITConsultingDemoQuiz"),
  "project-timeline": () => import("./ProjectMgmtDemoQuiz"),
  "onboarding-app": () => import("./TrainingToolDemoQuiz"),
  // Add more keys as needed!
};

const QuizModalContext = createContext();

/**
 * Provider for quiz modal. Wrap your App in this.
 */
export function QuizModalProvider({ children }) {
  const [quizKey, setQuizKey] = useState(null);
  const [error, setError] = useState(null);
  const lastActiveElement = useRef(null);

  // Open quiz by key (call from anywhere)
  const openQuiz = useCallback((key) => {
    if (quizImportMap[key]) {
      lastActiveElement.current = document.activeElement;
      setQuizKey(key);
      setError(null);
    }
  }, []);

  // Close modal & restore focus for accessibility
  const closeQuiz = useCallback(() => {
    setQuizKey(null);
    setError(null);
    setTimeout(() => {
      if (lastActiveElement.current && lastActiveElement.current.focus) {
        lastActiveElement.current.focus();
      }
    }, 0);
  }, []);

  // Trap focus inside modal for accessibility
  const modalRef = useRef(null);
  useEffect(() => {
    if (!quizKey) return;
    const trapFocus = (e) => {
      if (!modalRef.current) return;
      const focusableEls = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableEls.length) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === "Escape") {
        closeQuiz();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [quizKey, closeQuiz]);

  // Lazy-load the component, or show error if not found
  let LazyQuizComponent = null;
  if (quizKey && quizImportMap[quizKey]) {
    LazyQuizComponent = lazy(async () => {
      try {
        return await quizImportMap[quizKey]();
      } catch (err) {
        setError("This quiz could not be loaded. Please try again later.");
        throw err;
      }
    });
  }

  return (
    <QuizModalContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      {quizKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fadeIn"
            ref={modalRef}
            tabIndex={-1}
            aria-label="Quiz modal"
          >
            <button
              onClick={closeQuiz}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
              aria-label="Close quiz modal"
              autoFocus
            >
              &times;
            </button>
            <div className="p-5">
              {error ? (
                <div className="text-red-600 text-center py-8">{error}</div>
              ) : LazyQuizComponent ? (
                <Suspense fallback={<div className="text-center py-8">Loading quiz…</div>}>
                  <LazyQuizComponent />
                </Suspense>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Quiz not found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </QuizModalContext.Provider>
  );
}

/**
 * Hook to use the modal (call openQuiz('quiz-key'))
 */
export function useQuizModal() {
  return useContext(QuizModalContext);
}
