import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function TestimonialsSection({ testimonials }) {
  return (
    <div className="mb-24">
      <h2 className="text-3xl font-display font-bold text-center mb-12">Trusted by Professionals Worldwide</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="card-glass p-6"
          >
            <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}