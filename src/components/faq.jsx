import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQItem = ({ number, question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div 
      className="border-b border-gray-800 mb-6"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 sm:py-8 md:py-10 text-left hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 sm:gap-5 md:gap-8">
          <span className="text-gray-500 text-xs sm:text-xs md:text-sm font-light min-w-[32px] sm:min-w-[38px] md:min-w-[45px]">{number}</span>
          <h3 className="text-white text-xs sm:text-sm md:text-base font-light tracking-tight leading-relaxed" style={{lineHeight: '2'}}>{question}</h3>
        </div>
        <Plus 
          className={`text-white flex-shrink-0 transition-transform duration-300 ml-3 sm:ml-5 md:ml-8 ${isOpen ? 'rotate-45' : ''}`} 
          size={18}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? 300 : 0,
          opacity: isOpen ? 1 : 0,
          paddingBottom: isOpen ? 36 : 0,
          paddingLeft: 50,
        }}
      >
        <div className="text-gray-400 text-xs sm:text-sm md:text-base font-light pl-1 sm:pl-2 md:pl-[35px] leading-relaxed" style={{transition: 'opacity 0.5s, transform 0.5s', transform: isOpen ? 'translateY(0)' : 'translateY(-10px)', lineHeight: '2.1'}}>
          {isOpen && <p className="leading-relaxed" style={{lineHeight: '2.1'}}>{answer}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const faqs = [
    { 
      number: '001.', 
      question: 'What does your standard website design package include?',
      answer: 'My standard package includes responsive design, modern UI/UX, performance optimization, SEO basics, and cross-browser compatibility. I also provide source code and documentation upon completion.'
    },
    { 
      number: '002.', 
      question: 'Do you handle both frontend and backend work?',
      answer: 'Yes, I am a full-stack developer. I can handle everything from frontend interfaces using React, Vue, or vanilla JavaScript to backend APIs with Node.js, Express, and database management.'
    },
    { 
      number: '003.', 
      question: 'How long does a website project usually take?',
      answer: 'Timeline varies based on complexity. A simple landing page takes 1-2 weeks, while a full-featured web application can take 4-8 weeks. I provide detailed timelines during the initial consultation.'
    },
    { 
      number: '004.', 
      question: 'Can you improve my site\'s SEO and performance?',
      answer: 'Absolutely! I optimize websites for speed, implement SEO best practices, ensure proper meta tags, improve Core Web Vitals, and make sites mobile-friendly to boost search rankings and user experience.'
    },
    { 
      number: '005.', 
      question: 'Do you offer maintenance after my website launches?',
      answer: 'Yes, I offer ongoing maintenance packages including updates, bug fixes, security patches, and feature additions. I can also provide training so you can manage content yourself.'
    }
  ];

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden playwrite-nz-basic"
      style={{ opacity }}
    >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20"
        style={{ y }}
      >
        {/* Header with line */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <motion.h1 
              className="text-white text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              FAQ
            </motion.h1>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>
        </div>
        
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              number={faq.number}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        
      </motion.div>
    </motion.div>
  );
};

export default FAQComponent;