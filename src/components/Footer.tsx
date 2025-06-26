import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, X } from 'lucide-react';
import RoboLogo from './assets/robo-logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [chatInput, setChatInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { sender: "sam", text: "Hi! I'm Sam AI. How can I help you today?" },
  ]);

  const handleSend = () => {
    if (chatInput.trim() === "") return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: chatInput },
    ]);
    setChatInput("");
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "sam", text: "I'm just a demo for now!" },
      ]);
    }, 700);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
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
            <img src={RoboLogo} alt="Robo Logo" className="w-6 h-6 mr-2" />
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
            className="fixed top-0 right-0 h-screen w-full sm:w-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-2xl border-l border-white/20 dark:border-gray-700/20 flex flex-col"
            style={{ maxWidth: '100vw' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-700/20">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <img src={RoboLogo} alt="Robo Logo" className="w-7 h-7 inline-block" />
                Chat with Sam AI
              </h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close chat modal"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col overflow-hidden">
              {/* Chat messages area */}
              <div className="flex-1 overflow-y-auto bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 mb-4 border border-white/20 dark:border-gray-700/20" style={{ minHeight: 0 }}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-xs break-words text-sm shadow ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              {/* Chat input area */}
              <div className="flex items-center gap-2 mt-auto">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  );
};