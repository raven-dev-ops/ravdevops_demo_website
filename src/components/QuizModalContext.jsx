// src/components/QuizModalContext.jsx

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

// Map of quiz keys to dynamic import functions (MUST match quiz folder structure!)
const quizImportMap = {
  "code-overhaul": () => import("../quiz/CodeOverhaulDemoQuiz"),
  "code-audit": () => import("../quiz/CodeTestingDemoQuiz"),
  "ai-chatbot": () => import("../quiz/ChatbotDemoQuiz"),
  "workflow-automation": () => import("../quiz/WorkflowDemoQuiz"),
  "saas-dashboard": () => import("../quiz/SaaSDashboardDemoQuiz"),
  "test-dashboard": () => import("../quiz/TestingDemoQuiz"),
  "user-guide": () => import("../quiz/TechWritingDemoQuiz"),
  "leadership-training": () => import("../quiz/LeadershipDemoQuiz"),
  "it-assessment": () => import("../quiz/ITConsultingDemoQuiz"),
  "project-timeline": () => import("../quiz/ProjectMgmtDemoQuiz"),
  "onboarding-app": () => import("../quiz/TrainingToolDemoQuiz"),
  // ...add more keys as you add quizzes
};

const QuizModalContext = createContext();

/**
 * QuizModalProvider – wraps your App for global quiz modals
 */
export function QuizModalProvider({ children }) {
  const [quizKey, setQuizKey] = useState(null);
  const [error, setError] = useState(null);
  const lastActiveElement = useRef(null);

  // Open quiz modal
  const openQuiz = useCallback((key) => {
    if (quizImportMap[key]) {
      lastActiveElement.current = document.activeElement;
      setQuizKey(key);
      setError(null);
    } else {
      setError("Quiz not found.");
    }
  }, []);

  // Close and restore focus
  const closeQuiz = useCallback(() => {
    setQuizKey(null);
    setError(null);
    setTimeout(() => {
      if (lastActiveElement.current && typeof lastActiveElement.current.focus === "function") {
        lastActiveElement.current.focus();
      }
    }, 10);
  }, []);

  // Trap focus and handle Escape for modal
  const modalRef = useRef(null);
  useEffect(() => {
    if (!quizKey) return;

    function handleKeydown(e) {
      if (e.key === "Escape") {
        closeQuiz();
        return;
      }
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
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [quizKey, closeQuiz]);

  // Dynamically lazy-load the quiz component
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (quizKey) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [quizKey]);

  return (
    <QuizModalContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      {quizKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fadeIn"
            ref={modalRef}
            aria-label="Quiz modal"
            tabIndex={0}
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
 * useQuizModal – Hook for opening/closing the quiz modal
 */
export function useQuizModal() {
  return useContext(QuizModalContext);
}
