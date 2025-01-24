import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function FAQSection({ faqs = [] }) {
  return (
    <div className="mb-24">
      <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="card-glass p-6"
          >
            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

FAQSection.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  )
};