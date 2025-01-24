import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-glass p-8 hover:bg-white/5 transition-all cursor-pointer group relative h-full"
    >
      <div className="absolute inset-0 rounded-xl border border-white/5 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="mb-6">
          <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors" />
        </div>
        <h3 className="text-2xl font-display font-semibold mb-4">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}