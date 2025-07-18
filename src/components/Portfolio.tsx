import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Project } from '../types';
import GSOC2024Img from './assets/GSOC-2024.png';
import ComputerLogo from './assets/computer-logo.png';
import EcommerceLogo from './assets/ecommerce-logo.png';

// Add Alokai modal content as a constant
const alokaiDetails = (
  <div className="p-0 sm:p-0 max-w-lg mx-auto">
    {/* Fixed Header with background */}
    <div className="sticky top-0 z-20 rounded-t-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center gap-3" style={{ minHeight: '64px' }}>
      {/* Removed Alokai logo icon */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-0">Alokai</h2>
        <p className="text-white text-sm">Composable Commerce Frontend Ecosystem</p>
      </div>
    </div>
    {/* Hero image with Ecommerce Logo overlay, consistent style */}
    <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-b-lg overflow-hidden flex items-center justify-center">
      <img
        src="https://www.alokai.com/_next/image?url=%2Fimages%2Fhero.png&w=384&q=75"
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-b-lg"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <img
          src={EcommerceLogo}
          alt="Ecommerce Platform Logo"
          className="max-h-20 max-w-xs object-contain rounded shadow-lg bg-white/90 p-2 border border-gray-200"
        />
      </div>
    </div>
    <div className="px-6 py-4">
      <p className="mb-2 text-gray-700 dark:text-gray-200 font-medium">An ecosystem of developer tools that accelerate and simplify building eCommerce Storefronts.<br/>Fully customizable, backend-agnostic with 3500+ Live Stores!</p>
      <a href="https://www.alokai.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded transition mb-4">Documentation</a>
      <hr className="my-4 border-purple-200 dark:border-purple-700" />
      <p className="mb-2 text-gray-600 dark:text-gray-300">Alokai is your guide to the composable commerce world that simplifies building, deploying, and monitoring ecommerce frontends.</p>
      <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-200">
        <li>Works with any backend (API compatible, many integrations available)</li>
        <li>Fully-working eCommerce storefront integrated with your favourite stack</li>
        <li>Build with Storefront UI or your own theme</li>
      </ul>
      <hr className="my-4 border-purple-200 dark:border-purple-700" />
      <h3 className="font-semibold mt-4 mb-1 text-purple-700 dark:text-purple-300">What you get out-of-the-box 📦</h3>
      <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-200">
        <li>Nuxt.js, Next.js, Alokai Theme, Storefront UI, Alokai Middleware</li>
      </ul>
      <h3 className="font-semibold mt-4 mb-1 text-purple-700 dark:text-purple-300">Our Tech Stack 🛠</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {['Vue.js','Nuxt.js','React.js','Next.js','TypeScript','Storefront UI','Express.js','GraphQL','Yarn','Docker','Jest'].map(tech => (
          <span key={tech} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">{tech}</span>
        ))}
      </div>
      <hr className="my-4 border-purple-200 dark:border-purple-700" />
      <h3 className="font-semibold mt-4 mb-1 text-purple-700 dark:text-purple-300">Contribution 🤝</h3>
      <p className="mb-2 text-gray-600 dark:text-gray-300">Alokai is Open Source! Read our Contributing Guide and Code of Conduct. Join our Discord for help or to contribute.</p>
      <p className="mb-2 text-gray-600 dark:text-gray-300">Found a bug or have a feature suggestion? Create an issue on GitHub.</p>
      <hr className="my-4 border-purple-200 dark:border-purple-700" />
      <h3 className="font-semibold mt-4 mb-1 text-purple-700 dark:text-purple-300">Follow us on Social Media</h3>
      <div className="flex gap-3 mt-2">
        <a href="https://twitter.com/alokai_com" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">Twitter</a>
        <a href="https://youtube.com/@alokai" target="_blank" rel="noopener noreferrer" className="hover:underline text-red-500">YouTube</a>
        <a href="https://dev.to/alokai" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700 dark:text-gray-200">Dev.to</a>
        <a href="https://linkedin.com/company/alokai" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">LinkedIn</a>
      </div>
    </div>
  </div>
);

export const Portfolio: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<'freelancing' | 'academic' | 'openSource'>('freelancing');
  const projectRowRef = useRef<HTMLDivElement>(null);
  const [isAlokaiModalOpen, setAlokaiModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: 'https://github.com/sameer6699/vue-storefront',
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
    {
      id: '10',
      title: 'Open Source UI Library',
      description: 'Contributed components and bug fixes to a popular open source React UI library.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Open Source', 'UI'],
      liveUrl: 'https://github.com/example/ui-library',
      githubUrl: 'https://github.com/example/ui-library',
      featured: false,
      category: 'openSource',
    },
    {
      id: '11',
      title: 'Google Summer of Code 2024 - CVAT',
      description: `Contributed to CVAT (Computer Vision Annotation Tool) as part of Google Summer of Code 2024.\n\nCVAT is a free, open-source, web-based image and video annotation tool for labeling data for computer vision algorithms. It supports object detection, image classification, and segmentation, with features like keyframe interpolation, semi-automatic annotation, and customizable dashboards.\n\nMy project focused on introducing customizable keyboard shortcuts, allowing users to tailor keymaps for their annotation workflows. This improved efficiency and flexibility for data annotation teams.\n\nMentors: bsekachev, Maria Khrustaleva\nOrganization: CVAT\nTechnologies: Python, Django, React, TypeScript, Cypress\nRead more: https://www.cvat.ai/post/introduction-to-cvat-ai-best-image-annotation-tool-explained-in-simple-terms`,
      image: GSOC2024Img,
      tags: ['GSOC', 'CVAT', 'Open Source', 'Python', 'Django', 'React', 'TypeScript', 'Cypress'],
      liveUrl: 'https://www.cvat.ai/',
      githubUrl: 'https://github.com/sameer6699/cvat-GSOC-2024',
      featured: true,
      category: 'openSource',
    },
  ];

  const filteredProjects = projects.filter(project => project.category === activeCategory);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectRowRef.current) {
      const scrollAmount = projectRowRef.current.offsetWidth * 0.8;
      if (direction === 'left') {
        projectRowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        projectRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (projectRowRef.current) {
      // Center the first card in the row
      const row = projectRowRef.current;
      const firstCard = row.querySelector('div[data-project-card]');
      if (firstCard) {
        const card = firstCard as HTMLElement;
        const rowRect = row.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft =
          card.offsetLeft - row.offsetLeft - rowRect.width / 2 + cardRect.width / 2;
        row.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  useEffect(() => {
    // Simulate loading for 10 seconds
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Category Toggle Buttons - always in this order, now with All Projects at the end */}
          <div className="flex flex-nowrap justify-start sm:justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => setActiveCategory('freelancing')}
              className={`px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'freelancing'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Freelancing Project
            </button>
            <button
              onClick={() => setActiveCategory('academic')}
              className={`px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'academic'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Academic Project
            </button>
            <button
              onClick={() => setActiveCategory('openSource')}
              className={`px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 whitespace-nowrap ${
                activeCategory === 'openSource'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-800/30'
              }`}
            >
              Open Source Contribution
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white flex items-center justify-center gap-3">
            My Portfolio
            <img src={ComputerLogo} alt="Computer Logo" className="w-10 h-10 sm:w-12 sm:h-12 inline-block align-middle" />
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development, 
            mobile apps, and design.
          </p>

          {/* Loader */}
          {loading ? (
            <div className="w-full flex items-center justify-center py-16 relative" style={{ minHeight: '200px', background: '#fff8fc' }}>
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {/* Projects Grid with Horizontal Scroll and Nav Buttons */}
              <div className="relative flex items-center">
                <button
                  className="absolute left-0 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-purple-100 dark:hover:bg-purple-900/40 transition disabled:opacity-30 hidden md:block"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => scrollProjects('left')}
                  aria-label="Scroll Left"
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6 text-purple-600" />
                </button>
                <motion.div
                  ref={projectRowRef}
                  className="flex gap-8 overflow-x-auto scroll-smooth py-2 px-1 hide-scrollbar w-full"
                  layout
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      data-project-card
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="min-w-[320px] max-w-xs w-full group bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className={`w-full group-hover:scale-110 transition-transform duration-500 ${
                            project.id === '11' 
                              ? 'h-56 object-contain bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20' 
                              : 'h-48 object-cover'
                          }`}
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
                        <div className="flex flex-wrap gap-4 pb-4 justify-center">
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
                        {/* Live Demo button logic for Ecommerce project */}
                        {project.id === '1' ? (
                          <button
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-purple-700 dark:text-purple-300 hover:bg-white/30 transition-colors border border-purple-200 dark:border-purple-700 text-sm"
                            title="Project Details"
                            onClick={e => { e.stopPropagation(); setAlokaiModalOpen(true); }}
                            type="button"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        ) : (
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
                        )}
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
                <button
                  className="absolute right-0 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-purple-100 dark:hover:bg-purple-900/40 transition disabled:opacity-30 hidden md:block"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  onClick={() => scrollProjects('right')}
                  aria-label="Scroll Right"
                  type="button"
                >
                  <ChevronRight className="w-6 h-6 text-purple-600" />
                </button>
              </div>

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
            </>
          )}
        </motion.div>
        {/* Modal for Alokai/Ecommerce project */}
        {isAlokaiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-lg w-full relative animate-fadeIn border-2 border-purple-400 dark:border-purple-700 p-0">
              <button
                className="absolute top-3 right-3 text-white bg-purple-600 hover:bg-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow-lg transition"
                onClick={() => setAlokaiModalOpen(false)}
                aria-label="Close"
                style={{ zIndex: 30 }}
              >
                &times;
              </button>
              <div className="max-h-[80vh] overflow-y-auto">
                {alokaiDetails}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};