import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Project } from '../types';

export const Portfolio: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState<'freelancing' | 'academic'>('freelancing');

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      category: 'freelancing',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Next.js', 'Firebase', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      category: 'freelancing',
    },
    {
      id: '5',
      title: 'Social Media App',
      description: 'Full-featured social platform with posts, comments, and real-time chat.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React Native', 'Firebase', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      category: 'freelancing',
    },
    {
      id: '7',
      title: 'Deep Fake Detection System',
      description: `M. Tech Final Year\n• Collected and preprocessed video datasets (Face Forensics++, DFD Challenge) by extracting frames, aligning facial regions, and preparing input pipelines for model training.\n• Designed and trained convolutional neural networks (CNNs) to classify real vs. fake faces, achieving high validation accuracy using augmentation and transfer learning techniques.\n• Evaluated model performance using precision, recall, and AUC metrics; visualized results through Grad-CAM to interpret deepfake detection effectiveness.`,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Python', 'CNN', 'Deep Learning', 'Transfer Learning'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'academic',
    },
    {
      id: '8',
      title: 'Java-Based Project Management System',
      description: `B. Tech Final Year\n• Built a scalable project management platform using Spring Boot and React, enabling seamless task creation, tracking, and collaboration for teams of up to 50+ users\n• Developed a user invitation and role management system, reducing team onboarding time by 35% and improving cross-functional collaboration efficiency.\n• Integrated a dynamic issue tracking module with real-time status updates and resolution workflows, accelerating bug resolution and project tracking by 40% in simulated team use cases; secured the platform with Spring Security and JWT, achieving 100% route-level access control and preventing unauthorized access through session handling and token validation.\n• Developed and deployed RESTful microservices using Java (JDK 17+) and Spring Boot with complete CRUD operations, secured with JWT and integrated with a React frontend.\n• Architected modular microservices using OOP and SOLID principles, implementing Factory and Singleton patterns for efficient service instantiation and configuration.`,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Java', 'Spring Boot', 'React', 'Microservices', 'JWT'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'academic',
    },
    {
      id: '9',
      title: 'Smart Traffic Control Management System',
      description: `B. Tech Pre-Final Year\n• Designed an AI-based traffic management model leveraging TensorFlow, Keras, and OpenCV to reduce urban congestion. Achieved a 50% reduction in travel time and a 25% improvement in traffic pattern detection accuracy.\n• Developed a convolutional neural network (CNN) for real-time vehicle detection and classification, achieving 94% accuracy across 6+ vehicle classes under diverse lighting and weather conditions.\n• Applied hyperparameter tuning (e.g., learning rate, batch size) and data augmentation techniques (rotation, scaling, brightness adjustment), which improved model generalization by 18% on unseen test data.`,
      image: 'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['AI', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'academic',
    },
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'mobile', label: 'Mobile' },
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (project.category !== activeCategory) return false;
    if (activeFilter === 'mobile') return project.tags.includes('React Native');
    if (activeFilter === 'web') return !project.tags.includes('React Native');
    return true;
  });

  return (
    <section id="portfolio" className="py-20 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Category Toggle Buttons - moved to top */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory('freelancing')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 ${
                activeCategory === 'freelancing'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Freelancing Project
            </button>
            <button
              onClick={() => setActiveCategory('academic')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center gap-2 ${
                activeCategory === 'academic'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Academic Project
            </button>
          </div>
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            My Portfolio
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development, 
            mobile apps, and design.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6 pb-16">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description.split('\n')[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Action Icons at bottom right */}
                <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                  <a
                    href={project.liveUrl}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-purple-700 dark:text-purple-300 hover:bg-white/30 transition-colors border border-purple-200 dark:border-purple-700 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-purple-700 dark:text-purple-300 hover:bg-white/30 transition-colors border border-purple-200 dark:border-purple-700 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    onClick={e => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                No projects found for the selected filter.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};