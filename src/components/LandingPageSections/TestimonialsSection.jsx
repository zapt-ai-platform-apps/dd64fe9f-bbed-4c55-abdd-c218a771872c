import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <div className="mb-24">
      <h2 className="text-3xl font-display font-bold text-center mb-12">Trusted by Busy Professionals</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="card-glass p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300">"{testimonial.text}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

TestimonialsSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};