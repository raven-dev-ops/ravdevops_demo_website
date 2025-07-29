import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    quote: `“They developed the website and profiles for our artists and then trained our staff to operate and maintain the website! We are appointment only and love our SEO boost! Get it done by the professionals!”`,
    author: "Skull 'N' Bones Tattoo",
    colorFrom: "from-blue-50",
    colorTo: "to-indigo-50",
  },
  {
    quote: `"I’d just started my business and was nervous after being burned by a friend on a logo project—I needed my money to count. With Raven, every week brought solutions, not just more questions. The meetings were collaborative, and for every barrier they brought several options I could pick from. I ended up with a logo I love and a process I could trust."`,
    author: "Rowe & Oak Coffee Co.",
    colorFrom: "from-yellow-50",
    colorTo: "to-amber-100",
  },
  {
    quote: `"We just wanted a funny music video and they found the perfect solution for what we wanted. Industry professional or average joe with an idea, ask for Damon!"`,
    author: "Toothless Wizard Records",
    colorFrom: "from-purple-50",
    colorTo: "to-violet-100",
  },
  {
    quote: `“Raven Development was my solution to get some niche graphics made quickly and within budget. Their research, consideration, and attention to detail, was really important for training our staff and guest experience.”`,
    author: "Mound City Pool",
    colorFrom: "from-teal-50",
    colorTo: "to-blue-100",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute", // Prevents stacking artifacts
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute", // Prevents stacking artifacts
  }),
};

const TestimonialCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const testimonial = testimonials[page];

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      let next = prevPage + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return [next, newDirection];
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10">
      <div className="relative w-full flex flex-col items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            layout // This line makes the height animate smoothly!
            className={`w-full p-6 rounded-lg shadow bg-gradient-to-r ${testimonial.colorFrom} ${testimonial.colorTo} border-l-4 border-raven-blue text-center flex flex-col justify-center items-center`}
            style={{ minHeight: 120 }}
          >
            <p className="text-gray-700 text-lg italic">{testimonial.quote}</p>
            <p className="mt-2 text-sm font-semibold text-gray-600">{testimonial.author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          aria-label="Previous testimonial"
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
        >
          <ChevronLeftIcon className="w-5 h-5 text-raven-blue" />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
        >
          <ChevronRightIcon className="w-5 h-5 text-raven-blue" />
        </button>
      </div>
      <div className="flex justify-center mt-2 gap-2">
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${idx === page ? "bg-raven-blue" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
