import * as React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HackerRankLogo from './assets/Hacker-rank-logo.png';
import GoogleCloudLogo from './assets/google-cloud.png';
import AchievementLogo from './assets/achivement-logo.png';

export const Achievements: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const achievements = [
    {
      icon: 'hackerRank',
      text: 'Hacker Rank 3-Star Gold Badge in Problem Solving',
      description: 'Ranked in the top 10% globally for proficiency in Data Structures, Algorithms, SQL, and Python, with 100+ problems solved.',
    },
    {
      icon: 'googleCloud',
      text: 'AI-driven Interview System (Google Gen AI Program)',
      description: 'Developed an AI-driven interview system using Generative AI and large language models, leading to project selection in the prestigious Google Gen AI program, competing among 200+ innovative AI solutions globally.',
    },
    {
      icon: 'hackerRank',
      text: 'Hacker Rank Certified Software Engineer',
      description: 'Validated expertise in software development, problem-solving, and algorithmic thinking, assessed through rigorous coding challenges.',
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
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white flex items-center justify-center gap-3">
            Achievements
            <img src={AchievementLogo} alt="Achievement Logo" className="w-12 h-12 object-contain" />
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
                {achievement.icon === 'hackerRank' && (
                  <img src={HackerRankLogo} alt="HackerRank Logo" className="w-10 h-10 object-contain" />
                )}
                {achievement.icon === 'googleCloud' && (
                  <img src={GoogleCloudLogo} alt="Google Cloud Logo" className="w-10 h-10 object-contain" />
                )}
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