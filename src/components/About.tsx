import * as React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Heart, Smartphone, BrainCircuit } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aboutImage from './assets/image (2).png';
import metaAvtarProfile from './assets/meta-Avtar-profile.png';
import reactLogo from './assets/react-logo.png';
import { AnimatedText } from './AnimatedText';

export const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showAIAvatar, setShowAIAvatar] = React.useState(true);

  const techStack = [
    { icon: '🔥', name: 'PyTorch' },
    { icon: '🔗', name: 'LangChain' },
    { icon: '🧠', name: 'NLP' },
    { icon: '📦', name: 'Pandas' },
    { icon: '🤖', name: 'Machine Learning' },
    { icon: '🌐', name: 'Web Scraping' },
    { icon: '🦾', name: 'AI/ML' },
    { icon: '📊', name: 'Data Analysis' },
    { icon: '⚡', name: 'JavaScript' },
    { icon: '🔷', name: 'TypeScript' },
    { icon: '🐍', name: 'Python' },
    { icon: '☕', name: 'Java' },
    { icon: '⚛️', name: 'React' },
    { icon: '🟢', name: 'Node.js' },
    { icon: '🐍', name: 'Django' },
    { icon: '🔥', name: 'Flask' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🐬', name: 'MySQL' },
    { icon: '☁️', name: 'AWS' },
    { icon: '☁️', name: 'Google Cloud' },
    { icon: '☁️', name: 'Azure' },
    { icon: '🐳', name: 'Docker' },
    { icon: '📝', name: 'Git' },
    { icon: '🔧', name: 'Jenkins' },
  ];

  const TechStackCarousel = () => (
    <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] py-4 overflow-hidden">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Known Technologies & Tech Stack
      </h3>
      <div className="carousel-track">
        {techStack.map((tech, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center min-w-[200px] h-24 bg-gray-50 dark:bg-[#181c2a] rounded-xl border border-gray-200 dark:border-[#23263a] text-gray-800 dark:text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span className="text-3xl mb-2">{tech.icon}</span>
            {tech.name}
          </div>
        ))}
        {/* Duplicate for infinite effect */}
        {techStack.map((tech, idx) => (
          <div
            key={tech.name + '-dup'}
            className="flex flex-col items-center justify-center min-w-[200px] h-24 bg-gray-50 dark:bg-[#181c2a] rounded-xl border border-gray-200 dark:border-[#23263a] text-gray-800 dark:text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span className="text-3xl mb-2">{tech.icon}</span>
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-800 dark:text-white">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative flex flex-col gap-6 items-center justify-center">
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
                  <img
                    src={showAIAvatar ? metaAvtarProfile : aboutImage}
                    alt={showAIAvatar ? 'Meta Avatar Profile' : 'About me'}
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
                <div className="w-full flex justify-center mt-2">
                  {showAIAvatar && (
                    <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-semibold shadow text-center max-w-xs">
                      <AnimatedText texts={["Hey I'm Sam, Sameer's AI Version."]} />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-center w-full">
                  <button
                    onClick={() => setShowAIAvatar((prev) => !prev)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  >
                    {showAIAvatar ? 'Show Original' : 'Show AI Avatar'}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p className="text-justify">
                  Hello! I'm <span className="font-semibold text-purple-600 dark:text-pink-400">Sameer Prahsant Jadhav</span>. I love diving into technological things and solving customer problems with modern technology and smart solutions. I enjoy meeting new people and hearing new perspectives.
                </p>

                <p className="text-justify">
                  My journey in tech is driven by a passion for creating impactful digital experiences. I specialize in full-stack development, always exploring new technologies, and contributing to open-source. I'm obsessed with crafting pixel-perfect interfaces that are both beautiful and user-friendly. Reach out if you want to talk to me about emerging tech, creating software products, or Football.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <TechStackCarousel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};