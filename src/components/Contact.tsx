import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import twitterLogo from './assets/twitter-logo.png';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    setTimeout(() => {
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 2500);
    }, 1000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sameer6699', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sameer-jadhav6699/', label: 'LinkedIn' },
    { icon: 'custom-twitter', href: 'https://x.com/SameerJ24299336', label: 'X-(Twitter)' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'sammyjadhav6699@gmail.com', href: 'mailto:sammyjadhav6699@gmail.com', label: 'Email' },
    { icon: Phone, text: '+91 - 9422448367', href: 'tel:+919422448367', label: 'Phone' },
    { icon: MapPin, text: 'Pune, Maharashtra', href: 'https://www.google.com/maps/search/?api=1&query=Pune,+Maharashtra', label: 'Location' },
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-purple-100/60 via-white/80 to-pink-100/60 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-800/80 overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/30 to-pink-400/20 rounded-full blur-3xl z-0" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-pink-400/20 to-purple-400/10 rounded-full blur-2xl z-0" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-800 dark:text-white tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
            Get In Touch
            <Send className="w-12 h-12 text-purple-600" />
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  I'm always open to discussing new opportunities and interesting projects. Feel free to reach out if you have any questions or just want to say hello!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl border border-white/30 dark:border-gray-700/30 shadow-md hover:shadow-lg transition-all group relative"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <a
                      href={info.href}
                      target={info.label === 'Location' ? '_blank' : undefined}
                      rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                      className="text-gray-700 dark:text-gray-200 font-medium hover:underline focus:outline-none"
                      aria-label={info.label}
                    >
                      {info.text}
                    </a>
                    {['Email', 'Phone'].includes(info.label) && (
                      <button
                        type="button"
                        onClick={() => handleCopy(info.text, info.label)}
                        className="ml-2 p-1 rounded hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label={`Copy ${info.label}`}
                        tabIndex={0}
                      >
                        <Copy className="w-4 h-4 text-purple-500" />
                        <AnimatePresence>
                          {copied === info.label && (
                            <motion.span
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="absolute left-1/2 -translate-x-1/2 -top-7 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-lg"
                            >
                              Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.15, rotate: -8 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-lg border border-white/30 dark:border-gray-700/30 shadow hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group focus:outline-none"
                      aria-label={social.label}
                      tabIndex={0}
                    >
                      {social.icon === 'custom-twitter' ? (
                        <img src={twitterLogo} alt="X (Twitter) logo" className="w-5 h-5 object-contain group-hover:invert" />
                      ) : (
                        <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                      )}
                      <span className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow transition-opacity pointer-events-none">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl relative"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Floating label input */}
                  <div className="relative">
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={`peer w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-transparent outline-none ${errors.name ? 'border-red-400' : ''}`}
                      placeholder="Your name"
                      id="contact-name"
                      autoComplete="off"
                    />
                    <label htmlFor="contact-name" className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600 dark:peer-focus:text-purple-400 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">
                      Name
                    </label>
                    {errors.name && (
                      <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`peer w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-transparent outline-none ${errors.email ? 'border-red-400' : ''}`}
                      placeholder="your@email.com"
                      id="contact-email"
                      autoComplete="off"
                    />
                    <label htmlFor="contact-email" className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600 dark:peer-focus:text-purple-400 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">
                      Email
                    </label>
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className={`peer w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-transparent outline-none ${errors.subject ? 'border-red-400' : ''}`}
                    placeholder="What's this about?"
                    id="contact-subject"
                    autoComplete="off"
                  />
                  <label htmlFor="contact-subject" className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600 dark:peer-focus:text-purple-400 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">
                    Subject
                  </label>
                  {errors.subject && (
                    <p className="mt-1 text-red-500 text-xs">{errors.subject.message}</p>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    className={`peer w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-transparent outline-none resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder="Tell me about your project..."
                    id="contact-message"
                    autoComplete="off"
                  />
                  <label htmlFor="contact-message" className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600 dark:peer-focus:text-purple-400 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">
                    Message
                  </label>
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-xs">{errors.message.message}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitted}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-label="Send Message"
                >
                  {isSubmitted ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex flex-col items-center gap-2 text-center text-green-600 dark:text-green-400 font-medium mt-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle className="w-8 h-8 mb-1 text-green-500" />
                      </motion.div>
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};