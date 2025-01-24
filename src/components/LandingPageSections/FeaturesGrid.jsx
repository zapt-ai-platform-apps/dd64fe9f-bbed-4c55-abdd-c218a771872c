import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import FeatureCard from './FeatureCard';

export default function FeaturesGrid({ features = [] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-24">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <FeatureCard {...feature} />
        </motion.div>
      ))}
    </div>
  );
}

FeaturesGrid.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  )
};