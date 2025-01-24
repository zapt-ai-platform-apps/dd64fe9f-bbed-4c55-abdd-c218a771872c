import { motion } from 'framer-motion';

export default function HeroSection({ onShowAuth }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-24"
    >
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Elevate Your Professional Presence
      </h1>
      <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
        Connect seamlessly with your clients through intelligent availability management. 
        Designed for professionals who value their time and client relationships.
      </p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onShowAuth}
          className="btn-primary px-8 py-4 text-lg flex items-center gap-2 hover:bg-primary/90 transition-all group"
        >
          Get Started Free
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}