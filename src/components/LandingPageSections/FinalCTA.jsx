import { motion } from 'framer-motion';

export default function FinalCTA({ onShowAuth }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90" />
      <div className="relative z-10 text-center p-16">
        <h2 className="text-4xl font-display font-bold text-white mb-6">
          Transform Your Client Communication Today
        </h2>
        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals enhancing their availability management
        </p>
        <button
          onClick={onShowAuth}
          className="btn-primary px-10 py-5 text-lg bg-white text-primary hover:bg-gray-100 hover:text-primary-dark transition-colors"
        >
          Start Free Now
        </button>
      </div>
    </motion.div>
  );
}