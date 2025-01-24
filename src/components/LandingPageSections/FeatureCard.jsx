import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card-glass p-8 hover:bg-white/5 transition-all cursor-pointer group relative h-full backdrop-blur-lg border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 space-y-4">
        <div className="p-4 bg-primary/10 rounded-xl w-max">
          <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
        </div>
        <h3 className="text-2xl font-display font-semibold text-white">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}