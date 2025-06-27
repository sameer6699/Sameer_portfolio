import * as React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HackerRankLogo from './assets/Hacker-rank-logo.png';
import GoogleCloudLogo from './assets/google-cloud.png';
import AchievementLogo from './assets/achivement-logo.png';
import GSOCLogo from './assets/Gssoc-GirlScriptSummerofCode.png';

export const Achievements: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [showOther, setShowOther] = React.useState(false);

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

  const otherAchievements = [
    {
      icon: 'gsoc',
      text: 'GirlScript Summer of Code Campus Ambassador Program',
      description: 'I was selected as GirlScript Summer of Code Campus Ambassador Program, representing and promoting open source contributions and mentorship opportunities within the campus community.',
      image: GSOCLogo,
      tags: ['Open Source', 'Campus Ambassador', 'Mentorship'],
    },
    {
      icon: 'hackerRank',
      text: 'Additional Achievement 2',
      description: 'Description for additional achievement 2.',
      image: HackerRankLogo,
      tags: ['Achievement', 'Certification'],
    },
  ];

  const displayAchievements = showOther ? otherAchievements : achievements;

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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3 mb-4">
              Achievements
              <img src={AchievementLogo} alt="Achievement Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </h2>
            <button
              onClick={() => setShowOther(!showOther)}
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium rounded-full transition-all duration-500 ease-in-out shadow-md hover:shadow-lg text-sm relative overflow-hidden transform hover:scale-105 active:scale-95 ${
                showOther 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                showOther ? 'translate-x-0' : '-translate-x-full'
              }`}>
                <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-600"></div>
              </div>
              
              <span className="relative z-10 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out transform ${
                  showOther 
                    ? 'bg-white scale-110 rotate-180' 
                    : 'bg-gray-500 scale-100 rotate-0'
                }`}></div>
                <span className={`transition-all duration-500 ease-in-out ${
                  showOther ? 'translate-x-0 opacity-100' : 'translate-x-1 opacity-90'
                }`}>
                  Other
                </span>
              </span>
              
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out ${
                showOther 
                  ? 'bg-white/20 scale-100 opacity-0' 
                  : 'bg-gray-400/20 scale-0 opacity-0'
              }`}></div>
            </button>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {!showOther ? (
              // Main achievements - vertical layout
              achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg"
                >
                  {achievement.icon === 'hackerRank' && (
                    <img src={HackerRankLogo} alt="HackerRank Logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  )}
                  {achievement.icon === 'googleCloud' && (
                    <img src={GoogleCloudLogo} alt="Google Cloud Logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{achievement.text}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              // Other achievements - horizontal card layout
              <div className="flex gap-8 overflow-x-auto scroll-smooth py-2 px-1 hide-scrollbar">
                {otherAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="min-w-[320px] max-w-xs w-full group bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.text}
                        className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 pb-16">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {achievement.text}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {achievement.description}
                      </p>
                      <div className="flex flex-wrap gap-4 pb-4 justify-center">
                        {achievement.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 