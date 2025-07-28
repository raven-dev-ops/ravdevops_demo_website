import React from 'react';
import { motion } from 'framer-motion';

// Import your individual demo components
import CodeOverhaul from '../components/CodeOverhaul';
import CodeAudit from '../components/CodeAudit';
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
    { id: 'code-overhaul', title: 'Project Management: Code Overhaul Simulation', Component: CodeOverhaul, desc: "See a step-by-step simulation of a code overhaul project, from initial audit to deployment. Click 'Start Overhaul' to watch each project phase update in real-time." },
    { id: 'code-audit', title: 'Code Auditing & Testing: Automated Audit', Component: CodeAudit, desc: "Watch a code audit and test coverage process in action, including static analysis, test generation, and coverage reporting. Click 'Start Audit' to see how code quality is measured." },
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
    return (
        <section id={id} className="py-16 px-6 lg:py-24 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-12">Interactive Demos</h2>

                <div className="space-y-16">
                    {demoSections.map((demo, index) => (
                         // Check if the Component exists before rendering
                        demo.Component ? (
                            <motion.div
                                key={demo.id}
                                id={`demo-${demo.id}`} // Anchor link target
                                className="border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-raven-dark mb-3">{demo.title}</h3>
                                <p className="text-gray-600 mb-6">{demo.desc}</p>
                                <div className="bg-gray-50 p-4 rounded-md border border-gray-100 min-h-[200px] flex items-center justify-center overflow-hidden">
                                    {/* Render the dynamically imported component */}
                                    <demo.Component />
                                </div>
                            </motion.div>
                        ) : (
                            // Optional: Render a placeholder if a component is missing
                            <div key={demo.id} id={`demo-${demo.id}`} className="border border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center text-gray-500">
                                <h3 className="text-2xl font-semibold text-raven-dark mb-3">{demo.title}</h3>
                                <p className="mb-6">{demo.desc}</p>
                                <p>(Demo Component Missing for ID: {demo.id})</p>
                             </div>
                         )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Demos;
