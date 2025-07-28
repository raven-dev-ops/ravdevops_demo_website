// components/Demos.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useQuizModal } from '../components/QuizModalContext';

// Import your demo components from the demos directory
import CodeOverhaulDemo from '../demos/CodeOverhaulDemo';
import CodeTestingDemo from '../demos/CodeTestingDemo';
import ChatbotDemo from '../demos/ChatbotDemo';
import WorkflowDemo from '../demos/WorkflowDemo';
import SaaSDashboardDemo from '../demos/SaaSDashboardDemo';
import TestingDemo from '../demos/TestingDemo';
import TechWritingDemo from '../demos/TechWritingDemo';
import LeadershipDemo from '../demos/LeadershipDemo';
import ITConsultingDemo from '../demos/ITConsultingDemo';
import ProjectMgmtDemo from '../demos/ProjectMgmtDemo';
import TrainingToolDemo from '../demos/TrainingToolDemo';

const demoSections = [
    {
        id: 'code-overhaul',
        title: 'Project Management: Code Overhaul Simulation',
        Component: CodeOverhaulDemo,
        desc: "See a step-by-step simulation of a code overhaul project, from initial audit to deployment. Click 'Start Overhaul' to watch each project phase update in real-time."
    },
    {
        id: 'code-audit',
        title: 'Code Auditing & Testing: Automated Audit',
        Component: CodeTestingDemo,
        desc: "Watch a code audit and test coverage process in action, including static analysis, test generation, and coverage reporting. Click 'Start Audit' to see how code quality is measured."
    },
    { id: 'ai-chatbot', title: 'Application Development: AI Chatbot', Component: ChatbotDemo, desc: "Try our sample AI Chatbot! Ask it basic questions about services to see conversational AI in action." },
    { id: 'workflow-automation', title: 'Custom Software: Workflow Automation', Component: WorkflowDemo, desc: "See how a simple custom tool can automate a tedious process like inventory checks. (Click to simulate)" },
    { id: 'saas-dashboard', title: 'SaaS Development: Analytics Dashboard', Component: SaaSDashboardDemo, desc: "Explore a mock SaaS dashboard interface showing key metrics and user data visualization." },
    { id: 'test-dashboard', title: 'Software Testing: Automated Test Runner', Component: TestingDemo, desc: "Simulate running an automated test suite. Click 'Run Tests' to see pass/fail results." },
    { id: 'user-guide', title: 'Technical Writing: Interactive User Guide', Component: TechWritingDemo, desc: "Experience a snippet of clear, interactive documentation. Click sections to reveal content." },
    { id: 'leadership-training', title: 'Leadership Development: Training Snippet', Component: LeadershipDemo, desc: "Engage with a sample interactive question from one of our leadership e-learning modules." },
    { id: 'it-assessment', title: 'IT Consulting: Mini Assessment', Component: ITConsultingDemo, desc: "Answer a few quick questions about your IT setup to see a sample recommendation." },
    { id: 'project-timeline', title: 'Project Management: Interactive Timeline', Component: ProjectMgmtDemo, desc: "View a simplified project timeline. See how tasks might progress through stages." },
    { id: 'onboarding-app', title: 'Training Tools: Employee Onboarding App', Component: TrainingToolDemo, desc: "Click through a mock onboarding checklist for a new employee." },
];

const Demos = ({ id }) => {
    const { openQuiz } = useQuizModal();

    // Handler for "Back to Top"
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id={id} className="py-16 px-6 lg:py-24 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">Interactive Demos</h2>

                <div className="space-y-16">
                    {demoSections.map((demo) =>
                        demo.Component ? (
                            <motion.div
                                key={demo.id}
                                id={`demo-${demo.id}`}
                                className="border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-raven-dark mb-3">{demo.title}</h3>
                                <p className="text-gray-600 mb-6">{demo.desc}</p>
                                <div className="bg-gray-50 p-4 rounded-md border border-gray-100 min-h-[200px] flex items-center justify-center overflow-hidden">
                                    <demo.Component />
                                </div>
                                {/* BUTTONS ROW */}
                                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                                    <a
                                        href={`/pages/${demo.id}`}
                                        className="bg-raven-blue hover:bg-raven-red text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200 text-center"
                                    >
                                        LEARN MORE
                                    </a>
                                    <button
                                        onClick={() => openQuiz(demo.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200 text-center"
                                    >
                                        Take Questionnaire
                                    </button>
                                    <button
                                        onClick={scrollToTop}
                                        className="bg-gray-200 hover:bg-gray-300 text-raven-dark font-semibold py-2 px-6 rounded-lg shadow transition duration-200 text-center"
                                    >
                                        Back to Top ↑
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div key={demo.id} id={`demo-${demo.id}`} className="border border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center text-gray-500">
                                <h3 className="text-2xl font-semibold text-raven-dark mb-3">{demo.title}</h3>
                                <p className="mb-6">{demo.desc}</p>
                                <p>(Demo Component Missing for ID: {demo.id})</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Demos;
