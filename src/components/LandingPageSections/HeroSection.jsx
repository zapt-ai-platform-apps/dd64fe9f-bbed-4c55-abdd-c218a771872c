import { motion } from 'framer-motion';
import HeroHeadline from './HeroHeadline';
import HeroImage from './HeroImage';

export default function HeroSection({ onShowAuth }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-24"
    >
      <HeroHeadline onShowAuth={onShowAuth} />
      <HeroImage />
    </motion.div>
  );
}