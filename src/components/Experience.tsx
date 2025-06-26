import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Experience as ExperienceType } from '../types';

export const Experience: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Helper to get company initials
  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase();

  // Scroll carousel
  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
    }
  };

  const renderCarousel = (items: ExperienceType[], title: string) => (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">
        {title}
      </h3>
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 dark:bg-gray-900/70 rounded-full shadow hover:scale-110 transition-all border border-gray-200 dark:border-gray-700"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </button>
        <button
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 dark:bg-gray-900/70 rounded-full shadow hover:scale-110 transition-all border border-gray-200 dark:border-gray-700"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="min-w-[320px] max-w-xs w-full snap-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-4 relative"
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-2">
                {getInitials(item.company)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-md text-purple-600 dark:text-purple-400 font-medium mb-2">
                  {item.company}
                </p>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  {item.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>
                <ul className="space-y-2 mt-2">
                  {item.description.map((desc, descIndex) => (
                    <motion.li
                      key={descIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + descIndex * 0.1 }}
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
    </div>
  );

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60">
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
          <div className="max-w-6xl mx-auto">
            {renderCarousel(experiences, 'Professional Experience')}
            {renderCarousel(education, 'Education')}
          </div>
        </motion.div>
      </div>
    </section>
  );
};