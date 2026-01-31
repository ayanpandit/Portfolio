import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQItem = ({ number, question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div 
      className="border-b border-gray-800"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-8">
          <span className="text-gray-500 text-base font-light min-w-[45px]">{number}</span>
          <h3 className="text-white text-[28px] font-light tracking-tight leading-tight">{question}</h3>
        </div>
        <Plus 
          className={`text-white flex-shrink-0 transition-transform duration-300 ml-8 ${isOpen ? 'rotate-45' : ''}`} 
          size={28}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? 200 : 0,
          opacity: isOpen ? 1 : 0,
          paddingBottom: isOpen ? 24 : 0,
          paddingLeft: isOpen ? 85 : 85,
        }}
      >
        <div className="text-gray-400 text-lg font-light" style={{transition: 'opacity 0.5s, transform 0.5s', transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'}}>
          {isOpen && <p>{answer}</p>}
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
        className="relative z-10 max-w-6xl mx-auto px-8 py-20"
        style={{ y }}
      >
        <motion.h1 
          className="text-white text-6xl font-serif mb-20 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h1>
        
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