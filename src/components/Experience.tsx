import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Experience as ExperienceType } from '../types';

export const Experience: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const experiences: ExperienceType[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      description: [
        'Led development of React-based web applications serving 100K+ users',
        'Implemented responsive designs and improved page load times by 40%',
        'Mentored junior developers and established coding best practices',
        'Collaborated with design team to create pixel-perfect user interfaces'
      ],
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupVenture',
      location: 'Remote',
      duration: '2021 - 2022',
      description: [
        'Built and maintained full-stack applications using React and Node.js',
        'Designed and implemented RESTful APIs for mobile and web clients',
        'Integrated third-party services including Stripe, Firebase, and AWS',
        'Participated in agile development process and sprint planning'
      ],
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      duration: '2020 - 2021',
      description: [
        'Developed responsive websites for diverse clients across industries',
        'Converted Figma designs into interactive React components',
        'Optimized websites for SEO and performance best practices',
        'Collaborated with designers and backend developers on project delivery'
      ],
    },
  ];

  const education = [
    {
      id: '1',
      title: 'Bachelor of Computer Science',
      company: 'Tech University',
      location: 'Boston, MA',
      duration: '2016 - 2020',
      description: [
        'Graduated with honors (GPA: 3.8/4.0)',
        'Specialized in Software Engineering and Web Development',
        'Led university coding bootcamp for underclassmen',
        'Active member of Computer Science Student Association'
      ],
    },
  ];

  const renderTimeline = (items: ExperienceType[], title: string) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">
        {title}
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>
        
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative pl-20 pb-12 last:pb-0"
          >
            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white dark:border-gray-900"
            />
            
            {/* Content Card */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                    {item.company}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    {item.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2">
                {item.description.map((desc, descIndex) => (
                  <motion.li
                    key={descIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + descIndex * 0.1 }}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    {desc}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="experience" className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Experience & Education
          </h2>

          <div className="max-w-4xl mx-auto">
            {renderTimeline(experiences, 'Professional Experience')}
            {renderTimeline(education, 'Education')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};