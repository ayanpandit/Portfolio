import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StarryBackground from './hero_background';
import project1Image from '../assets/project1.svg';
import project1chalangeImage from '../assets/project1_2.svg';
import project2Image from '../assets/project2.svg';
import project3Image from '../assets/project3.svg';
import Footer from './footer';

export default function Project1() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative min-h-screen text-white playwrite-nz-basic">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cookie&family=Dancing+Script:wght@400..700&family=Playwrite+NZ+Basic:wght@100..400&display=swap');
        .playwrite-nz-basic {
          font-family: "Playwrite NZ Basic", cursive;
          font-optical-sizing: auto;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>

            {/* Fixed Starry Background */}
            <div className="fixed inset-0 z-0 bg-black">
                <StarryBackground />
            </div>

            {/* Header - Same as Hero */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-8">
                {/* Logo */}
                <motion.div
                    className="text-white text-3xl md:text-4xl italic cursor-pointer"
                    style={{ fontFamily: 'Dancing Script, cursive' }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={() => navigate('/')}
                >
                    AYAN PANDEY
                </motion.div>

                {/* Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col gap-2 group relative z-50 w-10 h-10 justify-center items-center"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : 'group-hover:w-10'
                            }`}
                    ></span>
                    <span
                        className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-10'
                            }`}
                    ></span>
                    <span
                        className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : 'group-hover:w-10'
                            }`}
                    ></span>
                </button>
            </header>

            {/* Brown Panel - Slides down to 75% of screen */}
            <div
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out ${isMenuOpen ? 'h-[75vh]' : 'h-0'
                    } overflow-hidden`}
                style={{ backgroundColor: '#8B4513' }}
            >
                {/* Navigation Menu Items */}
                <nav className="flex flex-col items-start justify-center h-full px-8 md:px-16 gap-4 pt-20 w-full">
                    <button
                        type="button"
                        className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
                        style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
                        onClick={() => {
                            toggleMenu();
                            navigate('/');
                        }}
                    >
                        <span>Home</span>
                        <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                    </button>
                    <button
                        type="button"
                        className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
                        style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
                        onClick={() => {
                            toggleMenu();
                            navigate('/');
                        }}
                    >
                        <span>Services</span>
                        <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                    </button>
                    <button
                        type="button"
                        className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
                        style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
                        onClick={() => {
                            toggleMenu();
                            navigate('/');
                        }}
                    >
                        <span>Projects</span>
                        <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                    </button>
                    <button
                        type="button"
                        className="group relative text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 flex items-center w-full overflow-hidden hover:scale-110 focus:scale-110 origin-center bg-transparent border-none cursor-pointer text-left"
                        style={{ fontFamily: 'Anton, Chela One, Norican, Oswald, Pompiere, Roboto Condensed, Varela Round, sans-serif' }}
                        onClick={() => {
                            toggleMenu();
                            navigate('/');
                        }}
                    >
                        <span>Get in touch</span>
                        <span className="ml-4 h-0.5 bg-white flex-grow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                    </button>
                </nav>
            </div>

            {/* Blur overlay when menu is open */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-30 backdrop-blur-md bg-black/30 transition-all duration-500" />
            )}

            {/* Scrollable Content */}
            <div className="relative z-10 pt-28 sm:pt-32 md:pt-36">
                {/* Content Section */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    {/* Go Back Button with curved arrow */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8 sm:mb-10 md:mb-12 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Curved back arrow */}
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        <span className="text-[13px] sm:text-[14px] md:text-[15px] font-light">Go back</span>
                    </motion.button>

                    {/* Project Title */}
                    <motion.h1
                        className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-light tracking-tight mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontFamily: 'serif' }}
                    >
                        Skillboard
                    </motion.h1>

                    {/* Project Description */}
                    <motion.p
                        className="text-gray-400 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] font-light max-w-xl mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                       SkillBoard is a web-based comparison platform that allows students to analyze and compare their coding performance across platforms like CodeChef and LeetCode, providing a unified view of individual strengths and progress.
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                        className="flex gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                        type="button"
                        onClick={() => window.open('https://skillboard-nit5.onrender.com/', '_blank', 'noopener,noreferrer')}
                        className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[13px] sm:text-[14px] md:text-[15px] text-gray-300 font-light transition-colors hover:bg-white/10 focus:outline-none"
                    >
                        Live Preview
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(315deg)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                        <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[13px] sm:text-[14px] md:text-[15px] text-gray-300 font-light">
                            2024
                        </span>
                    </motion.div>
                </div>

                {/* Project Image Section - Same styling as project.jsx */}
                <motion.div
                    className="relative w-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Project Image - Full width like project.jsx */}
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                        <div
                            className="block relative rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden aspect-[16/9] w-full"
                            style={{
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                        >
                            <img
                                src={project1Image}
                                alt="Pestorix Project Preview"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Mission Section */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
                        {/* Left - Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-[20px] sm:text-[24px] md:text-[28px] font-light"
                                style={{ fontFamily: 'serif' }}
                            >
                                Mission
                            </h2>
                        </motion.div>

                        {/* Right - Description */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-gray-400 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] font-light">
                              The mission of SkillBoard is to help students, institutes, and recruiters evaluate, compare, and rank coding performance by offering a clear and structured comparison of a student’s standing among peers.


                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Challenge Section */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
                    {/* Challenge Fullsize Image */}
                    <motion.div
                        className="relative w-full mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="block relative rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden aspect-[16/9] w-full"
                            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                        >
                            <img
                                src={project1chalangeImage}
                                alt="Pestorix Challenge Preview"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />
                        </div>
                    </motion.div>
                    {/* Challenge Heading and Text (like Mission) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
                        {/* Left - Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2
                                className="text-[20px] sm:text-[24px] md:text-[28px] font-light"
                                style={{ fontFamily: 'serif' }}
                            >
                                Challenge
                            </h2>
                        </motion.div>

                        {/* Right - Description */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-gray-400 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] font-light">
                              A major challenge was collecting data from platforms without public APIs, which was addressed by implementing a controlled and reliable web-scraping approach while maintaining data accuracy and stability.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Trending Projects Section (like attached image) */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24">
                    <div className="flex items-center gap-4 md:gap-6 lg:gap-8 mb-10">
                        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-light tracking-tight" style={{ fontFamily: 'serif' }}>
                            Trending projects
                        </h2>
                        <div className="flex-1 h-[1px] bg-white"></div>
                        <button
                            type="button"
                            className="text-white text-[13px] sm:text-[14px] md:text-[15px] font-light hover:underline bg-transparent border-none cursor-pointer"
                            onClick={() => navigate('/allproject')}
                        >
                            See all
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Project 2 - AllFileChanger */}
                        <div 
                            className="bg-[#f6e97b]/30 rounded-[24px] overflow-hidden flex flex-col items-center p-6 cursor-pointer hover:scale-[1.02] transition-transform"
                            onClick={() => navigate('/project/2')}
                        >
                            <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-6 border border-white/10">
                                <img src={project2Image} alt="AllFileChanger" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full flex flex-col items-start">
                                <span className="text-[20px] sm:text-[24px] md:text-[28px] font-light mb-1" style={{ fontFamily: 'serif' }}>AllFileChanger</span>
                                <span className="text-gray-400 text-[13px] sm:text-[14px] md:text-[15px] font-light">2025</span>
                            </div>
                        </div>
                        {/* Project 3 - SmartStock */}
                        <div 
                            className="bg-white/10 rounded-[24px] overflow-hidden flex flex-col items-center p-6 cursor-pointer hover:scale-[1.02] transition-transform"
                            onClick={() => navigate('/project/3')}
                        >
                            <div className="w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-6 border border-white/10">
                                <img src={project3Image} alt="SmartStock" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full flex flex-col items-start">
                                <span className="text-[20px] sm:text-[24px] md:text-[28px] font-light mb-1" style={{ fontFamily: 'serif' }}>SmartStock</span>
                                <span className="text-gray-400 text-[13px] sm:text-[14px] md:text-[15px] font-light">2025</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional spacing at bottom */}
                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
