import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { format, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { AppointmentForm } from '../types';

interface BookAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentForm>();

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const appointmentTypes = [
    { id: 'quick-chat', name: '15-min Quick Chat', description: 'Brief discussion about your project' },
    { id: 'consultation', name: '1-hour Consultation', description: 'Detailed project planning and strategy' },
    { id: 'project-discussion', name: 'Project Discussion', description: 'In-depth technical discussion' },
  ];

  const onSubmit = (data: AppointmentForm) => {
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      console.log('Appointment booked:', { ...data, date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '', time: selectedTime });
    }, 1000);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime('');
    setIsSubmitted(false);
    reset();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Save current overflow style
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.width = '100vw';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = '';
        document.body.style.width = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Book an Appointment
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center mt-6 space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Appointment Booked!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I'll send you a confirmation email shortly with meeting details.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Select Date & Time */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Select Date & Time
                    </h3>
                    
                    {/* Date Selection */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Choose a date:
                      </p>
                      <div className="flex justify-center">
                        {/* Basic styling for react-day-picker to match the theme */}
                        <style>{`
                          .rdp {
                            --rdp-cell-size: 40px;
                            --rdp-accent-color: #7c3aed;
                            --rdp-background-color: #f3e8ff;
                            --rdp-color: #1f2937;
                          }
                          .dark .rdp {
                            --rdp-accent-color: #a78bfa;
                            --rdp-background-color: #37304a;
                            --rdp-color: #d1d5db;
                          }
                          .rdp-day_selected {
                            color: white;
                          }
                          .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                            background-color: #e9d5ff;
                          }
                          .dark .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                            background-color: #5b21b6;
                          }
                        `}</style>
                        <DayPicker
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={[
                            { before: addDays(new Date(), 1) }, // Disable past dates
                          ]}
                          modifiersClassNames={{
                            selected: 'bg-purple-600 text-white',
                            today: 'text-purple-600 font-bold',
                          }}
                          className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2"
                        />
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Available times on {format(selectedDate, 'MMM dd')}:
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {availableTimes.map((time) => (
                            <motion.button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                                selectedTime === time
                                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400 hover:shadow-md dark:hover:border-purple-500'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Clock className="w-4 h-4" />
                              <span>{time}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Appointment Type */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Choose Meeting Type
                    </h3>
                    
                    <div className="space-y-3">
                      {appointmentTypes.map((type) => (
                        <label key={type.id} className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            value={type.id}
                            {...register('type', { required: 'Please select a meeting type' })}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">
                              {type.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {type.description}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.type && (
                      <p className="mt-2 text-red-500 text-sm">{errors.type.message}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Your Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          {...register('message')}
                          rows={4}
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Tell me about your project or what you'd like to discuss..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => step > 1 ? setStep(step - 1) : resetForm()}
                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
                  >
                    {step > 1 ? 'Previous' : 'Cancel'}
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 1 && (!selectedDate || !selectedTime)) return;
                        setStep(step + 1);
                      }}
                      disabled={step === 1 && (!selectedDate || !selectedTime)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
                    >
                      Book Appointment
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};