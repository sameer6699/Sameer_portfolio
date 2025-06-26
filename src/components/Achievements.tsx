import * as React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Achievements: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const achievements = [
    {
      icon: Trophy,
      text: 'Google Summer of Code 2024',
      description: 'Contributor at MetaCall',
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Achievements
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg"
              >
                <achievement.icon className="w-10 h-10 text-yellow-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{achievement.text}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 