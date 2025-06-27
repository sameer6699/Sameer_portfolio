import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Portfolio', to: 'portfolio' },
  { label: 'Experience', to: 'experience' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Contact', to: 'contact' },
];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navLinks.map(link => {
        const el = document.getElementById(link.to);
        if (!el) return { id: link.to, offset: 0 };
        return { id: link.to, offset: el.getBoundingClientRect().top + window.scrollY };
      });
      const scrollPos = window.scrollY + 100;
      let current = 'home';
      for (let i = 0; i < offsets.length; i++) {
        if (scrollPos >= offsets[i].offset) {
          current = offsets[i].id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    const el = document.getElementById(to);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-5xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl px-6 py-2 flex justify-between items-center gap-4 pointer-events-auto transition-all duration-300 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          Sameer Jadhav
        </motion.div>
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <motion.button
              key={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`relative px-3 py-2 font-medium transition-colors duration-300 focus:outline-none ${
                active === link.to
                  ? 'text-purple-600 dark:text-pink-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400'
              }`}
              whileHover={{ scale: 1.08 }}
            >
              {link.label}
              {active === link.to && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-gradient-to-r from-purple-500 to-pink-500"
                />
              )}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="w-7 h-1 bg-purple-500 rounded transition-all" />
            <span className="w-7 h-1 bg-pink-500 rounded transition-all" />
            <span className="w-7 h-1 bg-purple-500 rounded transition-all" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white/95 dark:bg-gray-900/95 px-6 pb-4 pt-2 shadow-lg"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <button
                key={link.to}
                onClick={() => handleNavClick(link.to)}
                className={`text-lg font-medium text-left px-2 py-2 rounded transition-colors duration-200 ${
                  active === link.to
                    ? 'text-purple-600 dark:text-pink-400 bg-purple-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}; 