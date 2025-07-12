import * as React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Skill } from '../types';
import reactLogo from './assets/react-logo.png';
import tsLogo from './assets/TS-logo.png';
import nextjsLogo from './assets/nextjs-logo.png';
import tailwindLogo from './assets/tailwind-css-logo.png';
import nodejsLogo from './assets/nodejs-logo.png';
import firebaseLogo from './assets/firebase-logo.png';
import postgresqlLogo from './assets/postgreSQL-logo.png';
import figmaLogo from './assets/figma-logo.png';
import adobeXDLogo from './assets/AdobeXD-logo.png';
import dockerLogo from './assets/docker-logo.png';
import awsLogo from './assets/AWS-logo.png';
import gitLogo from './assets/git-logo.png';
import { useState} from 'react';

const skillIcons: Record<string, string> = {
  'React.js': reactLogo,
  'TypeScript': tsLogo,
  'Next.js': nextjsLogo,
  'Tailwind CSS': tailwindLogo,
  'Node.js': nodejsLogo,
  'Firebase': firebaseLogo,
  'PostgreSQL': postgresqlLogo,
  'Figma': figmaLogo,
  'Adobe XD': adobeXDLogo,
  'Docker': dockerLogo,
  'AWS': awsLogo,
  'Git': gitLogo,
};

export const Skills: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-800 dark:text-white">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(categories).map(([key, category], categoryIndex) => {
              // Get skills for this category
              const categorySkills = skills.filter(skill => skill.category === key);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -6 }}
                  onMouseLeave={() => setHoveredSkill(null)}
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
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                        >
                          <span className="flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200">
                            {skillIcons[skill.name] && skillIcons[skill.name] !== 'emoji' ? (
                              <img src={skillIcons[skill.name]} alt={skill.name + ' logo'} className="w-6 h-6 object-contain mx-auto" />
                            ) : (
                              skillIcons[skill.name] === 'emoji' ? '🔧' : '💡'
                            )}
                          </span>
                          <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {skill.name}
                          </span>
                          {/* Tooltip */}
                          <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-lg bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            {skill.level}%
                          </span>
                        </motion.div>
                      ))}
                  </div>
                  {/* Show hovered skill's percentage at the bottom of the card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={categorySkills.some(skill => skill.name === hoveredSkill) ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 text-2xl font-bold text-gray-800 dark:text-white bg-white/90 dark:bg-gray-900/90 px-6 py-2 rounded-full shadow-lg border border-white/30 dark:border-gray-700/30 pointer-events-none"
                    style={{ minWidth: 80, textAlign: 'center' }}
                  >
                    {(() => {
                      const skill = categorySkills.find(skill => skill.name === hoveredSkill);
                      return skill ? `${skill.level}%` : '';
                    })()}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          {/* Skill Summary */}
          {/* Removed summary counters for Visitors Count, Booked Enquiry, and User Get in Touch as requested */}
        </motion.div>
      </div>
    </section>
  );
};