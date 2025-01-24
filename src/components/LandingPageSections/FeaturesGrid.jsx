import { motion } from 'framer-motion';

export default function FeaturesGrid({ features }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card-glass p-6 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="bg-primary/10 p-4 rounded-lg w-fit mb-4">
            <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
          </div>
          <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}