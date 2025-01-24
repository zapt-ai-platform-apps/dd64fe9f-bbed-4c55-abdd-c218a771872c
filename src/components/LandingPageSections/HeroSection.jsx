import { motion } from 'framer-motion';
import HeroHeadline from './HeroHeadline';
import HeroImage from './HeroImage';
import GetStartedButton from './GetStartedButton';

export default function HeroSection({ onShowAuth }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-24 relative"
    >
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-primary/10 to-transparent -skew-y-3 transform origin-top-left" />
      <HeroHeadline />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mb-12"
      >
        <GetStartedButton onShowAuth={onShowAuth} />
      </motion.div>

      <HeroImage />
    </motion.div>
  );
}