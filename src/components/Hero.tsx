import { motion } from 'framer-motion';
import { ChevronDown, Download, Calendar } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import profileImage from './assets/image (2).png';

interface HeroProps {
  onBookAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAppointment }) => {
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
  const techSymbols = ['<>', '{}', '/>', '=>', '()', '[]', 'const', 'let', 'var', 'React', 'Node', 'SQL', 'py', 'git', 'λ', 'ƒ', 'Σ', '∫', '∞', 'Φ'];

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Tech-themed Animated Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        {[...Array(70)].map((_, i) => {
            const symbol = techSymbols[i % techSymbols.length];
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 1.5 + 0.75}rem`,
            };
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 10;
            const xMovement = (Math.random() - 0.5) * 200;
            const yMovement = (Math.random() - 0.5) * 200;

            return (
                <motion.div
                    key={i}
                    className="absolute font-mono text-purple-400/40 dark:text-green-400/25 select-none"
                    style={style}
                    animate={{
                        x: [0, xMovement, 0],
                        y: [0, yMovement, 0],
                        rotate: [0, Math.random() * 180 - 90, 0]
                    }}
                    transition={{
                        duration,
                        delay,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                    }}
                >
                    {symbol}
                </motion.div>
            );
        })}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sameer Jadhav
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-12"
        >
          <AnimatedText texts={roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          I create beautiful, functional websites and applications that solve real-world problems.
          Let's build something amazing together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToPortfolio}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            View My Work
          </motion.button>

          <motion.button
            onClick={onBookAppointment}
            className="px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-800 dark:text-white rounded-full font-semibold hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5" />
            Book a Meeting
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  );
};