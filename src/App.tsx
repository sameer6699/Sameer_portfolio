import { useState } from 'react';
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

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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