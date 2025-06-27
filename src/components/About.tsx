import * as React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Heart, Smartphone, BrainCircuit } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aboutImage from './assets/image (2).png';
import metaAvtarProfile from './assets/meta-Avtar-profile.png';
import { AnimatedText } from './AnimatedText';

export const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showAIAvatar, setShowAIAvatar] = React.useState(true);

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Java', icon: '☕' },
    { name: 'Python', icon: '🐍' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'Shell Scripting', icon: '💻' },
    { name: 'C++', icon: '➕' },
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎀' },
    { name: 'JavaScript', icon: '✨' },
    { name: 'jQuery', icon: '💠' },
    { name: 'REST', icon: '🔗' },
    { name: 'Spring Boot', icon: '🌱' },
    { name: 'Django', icon: '🦎' },
    { name: 'Git', icon: '🔧' },
    { name: 'GitLab', icon: '🦊' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'CI/CD', icon: '🔄' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Microsoft Azure', icon: '🔷' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'OpenCV', icon: '👁️' },
    { name: 'PyTorch', icon: '🔥' },
    { name: 'LangChain', icon: '🔗' },
    { name: 'NLP', icon: '🗣️' },
    { name: 'Postman', icon: '📮' },
  ];

  return (
    <section id="about" className="py-20 bg-white/50 dark:bg-gray-900/50">
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

          <div className="grid md:grid-cols-2 gap-8 items-center">
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
                      <AnimatedText texts={["Hey I'm Sam, Sameer's AI Version let's chat with me have some fun...!"]} />
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
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Hello! I'm Sameer Prahsant Jadhav.
                I love diving into technological things and solve the customers problems with modern technology and smart solution. I enjoy meeting new people and hearing new perspective.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey in tech is driven by a passion for creating impactful digital experiences. I specialize in full-stack development, always exploring new technologies, and contributing to open-source. I'm obsessed with crafting pixel-perfect interfaces that are both beautiful and user-friendly. Reach out if you want to talk to me about emerging tech, creating software products or Football.
              </p>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Known Technologies & Tech Stack
            </h3>
            <div>
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar px-10 items-center"
                style={{ scrollBehavior: 'smooth' }}
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="px-6 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full border border-white/30 dark:border-gray-700/30 flex items-center gap-2"
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-white">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Scroll left"
                  type="button"
                >
                  {'<'}
                </button>
                <button
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Scroll right"
                  type="button"
                >
                  {'>'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};