import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import GetStartedButton from './GetStartedButton';

export default function HeroSection({ onShowAuth }) {
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
          Professional Status Updates via WhatsApp
        </h2>
      </div>
      
      <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
        Update all your clients at once through WhatsApp. Share your status once and let clients check your availability directly via WhatsApp - no individual messages needed.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        <FeatureCard />
      </div>

      <div className="flex justify-center gap-4">
        <GetStartedButton onShowAuth={onShowAuth} />
      </div>
      
      <div className="mt-8 text-sm text-gray-300">
        Used by hairstylists, therapists, and service professionals worldwide
      </div>
    </motion.div>
  );
}