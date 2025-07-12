import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import profileImage from './assets/image (2).png';
import { useRef, useState} from 'react';

interface SymbolBase {
  top: number;
  left: number;
  fontSize: number;
  xMovement: number;
  yMovement: number;
  duration: number;
  delay: number;
  rotate: number;
}

interface DotBase {
  top: number;
  left: number;
  size: number;
  xMovement: number;
  yMovement: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FastDotBase {
  top: number;
  left: number;
  size: number;
  xMovement: number;
  yMovement: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface HeroProps {
  onBookAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAppointment }) => {
  const roles = [
    'Full Stack Developer',
    'Backend Developer',
    'Frontend Developer',
    'UI/UX Designer',
    'Cloud Architect',
    'DevOps Engineer',
    'API Developer',
    'Tech Enthusiast',
    'Problem Solver',
  ];
  const techSymbols = [
    '<>', '{}', '/>', '=>', '()', '[]', 'const', 'let', 'var', 'React', 'Node', 'SQL', 'py', 'git', 'λ', 'ƒ', 'Σ', '∫', '∞', 'Φ', 'γ', 'θ', 'α', 'β',
    '//', '/*', '*/', '&&', '||', '==', '===', '!=', '!==', '+=', '-=', '*=', '/=', '%=', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '~',
    'async', 'await', 'promise', 'then', 'catch', 'finally', 'try', 'throw', 'class', 'extends', 'super', 'static', 'public', 'private', 'protected',
    'interface', 'type', 'enum', 'namespace', 'module', 'import', 'export', 'default', 'from', 'as', 'in', 'of', 'for', 'while', 'do', 'switch', 'case',
    'break', 'continue', 'return', 'yield', 'function', 'arrow', 'callback', 'closure', 'scope', 'hoisting', 'prototype', 'inheritance', 'polymorphism',
    'encapsulation', 'abstraction', 'mutation', 'immutable', 'pure', 'side', 'effect', 'curry', 'compose', 'pipe', 'map', 'filter', 'reduce', 'find',
    'some', 'every', 'includes', 'indexOf', 'slice', 'splice', 'push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'join', 'split', 'trim',
    'toUpperCase', 'toLowerCase', 'parseInt', 'parseFloat', 'toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'JSON', 'XML', 'HTML', 'CSS', 'SCSS', 'SASS', 'LESS', 'BEM', 'OOCSS', 'SMACSS', 'ITCSS', 'CUBE', 'Atomic', 'Utility', 'Component', 'Module',
    'Vue', 'Angular', 'Svelte', 'Next', 'Nuxt', 'Gatsby', 'Astro', 'Remix', 'SvelteKit', 'Solid', 'Preact', 'Alpine', 'Lit', 'Stencil', 'Web',
    'TypeScript', 'JavaScript', 'CoffeeScript', 'Dart', 'Elm', 'Reason', 'ClojureScript', 'PureScript', 'Fable', 'BuckleScript', 'ReScript',
    'Webpack', 'Vite', 'Rollup', 'Parcel', 'Esbuild', 'SWC', 'Babel', 'PostCSS', 'Autoprefixer', 'Tailwind', 'Bootstrap', 'Material', 'Ant',
    'Chakra', 'Mantine', 'Radix', 'Headless', 'Framer', 'Lottie', 'Three', 'D3', 'Chart', 'Canvas', 'SVG', 'WebGL', 'WebRTC', 'WebSocket',
    'REST', 'GraphQL', 'gRPC', 'tRPC', 'OpenAPI', 'Swagger', 'Postman', 'Insomnia', 'Thunder', 'Client', 'Server', 'API', 'Endpoint', 'Route',
    'Express', 'Koa', 'Fastify', 'Hapi', 'Nest', 'Adonis', 'Strapi', 'Keystone', 'Directus', 'Supabase', 'Firebase', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'Jenkins', 'GitLab', 'GitHub', 'Bitbucket', 'Circle', 'Travis',
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch', 'InfluxDB', 'Cassandra', 'DynamoDB', 'CosmosDB', 'Neo4j', 'ArangoDB',
    'Jest', 'Vitest', 'Cypress', 'Playwright', 'Selenium', 'Testing', 'Unit', 'Integration', 'E2E', 'TDD', 'BDD', 'DDD', 'SOLID', 'DRY', 'KISS',
    'YAGNI', 'MVP', 'POC', 'SPA', 'MPA', 'SSR', 'SSG', 'ISR', 'CSR', 'JAMstack', 'MERN', 'MEAN', 'PERN', 'T3', 'Full', 'Stack', 'Frontend', 'Backend'
  ];
  const [cursor, setCursor] = useState<{ x: number | null; y: number | null } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Store random base positions for each symbol so they don't change on every render
  const symbolBases = useRef<SymbolBase[]>(
    Array.from({ length: window.innerWidth < 768 ? 120 : 300 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      fontSize: Math.random() * 1.5 + 0.75,
      xMovement: (Math.random() - 0.5) * 200,
      yMovement: (Math.random() - 0.5) * 200,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      rotate: Math.random() * 180 - 90,
    }))
  );

  // Store random base positions for animated dots
  const dotBases = useRef<DotBase[]>(
    Array.from({ length: window.innerWidth < 768 ? 25 : 50 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2, // 2-6px
      xMovement: (Math.random() - 0.5) * 150,
      yMovement: (Math.random() - 0.5) * 150,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.2 + 0.05, // 0.05-0.25 opacity (reduced)
    }))
  );

  // Store random base positions for fast-moving dots
  const fastDotBases = useRef<FastDotBase[]>(
    Array.from({ length: window.innerWidth < 768 ? 40 : 80 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1, // 1-4px (smaller)
      xMovement: (Math.random() - 0.5) * 300, // Larger movement range
      yMovement: (Math.random() - 0.5) * 300, // Larger movement range
      duration: Math.random() * 8 + 4, // 4-12 seconds (much faster)
      delay: Math.random() * 5, // Shorter delay
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacity
    }))
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
      onMouseMove={e => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          setCursor({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      }}
      onMouseLeave={() => setCursor({ x: null, y: null })}
    >
      {/* Fast Moving Dots Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        {fastDotBases.current.map((base, i) => (
          <motion.div
            key={`fast-dot-${i}`}
            className="absolute rounded-full bg-blue-400/20 dark:bg-cyan-400/15"
            style={{
              top: `${base.top}%`,
              left: `${base.left}%`,
              width: `${base.size}px`,
              height: `${base.size}px`,
              opacity: base.opacity,
            }}
            animate={{
              x: [0, base.xMovement, 0],
              y: [0, base.yMovement, 0],
              scale: [1, 1.8, 1],
              opacity: [base.opacity, base.opacity * 2, base.opacity],
            }}
            transition={{
              duration: base.duration,
              delay: base.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Animated Dots Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {dotBases.current.map((base, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-purple-400/30 dark:bg-green-400/20"
            style={{
              top: `${base.top}%`,
              left: `${base.left}%`,
              width: `${base.size}px`,
              height: `${base.size}px`,
              opacity: base.opacity,
            }}
            animate={{
              x: [0, base.xMovement, 0],
              y: [0, base.yMovement, 0],
              scale: [1, 1.5, 1],
              opacity: [base.opacity, base.opacity * 1.5, base.opacity],
            }}
            transition={{
              duration: base.duration,
              delay: base.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Tech-themed Animated Background */}
      <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        {symbolBases.current.map((base, i) => {
          const symbol = techSymbols[i % techSymbols.length];
          // Calculate the symbol's base position in px
          let cursorOffset = { x: 0, y: 0 };
          let rect = { width: 0, height: 0 };
          if (sectionRef.current) {
            rect = sectionRef.current.getBoundingClientRect();
          }
          const symbolX = (base.left / 100) * rect.width;
          const symbolY = (base.top / 100) * rect.height;
          
          // Make symbols run away from cursor (invert the direction)
          if (
            cursor &&
            rect.width &&
            rect.height &&
            cursor.x !== null &&
            cursor.y !== null
          ) {
            const dx = cursor.x - symbolX;
            const dy = cursor.y - symbolY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200; // Maximum distance for the effect
            
            if (distance < maxDistance) {
              // Calculate how much to move away based on proximity
              const escapeStrength = (maxDistance - distance) / maxDistance;
              // Move away from cursor (negative direction)
              cursorOffset = { 
                x: -dx * escapeStrength * 0.8, 
                y: -dy * escapeStrength * 0.8 
              };
            }
          }

          // Use Framer Motion's useMotionValue and useSpring for smooth animation
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const springX = useSpring(x, { stiffness: 120, damping: 20 });
          const springY = useSpring(y, { stiffness: 120, damping: 20 });

          // Z axis simulation: animate scale between 0.8 and 1.2
          const scale = useSpring(1 + Math.sin(base.delay) * 0.2, { stiffness: 60, damping: 16 });

          // Update the motion values when cursorOffset changes
          x.set(cursorOffset.x);
          y.set(cursorOffset.y);

          return (
            <motion.div
              key={i}
              className="absolute font-mono text-purple-400/20 dark:text-green-400/15 select-none"
              style={{
                top: `${base.top}%`,
                left: `${base.left}%`,
                fontSize: `${base.fontSize}rem`,
                x: springX,
                y: springY,
                scale: scale,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: base.duration,
                delay: base.delay,
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
          <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Sameer Jadhav
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 h-12 font-bold"
        >
          <AnimatedText texts={roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto font-bold"
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
          <a
            href="https://drive.google.com/file/d/1fRe0FdKTyckv_DQ-ebjxi-sBTXhMSaH4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold flex items-center gap-2 text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Resume
          </a>

          <motion.button
            onClick={onBookAppointment}
            className="px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-800 dark:text-white rounded-full font-semibold hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5" />
            Schedule a Meeting
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