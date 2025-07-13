import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BookAppointment } from './components/BookAppointment';
import { Navbar } from './components/Navbar';
import { SocialHandles } from './components/SocialHandles';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Validate environment variables
    if (!import.meta.env.DEV && !import.meta.env.VITE_BACKEND_URL) {
      console.warn('VITE_BACKEND_URL not set in production');
    }
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <Hero onBookAppointment={() => setIsBookingOpen(true)} />
      <div id="home" />
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="portfolio"><Portfolio /></div>
      <div id="experience"><Experience /></div>
      <div id="achievements"><Achievements /></div>
      <div id="social-handles"><SocialHandles /></div>
      <div id="contact"><Contact /></div>
      <Footer />
      
      <BookAppointment 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
}

export default App;