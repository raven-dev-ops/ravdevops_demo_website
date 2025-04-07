import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSound from '../hooks/useSound'; // Check this import path is correct relative to Contact.jsx

const Contact = ({ id }) => {
  // Correct state initialization
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // Initialize the sound hook
  const playRavenSound = useSound('/audio/raven-caw.mp3'); // Path relative to public folder

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Standard event prevention

    playRavenSound(); // Call the sound function

    // Optional: Add a tiny delay if needed
    // await new Promise(resolve => setTimeout(resolve, 100));

    setIsSubmitting(true);
    setSubmitStatus(null);

    // --- START PLACEHOLDER SUBMISSION LOGIC ---
    // IMPORTANT: Replace this with your actual form submission
    console.log('Form Data Submitted (Placeholder):', formData);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate success/error
      const success = Math.random() > 0.2; // Simulate 80% success rate
      if (success) {
        console.log('Simulated Success');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form on success
      } else {
        throw new Error('Simulated Submission Error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
    // --- END PLACEHOLDER SUBMISSION LOGIC ---
  };

  // Correct JSX structure
  return (
    <section id={id} className="py-16 px-6 lg:py-24 bg-gradient-to-r from-raven-blue to-blue-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Eliminate Inefficiencies?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-blue-100 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Let's discuss how Raven Development can build the right technology solution for your business. Contact us today for your free, no-obligation consultation.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl text-left max-w-lg mx-auto text-raven-dark"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Display Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded text-center">
              Thank you! Your message has been sent. We'll be in touch within one business day.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded text-center">
              Oops! Something went wrong. Please try again or email us directly at <a href="mailto:support@ravdevops.com" className="font-semibold underline">hello@ravendev.com</a>.
            </div>
          )}

          {/* Form Fields - Hide form after successful submission */}
          {!submitStatus || submitStatus === 'error' ? (
            <div className="space-y-4">
              <div>
                {/* Using unique id/htmlFor */}
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message / What You Need Help With</label>
                <textarea
                  name="message"
                  id="contact-message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-raven-blue focus:border-raven-blue"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <div>
                {/* Submit button triggers handleSubmit which plays sound */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-raven-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Request Your Free Consultation'}
                </button>
              </div>
            </div>
          ) : null}
        </motion.form>

        {/* Corrected motion.div */}
        <motion.div
            className="mt-8 text-blue-100 text-sm"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>Or call us: <a href="tel:402:969:9711" className="font-semibold hover:underline">402-969-9711</a> | Email: <a href="mailto:support@ravdevops.com" className="font-semibold hover:underline">support@ravdevops.com</a></p>
          <p className="mt-2">Thank you for reaching the very bottom of our expo demo for our services!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; // Default export