import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, X, Send } from 'lucide-react';
import RoboLogo from './assets/robo-logo.png';
import MetaAvatar from './assets/meta-Avtar-profile.png';
import { Counter } from './Counter';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [chatInput, setChatInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { sender: "sam", text: "Hi! I'm Sam AI. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [visitorCount, setVisitorCount] = React.useState(0);
  const [meetingCount, setMeetingCount] = React.useState(0);
  const [getInTouchCount, setGetInTouchCount] = React.useState(0);

  React.useEffect(() => {
    // Visitor Count
    const countKey = 'portfolioVisitorCount';
    let count = localStorage.getItem(countKey);
    if (count === null) count = '20';
    let numericCount = Number(count);
    const visitedKey = 'hasVisitedPortfolio';
    if (!localStorage.getItem(visitedKey)) {
      numericCount += 1;
      localStorage.setItem(visitedKey, 'true');
    }
    localStorage.setItem(countKey, numericCount.toString());
    setVisitorCount(numericCount);

    // Meeting Count
    const meetingKey = 'portfolioMeetingCount';
    let meeting = localStorage.getItem(meetingKey);
    if (meeting === null) meeting = '5';
    setMeetingCount(Number(meeting));

    // Get In Touch Count
    const getInTouchKey = 'portfolioGetInTouchCount';
    let getInTouch = localStorage.getItem(getInTouchKey);
    if (getInTouch === null) getInTouch = '10';
    setGetInTouchCount(Number(getInTouch));
  }, []);

  React.useEffect(() => {
    if (isChatOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsChatOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isChatOpen]);

  React.useEffect(() => {
    if (isChatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSend = () => {
    if (chatInput.trim() === "") return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: chatInput },
    ]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "sam", text: "I'm just a demo for now!" },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setMessages([
      { sender: "sam", text: "Hi! I'm Sam AI. How can I help you today?" },
    ]);
    setChatInput("");
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 relative">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sameer Jadhav
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Creating beautiful, functional web experiences that make a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 mb-6"
          >
            <span className="text-xs text-gray-400 border-r border-gray-700 pr-4 last:border-none last:pr-0">
              Total Visitors Count: <Counter value={visitorCount} className="ml-1 font-semibold text-white" />
            </span>
            <span className="text-xs text-gray-400 border-r border-gray-700 pr-4 last:border-none last:pr-0">
              Schedule Meetings: <Counter value={meetingCount} className="ml-1 font-semibold text-white" />
            </span>
            <span className="text-xs text-gray-400">
              User Get in Touch: <Counter value={getInTouchCount} className="ml-1 font-semibold text-white" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-t border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by Sameer Jadhav
              </p>
              
              <p className="text-gray-400 text-sm">
                © 2024 Sameer Jadhav. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 flex flex-row gap-4 z-40">
          <motion.button
            onClick={() => setIsChatOpen(true)}
            className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <img src={MetaAvatar} alt="Meta Avatar" className="w-6 h-6 mr-2 rounded-full object-cover" />
            <span className="font-semibold">Chat with Sam AI</span>
          </motion.button>
          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Chat with Sam AI Modal */}
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-1/2 bg-gradient-to-br from-blue-50/80 via-white/90 to-cyan-100/80 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-800/90 backdrop-blur-md z-50 shadow-2xl border-l border-white/20 dark:border-gray-700/20 flex flex-col"
            style={{ maxWidth: '100vw' }}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-700/20">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow">
                  <img src={MetaAvatar} alt="Meta Avatar" className="w-7 h-7 rounded-full object-cover" />
                </span>
                Chat with Sam AI
              </h2>
              <button
                onClick={handleCloseChat}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close chat modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {/* Chat messages area */}
              <div className="flex-1 overflow-y-auto bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 mb-2 border border-white/20 dark:border-gray-700/20 custom-scrollbar" style={{ minHeight: 0 }}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'sam' && (
                      <span className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mr-2 self-end shadow">
                        <img src={MetaAvatar} alt="Sam AI" className="w-6 h-6 rounded-full object-cover" />
                      </span>
                    )}
                    <div className={`relative px-4 py-2 rounded-2xl max-w-xs break-words text-sm shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}
                      >
                      {msg.text}
                      {/* Bubble tail */}
                      <span className={`absolute bottom-0 ${msg.sender === 'user' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-3 h-3 bg-inherit rounded-full z-0`}></span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex mb-2 items-end gap-2"
                  >
                    <span className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow">
                      <img src={MetaAvatar} alt="Sam AI" className="w-6 h-6 rounded-full object-cover" />
                    </span>
                    <div className="px-4 py-2 rounded-2xl max-w-xs bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm flex items-center gap-1 animate-pulse">
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Scroll to bottom button */}
              <button
                onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute right-4 bottom-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Scroll to latest message"
                style={{ display: messages.length > 3 ? 'block' : 'none' }}
              >
                <ArrowUp className="w-5 h-5 rotate-180" />
              </button>
              {/* Chat input area */}
              <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/30 dark:border-gray-700/30 sticky bottom-0 z-10">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                  aria-label="Type your message"
                />
                <button
                  onClick={handleSend}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  );
};