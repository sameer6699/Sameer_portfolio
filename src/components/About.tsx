import * as React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import aboutImage from './assets/image (2).png';
import metaAvtarProfile from './assets/meta-Avtar-profile.png';
import langchainLogo from './assets/langchain-logo.png';
import { AnimatedText } from './AnimatedText';

export const About: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [showAIAvatar, setShowAIAvatar] = React.useState(true);

  const techStack = [
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/pytorch.png" 
      alt="pytorch" className="w-12 h-12 object-contain" />, 
      name: 'PyTorch' 
    },
    { 
      icon: <img src={langchainLogo} alt="langchain" className="w-12 h-12 object-contain" />, 
      name: 'LangChain' 
    },
    { 
      icon: <img width="96" height="96" 
      src="https://img.icons8.com/pulsar-gradient/96/brain-3.png" 
      alt="brain-3" className="w-12 h-12 object-contain" />, 
      name: 'NLP' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/pandas.png" 
      alt="pandas" className="w-12 h-12 object-contain" />, 
      name: 'Pandas' 
    },
    { 
      icon: <img width="96" height="96" 
      src="https://img.icons8.com/pulsar-gradient/96/artificial-intelligence.png" 
      alt="artificial-intelligence" className="w-12 h-12 object-contain" />, 
      name: 'Machine Learning' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/web-scraper.png" 
      alt="web-scraper" className="w-12 h-12 object-contain" />, 
      name: 'Web Scraping' 
    },
    { 
      icon: <img width="96" height="96" 
      src="https://img.icons8.com/pulsar-gradient/96/artificial-intelligence.png" 
      alt="artificial-intelligence" className="w-12 h-12 object-contain" />, 
      name: 'Artificial Intelligence' 
    },
    { 
      icon: <img width="60" height="60" 
      src="https://img.icons8.com/papercut/60/financial-growth-analysis.png" 
      alt="financial-growth-analysis" className="w-12 h-12 object-contain" />, 
      name: 'Data Analysis' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/javascript--v1.png" 
      alt="javascript--v1" className="w-12 h-12 object-contain" />, 
      name: 'JavaScript' 
    },
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/typescript--v1.png" 
      alt="typescript--v1" className="w-12 h-12 object-contain" />, 
      name: 'TypeScript' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/python--v1.png" 
      alt="python--v1" className="w-12 h-12 object-contain" />, 
      name: 'Python' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/java-coffee-cup-logo--v1.png" 
      alt="java-coffee-cup-logo--v1" className="w-12 h-12 object-contain" />, 
      name: 'Java' 
    },
    { 
      icon: <img width="100" height="100" 
      src="https://img.icons8.com/plasticine/100/react.png" 
      alt="react" className="w-12 h-12 object-contain" />, 
      name: 'React' 
    },
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/node-js.png" 
      alt="node-js" className="w-12 h-12 object-contain" />, 
      name: 'Node.js' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/django.png" 
      alt="django" className="w-12 h-12 object-contain" />, 
      name: 'Django' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/flask.png" 
      alt="flask" className="w-12 h-12 object-contain" />, 
      name: 'Flask' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/mongodb.png" 
      alt="mongodb" className="w-12 h-12 object-contain" />, 
      name: 'MongoDB' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/postgreesql.png" 
      alt="postgreesql" className="w-12 h-12 object-contain" />, 
      name: 'PostgreSQL' 
    },
    { 
      icon: <img width="96" height="96" 
      src="https://img.icons8.com/fluency/96/sql.png" 
      alt="sql" className="w-12 h-12 object-contain" />, 
      name: 'MySQL' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/amazon-web-services.png" 
      alt="amazon-web-services" className="w-12 h-12 object-contain" />, 
      name: 'AWS' 
    },
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/google-cloud.png" 
      alt="google-cloud" className="w-12 h-12 object-contain" />, 
      name: 'Google Cloud' 
    },
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/azure-1.png" 
      alt="azure-1" className="w-12 h-12 object-contain" />, 
      name: 'Azure' 
    },
    { 
      icon: <img width="240" height="240" 
      src="https://img.icons8.com/fluency/240/docker.png" 
      alt="docker" className="w-12 h-12 object-contain" />, 
      name: 'Docker' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/git.png" 
      alt="git" className="w-12 h-12 object-contain" />, 
      name: 'Git' 
    },
    { 
      icon: <img width="480" height="480" 
      src="https://img.icons8.com/color/480/jenkins.png" 
      alt="jenkins" className="w-12 h-12 object-contain" />, 
      name: 'Jenkins' 
    },
  ];

  const TechStackCarousel = () => (
    <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] py-4 overflow-hidden">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Known Technologies & Tech Stack
      </h3>
      <div className="carousel-track">
        {techStack.map((tech, idx) => (
          <div
            key={`tech-${idx}`}
            className="flex flex-col items-center justify-center min-w-[200px] h-24 bg-gray-50 dark:bg-[#181c2a] rounded-xl border border-gray-200 dark:border-[#23263a] text-gray-800 dark:text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span className="text-3xl mb-2 flex items-center justify-center">
              {typeof tech.icon === 'string' ? tech.icon : tech.icon}
            </span>
            {tech.name}
          </div>
        ))}
        {/* Duplicate for infinite effect */}
        {techStack.map((tech, idx) => (
          <div
            key={`tech-dup-${idx}`}
            className="flex flex-col items-center justify-center min-w-[200px] h-24 bg-gray-50 dark:bg-[#181c2a] rounded-xl border border-gray-200 dark:border-[#23263a] text-gray-800 dark:text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span className="text-3xl mb-2 flex items-center justify-center">
              {typeof tech.icon === 'string' ? tech.icon : tech.icon}
            </span>
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-800 dark:text-white">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative flex flex-col gap-6 items-center justify-center">
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
                  <img
                    src={showAIAvatar ? metaAvtarProfile : aboutImage}
                    alt={showAIAvatar ? 'Meta Avatar Profile' : 'About me'}
                    className="relative rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
                <div className="w-full flex justify-center mt-2">
                  {showAIAvatar && (
                    <div className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-semibold shadow text-center max-w-xs">
                      <AnimatedText texts={["Hey I'm Sam, Sameer's AI Version."]} />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-center w-full">
                  <button
                    onClick={() => setShowAIAvatar((prev) => !prev)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  >
                    {showAIAvatar ? 'Show Original' : 'Show AI Avatar'}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                <p className="text-justify">
                  Hello! I'm <span className="font-semibold text-purple-600 dark:text-pink-400">Sameer Prahsant Jadhav</span>. I love diving into technological things and solving customer problems with modern technology and smart solutions. I enjoy meeting new people and hearing new perspectives.
                </p>

                <p className="text-justify">
                  My journey in tech is driven by a passion for creating impactful digital experiences. I specialize in full-stack development, always exploring new technologies, and contributing to open-source. I'm obsessed with crafting pixel-perfect interfaces that are both beautiful and user-friendly. Reach out if you want to talk to me about emerging tech, creating software products, or Football.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <TechStackCarousel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};