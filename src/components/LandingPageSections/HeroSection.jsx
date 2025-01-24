import { motion } from 'framer-motion';
import GetStartedButton from './GetStartedButton';

export default function HeroSection({ onShowAuth }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-24"
    >
      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            StatusPros
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-200">
          Real-Time Professional Status Updates
        </h2>
      </div>
      
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Instantly broadcast your availability to all clients. Update once and let everyone know your status - no individual messages needed.
      </p>

      <div className="flex justify-center gap-4">
        <GetStartedButton onShowAuth={onShowAuth} />
      </div>
      
      <div className="mt-8 text-sm text-gray-300">
        Trusted by service professionals worldwide to streamline client communication
      </div>
    </motion.div>
  );
}