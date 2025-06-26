import * as React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Skill } from '../types';

// Helper for circular progress SVG
const CircularProgress = ({ value, color }: { value: number; color: string }) => {
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} className="block">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
};

const skillIcons: Record<string, string> = {
  'React.js': '⚛️',
  'TypeScript': '📘',
  'Next.js': '▲',
  'Tailwind CSS': '🎨',
  'Node.js': '🟢',
  'Firebase': '🔥',
  'PostgreSQL': '🐘',
  'Figma': '🎨',
  'Adobe XD': '🖌️',
  'Git': '🔧',
  'Docker': '🐳',
  'AWS': '☁️',
};

export const Skills: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const skills: Skill[] = [
    { name: 'React.js', level: 95, category: 'frontend' },
    { name: 'TypeScript', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'Tailwind CSS', level: 92, category: 'frontend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Firebase', level: 85, category: 'backend' },
    { name: 'PostgreSQL', level: 75, category: 'backend' },
    { name: 'Figma', level: 88, category: 'design' },
    { name: 'Adobe XD', level: 82, category: 'design' },
    { name: 'Git', level: 90, category: 'tools' },
    { name: 'Docker', level: 70, category: 'tools' },
    { name: 'AWS', level: 65, category: 'tools' },
  ];

  const categories = {
    frontend: { name: 'Frontend', color: 'from-blue-500 to-cyan-500', ring: '#06b6d4' },
    backend: { name: 'Backend', color: 'from-green-500 to-emerald-500', ring: '#10b981' },
    design: { name: 'Design', color: 'from-purple-500 to-pink-500', ring: '#a21caf' },
    tools: { name: 'Tools', color: 'from-orange-500 to-red-500', ring: '#f59e42' },
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(categories).map(([key, category], categoryIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.03, y: -6 }}
              >
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} opacity-20 blur-2xl pointer-events-none`} />
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white tracking-wide">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {skills
                    .filter(skill => skill.category === key)
                    .map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: skillIndex * 0.1 + 0.2 * categoryIndex }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            <CircularProgress value={skill.level} color={category.ring} />
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200">
                              {skillIcons[skill.name] || '💡'}
                            </span>
                          </div>
                          <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {skill.name}
                          </span>
                        </div>
                        {/* Tooltip */}
                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-lg bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                          {skill.level}% proficiency
                        </span>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Skill Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3+</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};