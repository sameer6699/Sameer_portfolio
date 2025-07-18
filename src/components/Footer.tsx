import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, X, Send, ChevronUp, ChevronDown } from 'lucide-react';
import MetaAvatar from './assets/meta-Avtar-profile.png';
import { Counter } from './Counter';
import { Message, FooterProps, ChatResponse } from '../types';
import { secureGet, secureSet } from '../utils/secureStorage';
import { useCSRF } from '../utils/csrf';
import { simpleChatAPI } from '../utils/simpleApiClient';

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "sam", text: "Hi! I'm Sam AI. How can I help you today?" },
    { sender: "sam", text: "In which language would you like to talk with me?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showLanguageButtons, setShowLanguageButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);
  const [getInTouchCount, setGetInTouchCount] = useState(0);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Initialize CSRF protection
  const { token: csrfToken } = useCSRF();

  useEffect(() => {
    // Visitor Count - using secure storage
    const countKey = 'portfolioVisitorCount';
    let count = secureGet<string>(countKey);
    if (count === null) count = '20';
    let numericCount = Number(count);
    const visitedKey = 'hasVisitedPortfolio';
    if (!secureGet<string>(visitedKey)) {
      numericCount += 1;
      secureSet(visitedKey, 'true', 24 * 60 * 60 * 1000); // 24 hours expiration
    }
    secureSet(countKey, numericCount.toString(), 24 * 60 * 60 * 1000); // 24 hours expiration
    setVisitorCount(numericCount);

    // Meeting Count - using secure storage
    const meetingKey = 'portfolioMeetingCount';
    let meeting = secureGet<string>(meetingKey);
    if (meeting === null) meeting = '5';
    setMeetingCount(Number(meeting));

    // Get In Touch Count - using secure storage
    const getInTouchKey = 'portfolioGetInTouchCount';
    let getInTouch = secureGet<string>(getInTouchKey);
    if (getInTouch === null) getInTouch = '10';
    setGetInTouchCount(Number(getInTouch));
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsChatOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageButtons(false);
    
    const languageMessage: Message = { sender: "user", text: language };
    const aiResponse: Message = { 
      sender: "sam", 
      text: `Great! I'll chat with you in ${language}. How can I help you today?` 
    };
    
    setMessages(prev => [...prev, languageMessage, aiResponse]);
    
    // Focus on chat input after language selection with a longer delay to ensure DOM is updated
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
        chatInputRef.current.select();
      }
    }, 200);
  };

  const handleSend = async () => {
    if (chatInput.trim() === "" || !selectedLanguage) return;

    const userMessage: Message = { sender: "user", text: chatInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setChatInput("");
    setIsTyping(true);

    try {
      // Format messages for backend (role/content)
      const formattedMessages = newMessages.map(msg => ({
        role: msg.sender === 'sam' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Use simple API client
      const data = await simpleChatAPI({ 
        messages: formattedMessages,
        sessionId: `user-${Date.now()}`, // Simple session ID
        context: {
          systemMessage: `You are Sam AI, Sameer's friendly portfolio assistant. The user has selected to chat in ${selectedLanguage}. Please respond in ${selectedLanguage}. Keep responses concise and helpful. For greetings, respond briefly. For questions about Sameer, provide relevant info about his skills, projects, and experience.`,
          maxHistoryLength: 10,
          language: selectedLanguage
        }
      });
      
      // Handle abuse responses
      if (data.updatedContext?.abuseDetected) {
        const abuseMessage: Message = { 
          sender: "sam", 
          text: data.response,
          isAbuse: true,
          abuseMessage: "Abuse detected - responding in kind"
        };
        setMessages((msgs) => [...msgs, abuseMessage]);
      }
      // Handle fallback responses
      else if (data.isFallback) {
        // Add a subtle indicator that we're using fallback mode
        const fallbackIndicator: Message = { 
          sender: "sam", 
          text: data.response,
          isFallback: true,
          fallbackMessage: data.fallbackMessage || "Using intelligent fallback responses while AI service is unavailable."
        };
        setMessages((msgs) => [...msgs, fallbackIndicator]);
        
        // Show a temporary notification about fallback mode (optional)
        if (import.meta.env.MODE === 'development') {
          console.log('Using fallback mode:', data.fallbackMessage);
        }
      } else {
        // Normal AI response
        const aiMessage: Message = { sender: "sam", text: data.response };
        setMessages((msgs) => [...msgs, aiMessage]);
      }

    } catch (error) {
      // Only log error in development mode
      if (import.meta.env.MODE === 'development') {
        // eslint-disable-next-line no-console
        console.error("Error calling AI API:", error);
      }
      
      // Use fallback response even for network errors
      const fallbackResponse = "I'm currently experiencing technical difficulties, but I can still help you learn about Sameer! He's a skilled software developer with expertise in React, Node.js, TypeScript, and cloud technologies. Feel free to ask about his skills, projects, or experience!";
      const errorMessage: Message = { 
        sender: "sam", 
        text: fallbackResponse,
        isFallback: true,
        fallbackMessage: "Network error - using fallback response"
      };
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setMessages([
      { sender: "sam", text: "Hi! I'm Sam AI. How can I help you today?" },
      { sender: "sam", text: "In which language would you like to talk with me?" },
    ]);
    setChatInput("");
    setSelectedLanguage(null);
    setShowLanguageButtons(true);
  };

  // Handler for Chat with Sam AI button
  const handleChatButtonClick = () => {
    if (localStorage.getItem('samAIPrivacyAccepted') === 'true') {
      setIsChatOpen(true);
    } else {
      setIsPrivacyOpen(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-row gap-4 z-40">
          {!isChatOpen && (
            <motion.button
              onClick={handleChatButtonClick}
              className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <img src={MetaAvatar} alt="Meta Avatar" className="w-6 h-6 rounded-full object-cover" />
              <span className="font-semibold hidden sm:inline">Chat with Sam AI</span>
            </motion.button>
          )}
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

        {/* Privacy Policy Modal */}
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Privacy Policy</h2>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-6 max-h-60 overflow-y-auto">
                <p>
                  By using the Sam AI chat, you agree that your messages may be processed for the purpose of providing responses. Do not share sensitive personal information. Your data will not be stored or used for any other purpose.
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>This chat is for demonstration purposes only.</li>
                  <li>Do not enter confidential or sensitive information.</li>
                  <li>Messages may be processed to generate replies, but are not stored.</li>
                </ul>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('samAIPrivacyAccepted', 'true');
                    setIsPrivacyOpen(false);
                    setIsChatOpen(true);
                  }}
                  className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition"
                >
                  Accept & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Chat with Sam AI Widget */}
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-50 bottom-4 right-4 sm:bottom-8 sm:right-8 flex items-end justify-end w-full sm:w-auto"
            style={{ pointerEvents: 'auto' }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="bg-gradient-to-br from-blue-50/90 via-white/95 to-cyan-100/90 dark:from-gray-900/95 dark:via-gray-900/98 dark:to-gray-800/95 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/20 flex flex-col overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '370px',
                height: '80vh',
                maxHeight: '540px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-700/20 flex-shrink-0 bg-white/80 dark:bg-gray-900/80">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow">
                    <img src={MetaAvatar} alt="Meta Avatar" className="w-7 h-7 rounded-full object-cover" />
                  </span>
                  Sam AI
                  {selectedLanguage && (
                    <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full font-medium">
                      {selectedLanguage}
                    </span>
                  )}
                </h2>
                <button
                  onClick={handleCloseChat}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Close chat window"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="relative flex-1 flex flex-col overflow-hidden">
                {/* Chat messages area */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto bg-white/60 dark:bg-gray-800/60 p-4 hide-scrollbar" 
                  style={{ minHeight: 0 }}
                >
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
                      <div className={`relative px-4 py-2 rounded-2xl max-w-[80%] break-words text-sm shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none' : msg.isAbuse ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-bl-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}
                        >
                          {msg.text}
                          {/* Abuse indicator */}
                          {msg.isAbuse && (
                            <div className="mt-1 pt-1 border-t border-red-300/30 dark:border-red-600/30">
                              <span className="text-xs text-red-200 dark:text-red-300 flex items-center gap-1">
                                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                                Abuse response
                              </span>
                            </div>
                          )}
                          {/* Fallback indicator */}
                          {msg.isFallback && (
                            <div className="mt-1 pt-1 border-t border-gray-300/30 dark:border-gray-600/30">
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                Intelligent fallback response
                              </span>
                            </div>
                          )}
                          {/* Bubble tail */}
                          <span className={`absolute bottom-0 ${msg.sender === 'user' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-3 h-3 bg-inherit rounded-full z-0`}></span>
                        </div>
                    </motion.div>
                  ))}
                  
                  {/* Language Selection Buttons */}
                  {showLanguageButtons && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex flex-wrap gap-2 mt-3"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLanguageSelection('English');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        English
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLanguageSelection('Hindi');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-emerald-500 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Hindi
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLanguageSelection('Marathi');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Marathi
                      </button>
                    </motion.div>
                  )}
                  
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
                      <div className="px-4 py-2 rounded-2xl max-w-[80%] bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm flex items-center gap-1 animate-pulse">
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
                  onClick={scrollToBottom}
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
                    className={`chat-input flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!selectedLanguage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={selectedLanguage ? "Type your message..." : "Please select a language first..."}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    disabled={!selectedLanguage}
                    autoFocus={selectedLanguage ? true : false}
                    aria-label="Type your message"
                    ref={chatInputRef}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!selectedLanguage || chatInput.trim() === ""}
                    className={`px-3 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      selectedLanguage && chatInput.trim() !== "" 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-600' 
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  );
};