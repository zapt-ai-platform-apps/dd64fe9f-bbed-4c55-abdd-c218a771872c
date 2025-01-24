import { motion } from 'framer-motion';

export default function FeaturesGrid({ features }) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-24">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card-glass p-8 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors" />
          <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}