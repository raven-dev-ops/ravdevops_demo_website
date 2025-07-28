import React from 'react';
import { motion } from 'framer-motion';
import { useQuizModal } from '../components/QuizModalContext';

const servicesList = [
  { 
    name: "Project Management: Code Overhaul", 
    desc: "Step-by-step simulation of a code overhaul project—from initial audit through deployment. See how a professional project is executed.",
    demoLink: "code-overhaul"
  },
  {
    name: "Code Auditing & Testing",
    desc: "Automated auditing, test generation, and coverage reporting to boost code quality. Watch the audit and test coverage process in action.",
    demoLink: "code-audit"
  },
  { name: "Application Development", desc: "Custom mobile and web apps to digitize workflows and engage customers.", demoLink: "ai-chatbot" },
  { name: "Custom Software Development", desc: "Tailor-made software built from scratch to solve unique business challenges.", demoLink: "workflow-automation" },
  { name: "SaaS Development", desc: "Scalable, cloud-based software-as-a-service platforms for your business idea.", demoLink: "saas-dashboard" },
  { name: "Software Testing", desc: "Comprehensive QA and automated testing to ensure your software is bug-free and reliable.", demoLink: "test-dashboard" },
  { name: "Technical Writing", desc: "Clear, user-friendly documentation and technical content to support users.", demoLink: "user-guide" },
  { name: "Leadership Development", desc: "Workshops and e-learning tools that cultivate leadership and teamwork skills.", demoLink: "leadership-training" },
  { name: "IT Consulting", desc: "Expert IT advisory to plan, implement, and optimize your technology strategy.", demoLink: "it-assessment" },
  { name: "Project Management", desc: "Professional planning and management to deliver tech projects on time and budget.", demoLink: "project-timeline" },
  { name: "Training Tools", desc: "Interactive training and onboarding tools to educate your team effectively.", demoLink: "onboarding-app" },
];

// Animation variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Services = ({ id }) => {
  const { openQuiz } = useQuizModal();

  // Function to handle smooth scroll to demo sections
  const scrollToDemo = (demoId) => {
    const element = document.getElementById(`demo-${demoId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Center demo vertically
    }
  };

  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-raven-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-raven-dark mb-4">Our Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          End-to-end development solutions designed to meet your specific business needs. Explore our capabilities below and see demos in action.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-raven-dark mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.desc}</p>
              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <button
                  onClick={() => scrollToDemo(service.demoLink)}
                  className="text-left text-raven-blue hover:text-raven-red font-medium text-sm transition duration-200 self-start"
                >
                  See Demo ↓
                </button>
                <button
                  onClick={() => openQuiz(service.demoLink)}
                  className="text-left text-green-600 hover:text-green-700 font-medium text-sm transition duration-200 self-start"
                >
                  Take Questionnaire
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
