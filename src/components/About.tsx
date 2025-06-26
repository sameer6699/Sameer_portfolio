import * as React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Heart, Smartphone, BrainCircuit } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aboutImage from './assets/image (2).png';

export const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isThrottled = React.useRef(false);

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Firebase', icon: '🔥' },
  ];

  const facts = [
    { icon: Code, text: 'Full Stack Developer' },
    { icon: Smartphone, text: 'Mobile App Developer' },
    { icon: BrainCircuit, text: 'AI/ML Enthusiast' },
    { icon: Palette, text: 'Pixel-perfect design obsessed' },
    { icon: Heart, text: 'Open source contributor' },
  ];

  const handleScroll = () => {
    if (isThrottled.current) return;
    isThrottled.current = true;
    setTimeout(() => {
      isThrottled.current = false;
      if (scrollContainerRef.current) {
        const { scrollLeft, children, clientWidth } = scrollContainerRef.current;
        const containerCenter = scrollLeft + clientWidth / 2;
        
        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(children).forEach((child, index) => {
          const item = child as HTMLElement;
          const itemCenter = item.offsetLeft + item.clientWidth / 2;
          const distance = Math.abs(itemCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });
        setActiveIndex(closestIndex);
      }
    }, 100);
  };

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const item = scrollContainerRef.current.children[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

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

              <div>
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto gap-4 mt-8 pb-4 hide-scrollbar"
                >
                  {facts.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex-shrink-0 flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70"
                    >
                      <fact.icon className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{fact.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {facts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        activeIndex === index ? 'bg-purple-600' : 'bg-gray-400 dark:bg-gray-600'
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
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
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
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