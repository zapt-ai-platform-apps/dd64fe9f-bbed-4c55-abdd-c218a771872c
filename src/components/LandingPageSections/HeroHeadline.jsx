import { motion } from 'framer-motion';
import GetStartedButton from './GetStartedButton';

export default function HeroHeadline({ onShowAuth }) {
  return (
    <div className="mb-16">
      <motion.h1 
        className="text-5xl md:text-7xl font-bold text-white mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          StatusPros
        </span>
      </motion.h1>
      <motion.h2 
        className="text-2xl md:text-4xl font-semibold text-gray-200 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Professional Availability, Simplified
      </motion.h2>
      
      <motion.p 
        className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Streamline client communication with real-time status updates and instant availability sharing
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GetStartedButton onShowAuth={onShowAuth} />
      </motion.div>
    </div>
  );
}