import { motion } from 'framer-motion';

export default function FinalCTA({ onShowAuth }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center card-glass p-12"
    >
      <h2 className="text-3xl font-display font-bold mb-6">Ready to Transform Your Client Communication?</h2>
      <p className="text-gray-300 mb-8 max-w-xl mx-auto">
        Join thousands of professionals already streamlining their availability management
      </p>
      <button
        onClick={onShowAuth}
        className="btn-primary px-8 py-4 text-lg mx-auto"
      >
        Start Free Today
      </button>
    </motion.div>
  );
}