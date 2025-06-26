import * as React from 'react';
import HackerRankLogo from './assets/Hacker-rank-logo.png';
import TwitterLogo from './assets/twitter-logo.png';
import LinkedInLogo from './assets/linkedin-logo.png';
import GitHubLogo from './assets/github-logo.png';
import RedditLogo from './assets/redit-logo.png';
import LeetCodeLogo from './assets/leetcode-logo.png';
import HackerEarthLogo from './assets/hackerearth-logo.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Import more logos as available, use placeholders for missing ones

const socialPlatforms = [
  {
    name: 'HackerRank',
    logo: HackerRankLogo,
    url: 'https://www.hackerrank.com/profile/sammyjadhav6699',
  },
  {
    name: 'LinkedIn',
    logo: LinkedInLogo,
    url: 'https://www.linkedin.com/in/sameer-jadhav6699/',
  },
  {
    name: 'GitHub',
    logo: GitHubLogo,
    url: 'https://github.com/sameer6699',
  },
  {
    name: 'X (Twitter)',
    logo: TwitterLogo,
    url: 'https://x.com/SameerJ24299336',
  },
  {
    name: 'Reddit',
    logo: RedditLogo,
    url: 'https://www.reddit.com/user/True_Astronaut_8910/',
  },
  {
    name: 'LeetCode',
    logo: LeetCodeLogo,
    url: 'https://leetcode.com/u/SameerJadhav/',
  },
  {
    name: 'HackerEarth',
    logo: HackerEarthLogo,
    url: 'https://www.hackerearth.com/',
  },
];

export const SocialHandles: React.FC = () => {
  const handlesRowRef = React.useRef<HTMLDivElement>(null);
  const scrollHandles = (direction: 'left' | 'right') => {
    if (handlesRowRef.current) {
      const scrollAmount = handlesRowRef.current.offsetWidth * 0.8;
      if (direction === 'left') {
        handlesRowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        handlesRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="social-handles" className="bg-white/50 dark:bg-gray-900/50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            Social Handles
          </h2>
          <div className="relative flex items-center w-full">
            <button
              className="absolute left-0 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition disabled:opacity-30"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => scrollHandles('left')}
              aria-label="Scroll Left"
              type="button"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
            <div
              ref={handlesRowRef}
              className="flex flex-row gap-8 overflow-x-hidden scroll-smooth py-2 px-1 hide-scrollbar w-full"
              style={{ minHeight: '320px' }}
            >
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 bg-gradient-to-br from-blue-50/40 to-purple-50/40 dark:from-gray-900/40 dark:to-blue-900/40 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 px-8 py-10 transition-transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[320px] max-w-xs w-full mx-2"
                >
                  {platform.logo ? (
                    <img
                      src={platform.logo}
                      alt={platform.name + ' logo'}
                      className="w-16 h-16 object-contain mb-4"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full mb-4 text-2xl font-bold text-gray-500 dark:text-gray-300">
                      {platform.name[0]}
                    </div>
                  )}
                  <span className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                    {platform.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Visit my {platform.name} profile</span>
                </a>
              ))}
            </div>
            <button
              className="absolute right-0 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition disabled:opacity-30"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => scrollHandles('right')}
              aria-label="Scroll Right"
              type="button"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 