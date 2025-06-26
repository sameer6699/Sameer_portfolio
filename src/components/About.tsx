import * as React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Coffee, Heart } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aboutImage from './assets/image (2).png';

export const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Firebase', icon: '🔥' },
  ];

  const facts = [
    { icon: Coffee, text: 'Coffee enthusiast ☕ (5+ cups daily)' },
    { icon: Code, text: '3+ years of coding experience' },
    { icon: Palette, text: 'Pixel-perfect design obsessed' },
    { icon: Heart, text: 'Open source contributor' },
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
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
                <img
                  src={aboutImage}
                  alt="About me"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
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

              <div className="grid grid-cols-2 gap-4 mt-8">
                {facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <fact.icon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{fact.text}</span>
                  </motion.div>
                ))}
              </div>
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
              Tech Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};