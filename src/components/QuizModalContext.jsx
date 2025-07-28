// components/QuizModalContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  Suspense,
} from "react";

// Lazy load all quiz components for performance!
const quizImportMap = {
  "testing-demo": () => import("./TestingDemoQuiz"),
  "code-overhaul-demo": () => import("./CodeOverhaulDemoQuiz"),
  "code-testing-demo": () => import("./CodeTestingDemoQuiz"),
  "it-consulting-demo": () => import("./ITConsultingDemoQuiz"),
  "leadership-demo": () => import("./LeadershipDemoQuiz"),
  "project-mgmt-demo": () => import("./ProjectMgmtDemoQuiz"),
  "tech-writing-demo": () => import("./TechWritingDemoQuiz"),
  "training-tool-demo": () => import("./TrainingToolDemoQuiz"),
  "workflow-demo": () => import("./WorkflowDemoQuiz"),
  // Add new quizzes here as needed...
};

const QuizModalContext = createContext();

export function QuizModalProvider({ children }) {
  const [quizKey, setQuizKey] = useState(null);
  const [QuizComponent, setQuizComponent] = useState(null);
  const modalRef = useRef(null);

  // Handle dynamic import of quiz
  useEffect(() => {
    let isActive = true;
    if (quizKey && quizImportMap[quizKey]) {
      quizImportMap[quizKey]()
        .then((mod) => {
          if (isActive) setQuizComponent(() => mod.default);
        })
        .catch(() => {
          if (isActive)
            setQuizComponent(() => () => (
              <div className="text-red-600">Quiz failed to load.</div>
            ));
        });
    } else {
      setQuizComponent(null);
    }
    return () => {
      isActive = false;
    };
  }, [quizKey]);

  // Keyboard: Close modal on ESC
  useEffect(() => {
    if (!quizKey) return;
    const escListener = (e) => {
      if (e.key === "Escape") setQuizKey(null);
    };
    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, [quizKey]);

  // Click outside: close modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) setQuizKey(null);
  };

  // Open/close handlers
  const openQuiz = useCallback((key) => setQuizKey(key), []);
  const closeQuiz = useCallback(() => setQuizKey(null), []);

  return (
    <QuizModalContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
      {QuizComponent && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity"
          onMouseDown={handleBackdropClick}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fadeIn"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={closeQuiz}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
              aria-label="Close quiz modal"
            >
              &times;
            </button>
            <div className="p-5">
              <Suspense fallback={<div className="text-center p-4">Loading quiz…</div>}>
                <QuizComponent />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </QuizModalContext.Provider>
  );
}

export function useQuizModal() {
  return useContext(QuizModalContext);
}
