import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Experience as ExperienceType } from '../types';
import GraduationLogo from './assets/graduation-logo.png';

export const Experience: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  const experiences: ExperienceType[] = [
    {
      id: '1',
      title: 'Associate Software Engineering Intern',
      company: 'The Silver Tech Innovation PVT LTD',
      location: 'Pune, India',
      duration: 'Dec 2024 – Apr 2025',
      description: [
        'Built a real-time facial recognition system with 95%+ accuracy using OpenCV and deep learning, increasing attendance efficiency by 70%.',
        'Deployed a Django admin dashboard, which reduced manual tracking efforts by 50%.',
        'Developed a fully automated help desk ticket management system using Django, Celery, and REST APIs.',
        'Designed a distributed ticketing architecture to manage 500+ concurrent requests per month with fault-tolerant retry strategies.',
      ],
    },
    {
      id: '2',
      title: 'Open-Source Contributor – GSoC 2024',
      company: 'CVAT (Computer Vision Annotation Tool) by OpenCV',
      location: 'Remote',
      duration: 'May 2024 – Aug 2024',
      description: [
        'Developed a quality control consensus feature, increasing labeling accuracy by 20% using C++ and Python.',
        'Refactored C++ modules in the CVAT backend, reducing annotation rendering latency by 35%.',
        'Collaborated with a globally distributed open-source community on GitHub, participating in code reviews and CI/CD practices.',
      ],
    },
    {
      id: '3',
      title: 'Machine Learning Research Intern',
      company: 'Omdena Research Program',
      location: 'Remote',
      duration: 'May 2023 – Nov 2023',
      description: [
        'Led development of a multilingual license plate detection system, improving accuracy by 25% with TensorFlow and OpenCV.',
        'Developed low-latency SaaS applications, reducing API response time by 30% using Python and AWS.',
        'Implemented advanced machine learning algorithms, enhancing recognition accuracy by 20% for multiple languages.',
      ],
    },
    {
      id: '4',
      title: 'Web-Development Intern',
      company: "Rackson's IT Developers",
      location: 'Pune, India',
      duration: 'Nov 2022 – Mar 2023',
      description: [
        'Utilized HTML, CSS, JavaScript, and ReactJS to optimize website performance, leading to an 80% increase in traffic.',
        'Designed an interactive front-end with React, improving user engagement by 15% and reducing load times by 20%.',
        'Streamlined development by adopting DevOps tools like Docker and CI/CD, reducing development time by 30%.',
      ],
    },
  ];

  const education = [
    {
      id: '1',
      title: 'Master of Technology; Computer and Information Technology',
      company: 'Savitribai Phule Pune University',
      location: 'Pune, India',
      duration: 'Aug 2023 – May 2025',
      description: [
        "Currently deepening my expertise in advanced computer and information technology concepts.",
      ],
    },
    {
      id: '2',
      title: 'Bachelor of Technology; Information Technology',
      company: 'Shri Vile Parle Kelvani Mandal Institute of Technology',
      location: 'Dhule, India',
      duration: 'Graduated Aug 2022',
      description: [
        'University: Dr. Babasaheb Ambedkar Technological University',
        'CGPA: 8.59/10',
        'Specialized in Data Science & Machine Learning while developing multiple projects and participating in hackathons.',
      ],
    },
    {
      id: '3',
      title: 'Diploma of Computer Science',
      company: 'SSVPS Bapusaheb Shivajirao Deore Polytechnique',
      location: 'Dhule, India',
      duration: '2017 - 2019',
      description: [
        'University: Maharashtra State Board of Technical Education',
        'Learned core programming concepts like C, C++, Java, SQL, and Networking.',
        'Completed an internship and developed a final year project.',
      ],
    },
    {
      id: '4',
      title: 'Higher Secondary School (Computer and Science)',
      company: 'Zulal Bhilajirao Patil Science College',
      location: 'Dhule, India',
      duration: '2015 - 2016',
      description: [
        'University: Maharashtra State Board of Higher Education',
        'Developed an early fascination with technology, computers, and the internet.',
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
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600"></div>
        
        {items.map((item, index) => {
          const isExperience = title === 'Professional Experience';
          const isExpanded = expandedExperience === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-16 sm:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="absolute left-4 sm:left-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white dark:border-gray-900"
              />
              
              {/* Content Card */}
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
                {/* Arrow Button for Experience Cards */}
                {isExperience && (
                  <button
                    className="ml-4 p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
                    aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    onClick={() => setExpandedExperience(isExpanded ? null : item.id)}
                    type="button"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-purple-600" />
                    )}
                  </button>
                )}
              </div>
              
              {/* Collapsible Description */}
              {(!isExperience || isExpanded) && (
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
              )}
            </motion.div>
          );
        })}
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white flex items-center justify-center gap-3">
            Experience & Education
            <img src={GraduationLogo} alt="Graduation Logo" className="w-10 h-10 sm:w-12 sm:h-12 inline-block align-middle" />
          </h2>

          {/* Toggle Button Group */}
          <div className="flex justify-center mb-12 gap-4">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Education
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'experience' && renderTimeline(experiences, 'Professional Experience')}
            {activeTab === 'education' && renderTimeline(education, 'Education')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};